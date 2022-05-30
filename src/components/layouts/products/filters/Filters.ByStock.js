// React
import { Component } from 'react'

// Components
import { Help, Button } from '@common'

// Utils
import { isFunction } from '@utils/Validations'

export default class ByStock extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.defaultValue !== nextProps.defaultValue
  }

  render() {
    return (
      <div id="by-stock" className="position-relative">
        {/* Ícono de ayuda */}
        <Help title="Establece el total de stock de los productos." />

        {/* Subtítulo */}
        <h3 className="subtitle">Filtrar por stock:</h3>

        {/* Stock */}
        <Stock limit={this.props.limit} defaultValue={this.props.defaultValue} onIncrease={this.props.onIncrease} onDecrease={this.props.onDecrease} />
      </div>
    )
  }
}

// <------------------------ Extra Components ------------------------>
export class Stock extends Component {
  static defaultProps = {
    limit: null,
    defaultValue: 0,
  }

  shouldComponentUpdate(nextProps) {
    return this.props.defaultValue !== nextProps.defaultValue
  }

  // Aumentar stock
  increaseStock = () => {
    const { limit, defaultValue, onIncrease } = this.props

    if (!limit) return

    if (defaultValue < limit) {
      isFunction(onIncrease) && onIncrease()
    }
  }

  // Decrementar stock
  decreaseStock = () => {
    const { defaultValue, onDecrease } = this.props

    if (defaultValue > 0) {
      isFunction(onDecrease) && onDecrease()
    }
  }

  render() {
    return (
      <div className="flex jc-center align-items-center">
        {/* Botón incrementar stock */}
        <Button icon="plus" className="increase mx-auto rounded-1" onClick={this.increaseStock} />

        {/* Stock */}
        <div className="stock fw-bold text-center rounded-1">{this.props.defaultValue}</div>

        {/* Botón decrementar stock */}
        <Button icon="minus" className="decrease mx-auto rounded-1" onClick={this.decreaseStock} />
      </div>
    )
  }
}
