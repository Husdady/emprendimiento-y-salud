// React
import { Component } from 'react'

// Components
import { Empty } from '@common'
import Product from '@layouts/products/common/Products.Item'

// Librarys
import { connect } from 'react-redux'

// Actions
import getProductsActions from '@redux/actions/products'

// Utils
import { isEmptyArray } from '@utils/Validations'
import { createState, createDispatch } from '@utils/Helper'

const emptyFavoriteSeytuProductsImg = require('@assets/img/seytu-products/empty-favorite-products.webp')
const emptyFavoriteOmnilifeProductsImg = require('@assets/img/omnilife-products/empty-favorite-products.webp')

class MyFavoritesProducts extends Component {
  constructor(props) {
    super(props)
    this.isSeytuCompany = this.props.company === 'seytu'
    this.styles = {
      spin: {
        fontSize: 35,
      },
      spinTitle: {
        fontSize: '1.25em',
        fontWeight: 'bold',
      },
      containerSpin: {
        display: 'flex',
        width: '100%',
        height: 500,
      },
    }
    this.emptySeytuProducts = {
      width: 450,
      height: 450,
      style: { marginTop: 42 },
      image: emptyFavoriteSeytuProductsImg.default.src,
      title: 'No se han agregado productos Seytú como favoritos...',
      titleStyle: { fontSize: '1.5em', width: '80%', lineHeight: 1 },
    }
    this.emptyOmnilifeProducts = {
      width: 300,
      height: 300,
      style: { marginTop: 30 },
      image: emptyFavoriteOmnilifeProductsImg.default.src,
      title: 'No se han agregado productos Omnilife como favoritos...',
      titleStyle: { fontSize: '1.5em', width: '80%', lineHeight: 1 },
    }
    this.renderFavoriteProduct = this.renderFavoriteProduct.bind(this)
    this.renderFavoriteProducts = this.renderFavoriteProducts.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    const { company } = this.props
    return this.props[company].favoriteProducts !== nextProps[company].favoriteProducts
  }

  // Renderizar producto favorito
  renderFavoriteProduct(favoriteProduct) {
    const { company, dispatch } = this.props
    const { addFavoriteProduct, deleteFavoriteProduct } = dispatch[company]

    return (
      <Product
        key={favoriteProduct._id}
        company={this.props.company}
        addFavoriteProduct={() => addFavoriteProduct(favoriteProduct)}
        deleteFavoriteProduct={() => deleteFavoriteProduct(favoriteProduct)}
        {...favoriteProduct}
      />
    )
  }

  // Renderizar productos favoritos
  renderFavoriteProducts() {
    const { company } = this.props
    const { favoriteProducts } = this.props[company]

    // Si no hay productos favoritos
    if (isEmptyArray(favoriteProducts)) {
      if (this.isSeytuCompany) {
        return <Empty {...this.emptySeytuProducts} />
      }

      return <Empty {...this.emptyOmnilifeProducts} />
    }

    return <div className="products d-grid mx-auto pb-5">{favoriteProducts?.map(this.renderFavoriteProduct)}</div>
  }

  render() {
    return this.renderFavoriteProducts()
  }
}

function mapStateToProps({ manageProducts }) {
  return createState({
    objects: [
      { name: 'seytu', value: manageProducts.seytu },
      { name: 'omnilife', value: manageProducts.omnilife },
    ],
    state: (obj) => ({
      favoriteProducts: obj.favoriteProducts,
    }),
  })
}

function mapDispatchToProps(dispatch) {
  const actions = getProductsActions(dispatch)

  return {
    dispatch: createDispatch({
      objects: ['seytu', 'omnilife'],
      methods: (obj) => ({
        getProducts: actions[obj].getProducts,
        addFavoriteProduct: actions[obj].addFavoriteProduct,
        deleteFavoriteProduct: actions[obj].deleteFavoriteProduct,
      }),
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFavoritesProducts)
