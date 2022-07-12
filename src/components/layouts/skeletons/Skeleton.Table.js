// React
import { Component } from 'react'

// Components
import Loading from '@layouts/loaders/Preload'

// Librarys
import { Skeleton } from 'antd'
// Utils
import { generateArray } from '@utils/Helper'

// Setear estilos a un campo
const setFieldStyle = ({ width }) => ({ width, height: 10, minWidth: 'auto' })

export default class SkeletonTable extends Component {
  static defaultProps = {
    items: [],
    fields: [],
    totalItems: 0,
  }

  constructor(props) {
    super(props)
    this.mq = window.innerWidth <= 900
    this.renderHeader = this.renderHeader.bind(this)
    this.renderBodyContent = this.renderBodyContent.bind(this)
    this.renderSkeleton = this.renderSkeleton.bind(this)

    this.styles = {
      loading: {
        height: 400,
      },
      containerSkeleton: {
        maxWidth: '100%',
      },
      table: {
        tableLayout: 'auto',
      },
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.loading === null) return false

    return this.props.data !== nextProps.data || this.props.loading !== nextProps.loading || this.props.totalItems !== nextProps.totalItems
  }

  // Renderizar campo de cabezera
  renderField(width, i) {
    // Estilos del campo
    const fieldStyle = setFieldStyle({ width })

    return (
      <th key={i} className="ant-table-cell">
        <Skeleton.Button block active style={fieldStyle} className="d-block mx-auto" />
      </th>
    )
  }

  // Renderizar cabezera de la tabla
  renderHeader() {
    return this.props.fields.map(this.renderField)
  }

  // Renderizar un elemento del contenido de la tabla
  renderColumn(width, i) {
    // Estilos del campo
    const fieldStyle = setFieldStyle({ width })

    return (
      <td key={i} className="ant-table-cell">
        <Skeleton.Button block active style={fieldStyle} className="d-block mx-auto" />
      </td>
    )
  }

  // Renderizar contenido de la tabla
  renderBodyContent() {
    return generateArray(this.props.totalItems).map((_, i) => (
      <tr key={i} className="ant-table-row ant-table-row-level-0">
        {this.props.items.map(this.renderColumn)}
      </tr>
    ))
  }

  renderSkeleton() {
    return (
      <div className="my-orders mx-auto" style={this.styles.containerSkeleton}>
        <div className="ant-table-wrapper">
          <div className="ant-spin-nested-loading">
            <div className="ant-table ant-table-bordered">
              <div className="ant-table-content">
                <table style={this.styles.table}>
                  {/* Campos */}
                  <thead className="ant-table-thead">
                    <tr>{this.renderHeader()}</tr>
                  </thead>

                  {/* Columnas */}
                  <tbody className="ant-table-tbody">{this.renderBodyContent()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const isNotLoading = this.props.loading === null

    if (isNotLoading) {
      return <Loading style={this.styles.loading} />
    }

    // Si está cargando mostrar skeleton
    if (this.props.loading) {
      return this.renderSkeleton()
    }

    return this.props.children
  }
}
