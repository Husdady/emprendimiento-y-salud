// React
import { Component } from 'react'

// Librarys
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Utils
import { nFormatter } from '@utils/Helper'

export default class ProductInformation extends Component {
  constructor(props) {
    super(props)
    this.isSeytuCompany = this.props.company === 'seytu'
    this.activeColor = this.isSeytuCompany ? 'var(--bg-darkred)' : 'var(--bg-darkpurple)'
    this.totalVisits = nFormatter(this.props.product.totalVisits, 1)
    this.isOnlyVisit = this.totalVisits === 1
    this.totalVisitsMessage = `${this.totalVisits} ${this.isOnlyVisit ? 'vez' : 'veces'}`

    this.textColor = {
      color: this.activeColor,
    }
  }

  shouldComponentUpdate() {
    return false
  }

  // Renderizar beneficio
  renderBenefit = ({ _id, benefit }) => {
    return (
      <li className="benefit list" key={_id}>
        {/*	Icono */}
        <FontAwesomeIcon icon="caret-square-right" className="arrow-square-right me-2" color={this.textColor.color} />

        {/*	Beneficio del producto */}
        <span className="fw-bold">{benefit}</span>
      </li>
    )
  }

  // Renderizar beneficios del producto
  renderBenefits() {
    return <ul className="benefits mb-2">{this.props.product?.benefits.map(this.renderBenefit)}</ul>
  }

  // Renderizar modo de uso del producto
  renderUsageMode() {
    return (
      <span className="list">
        {/*	Icono */}
        <FontAwesomeIcon icon="caret-square-right" className="arrow-square-right me-2" color={this.textColor.color} />

        <span className="fw-bold">{this.props.product.usageMode}</span>
      </span>
    )
  }

  render() {
    return (
      <div className="product-information">
        {/* Total de visitas */}
        <div className="d-flex align-items-center jc-flex-end">
          <FontAwesomeIcon icon="eye" className="me-1" />
          <b>Visto {this.totalVisitsMessage}</b>
        </div>

        {/* Nombre del producto */}
        <h1 className="product-name text-uppercase text-break mb-0 fw-bold" style={this.textColor}>
          {this.props.product.name}
        </h1>

        {/* Contenido del producto */}
        <span className="product-content">{this.props.product.content}</span>

        {/* Descripción del producto */}
        <p className="product-description fw-bold">{this.props.product.description}</p>

        {/* Beneficios del producto */}
        <h3 className="title fw-bold" style={this.textColor}>
          Beneficios:
        </h3>
        {this.renderBenefits()}

        {/* Modo de empleo del producto */}
        <h3 className="title fw-bold" style={this.textColor}>
          Modo de empleo:
        </h3>
        {this.renderUsageMode()}
      </div>
    )
  }
}
