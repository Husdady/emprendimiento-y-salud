// React
import { Component } from 'react'

// Components
import { Empty } from '@common'
import Scroller from '@layouts/common/Scroller'
import Loading from '@layouts/loaders/Loading.Default'
import Product from '@layouts/products/common/Products.Item'

// Librarys
import { connect } from 'react-redux'

// Actions
import getProductsActions from '@redux/actions/products'

// Utils
import { isEmptyArray } from '@utils/Validations'
import { createState, createDispatch } from '@utils/Helper'

const emptySeytuProductsImg = require('@assets/img/seytu-products/empty-products.webp')
const emptyOmnilifeProductsImg = require('@assets/img/omnilife-products/empty-products.webp')

class TabProducts extends Component {
  constructor(props) {
    super(props)
    this.seytuColor = 'var(--bg-darkred)'
    this.omnilifeColor = 'var(--bg-darkpurple)'
    this.isSeytuCompany = this.props.company === 'seytu'
    this.activeCompanyColor = this.isSeytuCompany ? this.seytuColor : this.omnilifeColor

    this.styles = {
      spin: {
        fontSize: 35,
        color: this.activeCompanyColor,
      },
      spinTitle: {
        fontSize: '1.25em',
        fontWeight: 'bold',
        color: this.activeCompanyColor,
      },
      containerSpin: {
        display: 'flex',
        width: '100%',
        height: 500,
      },
    }

    this.loadMoreButton = {
      className: 'mt-3',
      textColor: this.activeCompanyColor,
      title: 'Cargar más productos',
    }

    this.emptySeytuProducts = {
      width: 450,
      height: 450,
      style: { marginTop: 42 },
      image: emptySeytuProductsImg.default.src,
      title: 'No se han encontrado productos Seytú para mostrar...',
      titleStyle: { fontSize: '1.5em' },
    }

    this.emptyOmnilifeProducts = {
      style: { marginTop: 30 },
      image: emptyOmnilifeProductsImg.default.src,
      title: 'No se han encontrado productos Omnilife para mostrar...',
      titleStyle: { fontSize: '1.5em' },
    }
  }

  shouldComponentUpdate(nextProps) {
    const { company } = this.props

    return this.props[company].products !== nextProps[company].products || this.props[company].loadingProducts !== nextProps[company].loadingProducts
  }

  componentDidMount() {
    this.onMount()
  }

  onMount = () => {
    const { dispatch, company } = this.props

    const emptyProducts = isEmptyArray(this.props[company].products)

    if (!emptyProducts) return

    dispatch[company].getPaginatedProducts()
  }

  // Renderizar productos
  renderProducts = () => {
    const { company, dispatch } = this.props
    const { limit, products, loadingProducts } = this.props[company]

    // Si se están cargando los productos
    if (loadingProducts) {
      return <Loading title="Cargando productos" className="jc-center align-items-center" style={this.styles.spin} titleStyle={this.styles.spinTitle} containerStyle={this.styles.containerSpin} />
    }

    // Productos vacíos
    const emptyProducts = isEmptyArray(products)

    // Si son productos vacíos, finalizar función
    if (emptyProducts) {
      if (this.isSeytuCompany) {
        return <Empty {...this.emptySeytuProducts} />
      }

      return <Empty {...this.emptyOmnilifeProducts} />
    }

    const { getMoreProducts, addFavoriteProduct, deleteFavoriteProduct } = dispatch[company]

    return (
      <Scroller limit={limit} onLoadMore={getMoreProducts} loadMoreButton={this.loadMoreButton}>
        <div className="products d-grid mx-auto pb-5">
          {products?.map((product) => (
            <Product key={product._id} company={company} addFavoriteProduct={() => addFavoriteProduct(product)} deleteFavoriteProduct={() => deleteFavoriteProduct(product)} {...product} />
          ))}
        </div>
      </Scroller>
    )
  }

  render() {
    return this.renderProducts()
  }
}

// Obtener estado de productos
function mapStateToProps({ manageProducts, manageFilters }) {
  return createState({
    objects: [
      { name: 'seytu', value: manageFilters.seytu },
      { name: 'omnilife', value: manageFilters.omnilife },
    ],
    state: (obj, ctx) => ({
      limit: obj.limit,
      products: manageProducts[ctx.name].products,
      totalProducts: manageProducts[ctx.name].totalProducts,
      loadingProducts: manageProducts[ctx.name].loadingProducts,
    }),
  })
}

function mapDispatchToProps(dispatch) {
  const actions = getProductsActions(dispatch)

  return {
    dispatch: createDispatch({
      objects: ['seytu', 'omnilife'],
      methods: (obj) => ({
        getMoreProducts: actions[obj].getMoreProducts,
        getPaginatedProducts: actions[obj].getPaginatedProducts,
        addFavoriteProduct: actions[obj].addFavoriteProduct,
        deleteFavoriteProduct: actions[obj].deleteFavoriteProduct,
      }),
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabProducts)
