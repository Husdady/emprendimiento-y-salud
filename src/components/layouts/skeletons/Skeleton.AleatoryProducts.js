// React
import { Component } from 'react'

// Librarys
import { Skeleton } from 'antd'

// Utils
import { generateArray } from '@utils/Helper'

export default class SkeletonAleatoryProducts extends Component {
  constructor(props) {
    super(props)
    this.renderItems = this.renderItems.bind(this)
    this.renderSkeleton = this.renderSkeleton.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    return this.props.loading !== nextProps.loading
  }

  // Renderizar un elemento del contenido de la tabla
  renderItems() {
    // Estilos del campo
    const fieldStyle = {
      height: '100%',
      margin: 'auto',
      display: 'block',
      minWidth: 'auto',
    }

    return generateArray(this.props.totalItems).map((_, i) => (
      <li key={i} style={{ width: '100%' }} className="react-multi-carousel-item react-multi-carousel-item--active">
        <Skeleton.Button block active style={fieldStyle} />
      </li>
    ))
  }

  renderSkeleton() {
    return (
      <div className="react-multi-carousel-list  aleatory-products skeleton">
        <ul className="react-multi-carousel-track d-flex" style={{ width: '100%' }}>
          {this.renderItems()}
        </ul>
      </div>
    )
  }

  render() {
    // Si está cargando mostrar skeleton
    if (this.props.loading) {
      return this.renderSkeleton()
    }

    return this.props.children
  }
}
