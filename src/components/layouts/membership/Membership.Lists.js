// React
import { Component, Fragment } from 'react'

// Librarys
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// JSON
import terms from '@assets/json/membership/terms.json'
import categories from '@assets/json/membership/categories.json'
import requeriments from '@assets/json/membership/requeriments.json'
import waysToGenerateProfit from '@assets/json/membership/ways-to-generate-profit.json'

// Images
const bronzeStar = require('@assets/img/membership/bronze-star.webp').default.src
const silverStar = require('@assets/img/membership/silver-star.webp').default.src
const goldStar = require('@assets/img/membership/gold-star.webp').default.src
const diamondStar = require('@assets/img/membership/diamond-star.webp').default.src

export class Lists extends Component {
  static defaultProps = {
    data: [],
  }

  shouldComponentUpdate() {
    return false
  }

  // Renderizar listas
  renderLists() {
    return this.props.data.map((list, i) => (
      <li key={i} className="list d-block">
        {/* Ícono */}
        <FontAwesomeIcon className="me-2" icon="check-circle" color="var(--bg-green)" />

        {/* Titulo */}
        <span>{list}</span>
      </li>
    ))
  }

  render() {
    const lists = this.renderLists.bind(this)()

    return <ul className="lists">{lists}</ul>
  }
}

// Sobre las categorías del programa de afiliados
export class Categories extends Component {
  shouldComponentUpdate() {
    return false
  }

  // Renderizar el tipo de estrella, si es una estrella de bronce, plata, etc
  renderTypeStar(star) {
    const typeStar = {
      bronze: bronzeStar,
      silver: silverStar,
      gold: goldStar,
      diamond: diamondStar,
    }

    return typeStar[star]
  }

  // Renderizar estrellas
  renderStars = (stars, category) => {
    return stars.map((star, i) => <Image key={i} width={32} height={32} className="star" alt={category.alt} src={this.renderTypeStar(star)} />)
  }

  // Renderizar categorías
  renderCategories() {
    return categories.map((category, i) => (
      <span key={i} className="category d-flex align-items-center">
        {/* Nombre de la categoría */}
        <b>-&nbsp;&nbsp;{category.title}</b>

        {/* Estrellas */}
        {this.renderStars(category.stars, category)}
      </span>
    ))
  }

  render() {
    return <div className="categories">{this.renderCategories()}</div>
  }
}

// Requisitos para subir de categoría en el programa de afiliados
export class Requeriments extends Component {
  shouldComponentUpdate() {
    return false
  }

  // Renderizar requisitos para ascender de categoría
  renderRequeriments() {
    return requeriments.map((requeriment, i) => (
      <span key={i} className="requeriment d-block">
        <b className="me-2">-</b>
        {requeriment}
      </span>
    ))
  }

  render() {
    return <div className="requeriments">{this.renderRequeriments()}</div>
  }
}

// Términos generales de la afiliación
export class GeneralTerms extends Component {
  shouldComponentUpdate() {
    return false
  }

  // Renderizar requisitos para ascender de categoría
  renderTerms() {
    return terms.map((term, i) => (
      <Fragment key={i}>
        <span className="term d-block">
          {/* Título */}
          <b className="me-2">» {term.title}:</b>
          {/* Descripción */}
          {term.description}.
        </span>
        <br />
      </Fragment>
    ))
  }

  render() {
    return <div className="terms">{this.renderTerms()}</div>
  }
}

// Maneras de generar ganancias en el programa de afiliados
export class WaysToGenerateProfit extends Component {
  shouldComponentUpdate() {
    return false
  }

  // Renderizar requisitos para ascender de categoría
  renderWays() {
    return waysToGenerateProfit.map((way, i) => {
      if (way.type === 'list') {
        return (
          <li key={i} className="way" style={way.style}>
            {way.title}
          </li>
        )
      }

      return (
        <Fragment key={i}>
          <span className="way d-block">
            {/* Título */}
            <b className="me-2">» {way.title}:</b>
            {/* Descripción */}
            {way.description}.
          </span>
          <br />
        </Fragment>
      )
    })
  }

  render() {
    return <div className="ways">{this.renderWays()}</div>
  }
}
