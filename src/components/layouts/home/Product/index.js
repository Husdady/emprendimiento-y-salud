// React
import { Component, Fragment } from 'react'

// Librarys
import Link from 'next/link'
import Image from 'next/image'
import LazyLoad from 'react-lazyload'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// API
import { PUBLIC_URL } from '@api/credentials'

// Utils
import { truncate, classnames, convertEmptySpacesInHyphens } from '@utils/Helper'

export default class Product extends Component {
  static defaultProps = {
    benefits: [],
    productLink: '/',
    img: {
      path: '#',
      alt: 'producto',
      width: 400,
      height: 400,
    },
  }

  constructor(props) {
    super(props)
    this.setDefaultHeight = this.setDefaultHeight.bind(this)
    this.getAleatoryBenefits = this.getAleatoryBenefits.bind(this)
    this.renderBenefits = this.renderBenefits.bind(this)

    this.state = {
      height: 400,
    }

    this.isSeytuCompany = this.props.company === 'seytu'
    this.activeColor = this.isSeytuCompany ? 'var(--bg-darkred)' : 'var(--bg-darkpurple)'

    this.textColor = {
      color: this.activeColor,
    }

    this.backgroundColor = {
      backgroundColor: this.activeColor,
    }

    this.shortProductName = convertEmptySpacesInHyphens(this.props.name)
    this.productLink = `/productos-${this.props.company}/${this.shortProductName}`
    this.productClasses = classnames(['product d-flex flex-column text-center rounded-2', this.props.company])
  }

  shouldComponentUpdate(_, nextState) {
    return nextState.height
  }

  // Setear altura por defecto del producto
  setDefaultHeight() {
    this.setState({ height: 'auto' })
  }

  // Obtener beneficios del producto aleatoriamente
  getAleatoryBenefits(limit) {
    const aleatoryBenefits = []
    const { benefits } = this.props
    const totalBenefits = benefits.length

    for (let i = 0; i < totalBenefits; i++) {
      const benefit = benefits[i]
      const aleatoryNumber = Math.floor(Math.random() * i)

      aleatoryBenefits[i] = aleatoryBenefits[aleatoryNumber]
      aleatoryBenefits[aleatoryNumber] = benefit
    }

    if (limit) {
      const totalAleatoryBenefits = Number('-' + limit)
      return aleatoryBenefits.slice(totalAleatoryBenefits)
    }

    return aleatoryBenefits
  }

  // Renderizar beneficios del producto
  renderBenefits() {
    if (!this.props.benefits) return

    const lastestFourBenefits = this.getAleatoryBenefits(4)

    return lastestFourBenefits.map(({ _id, benefit }) => (
      <li key={_id} className="benefit lh-normal">
        {/* Ícono*/}
        <FontAwesomeIcon icon="check-circle" className="me-1" />

        {/* Beneficio */}
        <span>{truncate(benefit, 20)}</span>
      </li>
    ))
  }

  render() {
    const benefits = this.renderBenefits()
    const productLink = PUBLIC_URL + this.productLink

    return (
      <LazyLoad height={this.state.height} className={this.productClasses}>
        {/* Nombre del producto */}
        <h4 className="title mx-auto fw-bold text-break" style={this.textColor}>
          {this.props.name}
        </h4>

        {/* Imagen del producto */}
        <Link href={productLink}>
          <figure className="mb-0 position-relative product-image d-block mx-auto">
            <Image
              loading="eager"
              placeholder="blur"
              objectFit="contain"
              layout="responsive"
              className="pointer"
              title={this.props.name}
              alt={this.shortProductName}
              src={this.props.defaultImage?.url}
              width={this.props.defaultImage?.width}
              height={this.props.defaultImage?.height}
              blurDataURL={this.props.defaultImage?.url}
            />
          </figure>
        </Link>

        {/* Beneficios del producto */}
        <ul className="wrapper d-block mx-auto text-left">{benefits}</ul>

        {/* Ver más información del product */}
        <Link href={productLink}>
          <a className="scale show-more d-block mx-auto rounded-1 mt-3 mb-2 py-2 px-5" style={this.backgroundColor}>
            Ver más
          </a>
        </Link>
      </LazyLoad>
    )
  }
}
