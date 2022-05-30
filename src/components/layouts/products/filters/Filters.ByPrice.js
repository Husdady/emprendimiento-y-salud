// React
import { Component } from 'react'

// Components
import { Help } from '@common'

export default class ByPrice extends Component {
  static defaultProps = {
    maxPrice: '',
    minPrice: '',
  }

  shouldComponentUpdate(nextProps) {
    return this.props.maxPrice !== nextProps.maxPrice || this.props.minPrice !== nextProps.minPrice
  }

  render() {
    return (
      <div id="by-price" className="position-relative">
        {/* Icono de ayuda */}
        <Help title="Establece una cantidad máxima y mínima para filtrar por precios." />

        {/* Título */}
        <h3 className="subtitle">Filtrar por precio:</h3>

        {/* Subtítulo */}
        <p>Establecer la cantidad máxima:</p>

        {/* Precio máximo */}
        <input type="number" placeholder="max." value={this.props.maxPrice} onChange={this.props.onChangeMaxPrice} className="quantity max-price border-none w-100 fw-bold text-right" />

        {/* Subtítulo */}
        <p style={{ marginTop: 15 }}>Establecer la cantidad mínima:</p>

        {/* Precio mínimo */}
        <input type="number" placeholder="min." value={this.props.minPrice} onChange={this.props.onChangeMinPrice} className="quantity min-price border-none w-100 fw-bold text-right" />
      </div>
    )
  }
}
