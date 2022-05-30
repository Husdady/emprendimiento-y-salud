// React
import { Component, createRef } from 'react'

// Components
import Product from '@layouts/home/Home.Product'
import Skeleton from '@layouts/skeletons/Skeleton.AleatoryProducts'

// Librarys
import Router from 'next/router'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Navigation } from 'swiper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// API
import { getAleatoryProducts } from '@api/products'

// Utils
import { isArray, isEmptyArray } from '@utils/Validations'

SwiperCore.use([Navigation, Autoplay])

export default class AleatoryProducts extends Component {
  static defaultProps = {
    autoplay: {},
  }

  constructor(props) {
    super(props)
    this.refSwiper = createRef()
    this.onMount = this.onMount.bind(this)
    this.showLoading = this.showLoading.bind(this)
    this.hideLoading = this.hideLoading.bind(this)
    this.setAleatoryProducts = this.setAleatoryProducts.bind(this)
    this.renderAleatoryProducts = this.renderAleatoryProducts.bind(this)

    this.state = {
      isLoading: true,
      aleatoryProducts: [],
    }

    this.isSeytuCompany = this.props.company === 'seytu'
    this.activeColorCompany = this.isSeytuCompany ? 'var(--bg-darkred)' : 'var(--bg-darkpurple'

    this.responsive = {
      1920: { slidesPerView: 6, spaceBetween: 18 },
      1280: { slidesPerView: 5, spaceBetween: 15 },
      685: { slidesPerView: 3, spaceBetween: 10 },
      481: { slidesPerView: 2, spaceBetween: 12 },
      351: { slidesPerView: 2, spaceBetween: 0 },
      350: { slidesPerView: 1, spaceBetween: 0 },
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isLoading !== nextState.isLoading || this.state.aleatoryProducts !== nextState.aleatoryProducts || this.props.needRenderAgain !== nextProps.needRenderAgain
  }

  componentDidMount() {
    this.onMount()
    Router.events.on('routeChangeComplete', this.onMount)
  }

  componentWillUnmount() {
    Router.events.off('routeChangeComplete', this.onMount)
  }

  onMount() {
    const { company } = this.props
    const graphqlQuery = company === 'seytu' ? 'seytu_products' : 'omnilife_products'

    getAleatoryProducts({
      company: this.props.company,
      graphqlQuery: graphqlQuery,
      showLoading: this.showLoading,
      hideLoading: this.hideLoading,
      setProducts: this.setAleatoryProducts,
      productToExclude: this.props.productToExclude,
    })
  }

  // Mostrar loading
  showLoading() {
    return this.setState({ isLoading: true })
  }

  // Ocultar loading
  hideLoading() {
    return this.setState({ isLoading: false })
  }

  // Setear productos aleatorios
  setAleatoryProducts(aleatoryProducts) {
    if (!isArray(aleatoryProducts)) return

    if (!isEmptyArray(aleatoryProducts)) {
      this.setState({ aleatoryProducts: aleatoryProducts })
    }
  }

  // Renderizar productos aleatorios
  renderAleatoryProducts() {
    return this.state.aleatoryProducts.map((aleatoryProduct, i) => (
      <SwiperSlide key={i}>
        <Product company={this.props.company} {...aleatoryProduct} />
      </SwiperSlide>
    ))
  }

  render() {
    const autoplayConfig = {
      delay: 2000,
      disableOnInteraction: false,
      ...this.props.autoplay,
    }

    return (
      <Skeleton totalItems={20} loading={this.state.isLoading}>
        <Swiper
          grabCursor
          speed={2000}
          className="aleatory-products px-3"
          autoplay={autoplayConfig}
          breakpoints={this.responsive}
          navigation={{
            prevEl: '.prev-swiper',
            nextEl: '.next-swiper',
          }}
        >
          {this.renderAleatoryProducts()}
          <CustomLeftArrow color={this.activeColorCompany} />
          <CustomRightArrow color={this.activeColorCompany} />
        </Swiper>
      </Skeleton>
    )
  }
}

// Renderizar productos aleatoriamente
export const renderAleatoryProducts = ({ title, company, isLoading, ...extraData }) => {
  if (isLoading) return

  const isSeytuCompany = company === 'seytu'
  const textColor = {
    color: isSeytuCompany ? 'var(--bg-darkred)' : 'var(--bg-darkpurple)',
  }

  return (
    <section className="container-aleatory-products mb-5 mx-auto" company={company}>
      {/* Título */}
      <h3 className="title fw-bold mb-2" style={textColor}>
        {title}
      </h3>

      {/* Productos aleatorios */}
      <AleatoryProducts company={company} {...extraData} />
    </section>
  )
}

// <------------------------ Extra Components ------------------------>
export class CustomLeftArrow extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const styles = {
      position: 'absolute',
      top: '50%',
      left: 0,
      zIndex: 999,
    }

    return <FontAwesomeIcon size="3x" style={styles} className="pointer scale prev-swiper" icon="arrow-circle-left" color={this.props.color} />
  }
}

export class CustomRightArrow extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const styles = {
      position: 'absolute',
      top: '50%',
      right: 0,
      zIndex: 999,
    }

    return <FontAwesomeIcon size="3x" className="pointer scale next-swiper" color={this.props.color} icon="arrow-circle-right" onClick={this.props.onClick} style={styles} />
  }
}
