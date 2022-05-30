// React
import { Component } from 'react'

// Librarys
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Utils
import { createState, classnames } from '@utils/Helper'

class Star extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inFavorites: false,
    }

    this.onMount = this.onMount.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
    this.addToFavorites = this.addToFavorites.bind(this)
    this.starNeedAgainRendering = this.starNeedAgainRendering.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Actualizar dependiendo de props
    this.onUpdate({ nextProps })

    return this.state.inFavorites !== nextState.inFavorites
  }

  componentDidMount() {
    this.onMount()
  }

  onMount() {
    const { inFavorites } = this.state
    const starNeedAgainRendering = this.starNeedAgainRendering()

    // La estrella necesita volver a renderizarse
    if (starNeedAgainRendering) {
      if (!this.state.inFavorites) {
        this.setState({ inFavorites: true })
      }

      return null
    }

    if (this.state.inFavorites) {
      this.setState({ inFavorites: false })
    }
  }

  onUpdate({ nextProps }) {
    const { company } = this.props.extraData
    const prevFavoriteProducts = this.props[company].favoriteProducts
    const nextFavoriteProducts = nextProps[company].favoriteProducts

    const existFavoriteProduct = nextFavoriteProducts.find((favoriteProduct) => {
      return favoriteProduct._id === this.props.productId
    })

    const condition = nextFavoriteProducts.length < prevFavoriteProducts.length

    if (condition && !existFavoriteProduct) {
      this.setState({ inFavorites: false })
    }
  }

  // Comprobar si se debe renderizar de nuevo
  starNeedAgainRendering() {
    const { company } = this.props.extraData
    const { favoriteProducts } = this.props[company]

    return favoriteProducts.some((favoriteProduct) => {
      return favoriteProduct._id === this.props.productId
    })
  }

  // Agregar a favoritos un producto
  addToFavorites() {
    this.setState({ inFavorites: !this.state.inFavorites }, () => {
      const { addFavoriteProduct, deleteFavoriteProduct } = this.props.extraData

      if (this.state.inFavorites) {
        return addFavoriteProduct()
      }

      return deleteFavoriteProduct()
    })
  }

  render() {
    const { inFavorites } = this.state

    // Estrella activa/desactivada
    const startIcon = inFavorites ? 'star' : ['far', 'star']

    // Clases de la estrella
    const starClasses = classnames(['star position-absolute pointer rounded-circle', inFavorites ? 'active animate__animated animate__jackInTheBox' : null])

    return (
      <span className={starClasses} onClick={this.addToFavorites}>
        <FontAwesomeIcon size="lg" icon={startIcon} title="Añadir a favoritos" />
      </span>
    )
  }
}

// Obtener productos favoritos
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

export default connect(mapStateToProps)(Star)
