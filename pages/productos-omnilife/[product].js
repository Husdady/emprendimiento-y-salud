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

class OmnilifeProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {},
      isLoading: true,
    }

    this.onMount = this.onMount.bind(this)
    this.hideLoading = this.hideLoading.bind(this)
    this.setOmnilifeProduct = this.setOmnilifeProduct.bind(this)
    this.renderOmnilifeProduct = this.renderOmnilifeProduct.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.product !== nextState.product || this.state.isLoading !== nextState.isLoading
  }

  componentDidMount() {
    this.onMount()
  }

  onMount() {
    const { query } = this.props.router
    const existQuery = !isEmptyObject(query)

    // Si no existe la query, finalizar función
    if (!existQuery) return

    const product = query?.product.replace(/\-/g, ' ')

    getProductInformation({
      product: product,
      graphqlQuery: 'omnilife_product',
      hideLoading: this.hideLoading,
      setProductInformation: this.setOmnilifeProduct,
    })

    scrollToSection('shortcut-ia91h')
  }

  // Ocultar loading
  hideLoading() {
    this.setState({ isLoading: false })
  }

  // Setear información del producto Omnilife
  setOmnilifeProduct(product) {
    if (!product) return

    this.setState({ product: product })
  }

  // Renderizar producto Omnilife
  renderOmnilifeProduct() {
    if (this.state.isLoading) {
      return <LoadingProductHeader />
    }

    // Producto no encontrado
    const emptyProduct = isEmptyObject(this.state.product)

    if (emptyProduct) {
      return <ProductNotFound company="omnilife" buttonIcon="apple-alt" buttonTitle="Volver a la sección de los productos Omnilife" />
    }

    return (
      <Fragment>
        {/* Head */}
        <ProductHeader name={this.state.product.name} description={this.state.product.description} />

        {/* Imágenes del producto */}
        <ProductImages company="omnilife" product={this.state.product} />

        {/* Información del producto */}
        <ProductInformation company="omnilife" product={this.state.product} />
      </Fragment>
    )
  }

  render() {
    // Renderizar productos Seytú aleatoriamente
    const aleatorySeytuProducts = renderAleatoryProducts({
      company: 'seytu',
      isLoading: this.state.isLoading,
      autoplay: { reverseDirection: true },
      title: 'Te recomendamos que visites los siguientes productos Seytú:',
    })

    // Renderizar productos Omnilife aleatoriamente
    const aleatoryOmnilifeProducts = renderAleatoryProducts({
      company: 'omnilife',
      isLoading: this.state.isLoading,
      title: 'También te puede interesar:',
      productToExclude: this.state.product.title,
    })

    return (
      <Container>
        <section className="container-product flex position-relative mx-auto shortcut-ia91h" company="omnilife">
          {/* Producto Omnilife */}
          {this.renderOmnilifeProduct()}
        </section>

        {/* Productos Omnilife aleatorios */}
        {aleatoryOmnilifeProducts}

        {/* Productos Seytú aleatorios */}
        {aleatorySeytuProducts}
      </Container>
    )
  }
}

export default withRouter(OmnilifeProduct)
