// React
import { Component, Fragment } from 'react'

// Librarys
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// API
import { getLastestProducts } from '@api/products'

// Utils
import { isArray, isEmptyArray } from '@utils/Validations'

const Product = dynamic(() => import('./Home.Product'))

export default class HomeInformation extends Component {
  static defaultProps = {
    defaultColor: '#000000',
    products: [],
    questions: [],
    img: {
      width: 1920,
      height: 1080,
    },
    button: {
      link: '/',
    },
  }

  constructor(props) {
    super(props)
    this.onMount = this.onMount.bind(this)
    this.setProducts = this.setProducts.bind(this)
    this.renderQuestions = this.renderQuestions.bind(this)
    this.renderProducts = this.renderProducts.bind(this)

    this.state = {
      products: [],
    }

    this.textColor = {
      color: this.props.defaultColor,
    }

    this.backgroundColor = {
      backgroundColor: this.props.defaultColor,
    }
  }

  shouldComponentUpdate(_, nextState) {
    return nextState.products
  }

  componentDidMount() {
    this.onMount()
  }

  onMount() {
    const { company } = this.props
    const graphqlQuery = company === 'seytu' ? 'seytu_products' : 'omnilife_products'

    // Obtener últimos productos
    getLastestProducts({
      limit: 4,
      company: company,
      graphqlQuery: graphqlQuery,
      setProducts: this.setProducts,
    })
  }

  // Setear productos
  setProducts(products) {
    if (!isArray(products)) return

    if (!isEmptyArray(products)) {
      this.setState({ products: products })
    }
  }

  // Renderizar preguntas
  renderQuestions() {
    return this.props.questions.map((question, i) => (
      <Fragment key={i}>
        {/* Pregunta */}
        <h3 className="question fw-bold lh-normal" style={this.textColor}>
          {question.name}
        </h3>

        {/* Respuesta */}
        <p className="response m-0">{question.response}</p>
      </Fragment>
    ))
  }

  // Renderizar productos
  renderProducts() {
    return this.state.products.map((product, i) => <Product key={i} company={this.props.company} {...product} />)
  }

  render() {
    const { img, button } = this.props
    const products = this.renderProducts()
    const imgSrc = require('@assets/img/' + img.path)

    return (
      <div id={this.props.id} className="about-products" company={this.props.company} style={this.props.containerStyle}>
        <div className="wrapper mx-auto">
          {/* Título de la sección de información */}
          <h1 className="title text-center fw-bold lh-normal" style={this.textColor}>
            {this.props.title}
          </h1>

          {/* Imagen de la sección de información */}
          <figure className="mx-auto">
            <Image width={1280} height={700} src={imgSrc} alt={img.alt} blurDataURL={imgSrc} loading="eager" placeholder="blur" />
          </figure>

          {/* Preguntas de la sección de información */}
          {this.renderQuestions()}

          {/* Botón 'Ver todos los productos' */}
          <Link href={button.link}>
            <a className="see-all-products d-table mx-auto rounded-pill" style={button.style}>
              {button.title}
            </a>
          </Link>
        </div>

        {/* Productos */}
        <div className="products flex mx-auto jc-center">{products}</div>
      </div>
    )
  }
}
