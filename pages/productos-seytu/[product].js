// React
import { Component, Fragment } from 'react'

// Component
import Container from '@layouts/common/Container'
import ProductImages from '@layouts/product/Product.Images'
import ProductNotFound from '@layouts/product/Product.NotFound'
import ProductInformation from '@layouts/product/Product.Information'
import { renderAleatoryProducts } from '@layouts/products/common/Products.Aleatory'

// Librarys
import Head from 'next/head'
import Router, { withRouter } from 'next/router'

// Headers
import { ProductHeader, LoadingProductHeader } from '@headers'

// API
import { getProductInformation } from '@api/products'

// Utils
import { scrollToSection } from '@utils/Helper'
import { isEmptyObject } from '@utils/Validations'

class SeytuProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {},
      isLoading: true,
    }

    this.onMount = this.onMount.bind(this)
    this.hideLoading = this.hideLoading.bind(this)
    this.setSeytuProduct = this.setSeytuProduct.bind(this)
    this.renderSeytuProduct = this.renderSeytuProduct.bind(this)
  }

  shouldComponentUpdate(_, nextState) {
    return this.state.product !== nextState.product || this.state.isLoading !== nextState.isLoading
  }

  componentDidMount() {
    this.onMount()
  }

  onMount() {
    const query = this.props.router.query
    const existQuery = !isEmptyObject(query)

    if (!existQuery) return

    const product = query?.product.replace(/\-/g, ' ')

    getProductInformation({
      product: product,
      graphqlQuery: 'seytu_product',
      hideLoading: this.hideLoading,
      setProductInformation: this.setSeytuProduct,
    })

    scrollToSection('shortcut-25sc0')
  }

  // Ocultar loading
  hideLoading() {
    this.setState({ isLoading: false })
  }

  // Setear información del producto Omnilife
  setSeytuProduct(product) {
    if (!product) return

    this.setState({ product: product })
  }

  // Renderizar producto Seytú
  renderSeytuProduct() {
    // Mientras el producto está cargando, mostrar un 'loading'
    if (this.state.isLoading) {
      return <LoadingProductHeader />
    }

    // Producto no encontrado
    const emptyProduct = isEmptyObject(this.state.product)

    if (emptyProduct) {
      return <ProductNotFound company="omnilife" buttonIcon="shopping-bag" buttonTitle="Volver a la sección de los productos Seytú" />
    }

    return (
      <Fragment>
        {/* Head */}
        <ProductHeader name={this.state.product.name} description={this.state.product.description} />

        {/* Imágenes del producto */}
        <ProductImages company="seytu" product={this.state.product} />

        {/* Información del producto */}
        <ProductInformation company="seytu" product={this.state.product} />
      </Fragment>
    )
  }

  render() {
    // Renderizar productos Seytú aleatoriamente
    const aleatorySeytuProducts = renderAleatoryProducts({
      company: 'seytu',
      isLoading: this.state.isLoading,
      title: 'También te puede interesar:',
      productToExclude: this.state.product.title,
    })

    // Renderizar productos Omnilife aleatoriamente
    const aleatoryOmnilifeProducts = renderAleatoryProducts({
      company: 'omnilife',
      isLoading: this.state.isLoading,
      autoplay: { reverseDirection: true },
      title: 'Te recomendamos que visites los siguientes productos Omnilife:',
    })

    return (
      <Container>
        <section className="container-product flex position-relative mx-auto shortcut-25sc0" company="seytu">
          {/* Producto Seytú */}
          {this.renderSeytuProduct()}
        </section>

        {/* Productos Seytú aleatorios */}
        {aleatorySeytuProducts}

        {/* Productos Omnilife aleatorios */}
        {aleatoryOmnilifeProducts}
      </Container>
    )
  }
}

export default withRouter(SeytuProduct)
