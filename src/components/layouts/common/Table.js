// React
import { Component } from 'react'

// Components
import { Button } from '@common'
import Skeleton from '@layouts/skeletons/Skeleton.Table'

// Librarys
import { Table, Empty } from 'antd'

// Utils
import { classnames } from '@utils/Helper'
import { isFunction } from '@utils/Validations'

export default class CustomTable extends Component {
  static defaultProps = {
    data: [],
    pagination: {},
    emptyMessage: 'Sin datos...',
  }

  constructor(props) {
    super(props)
    this.onPaginate = this.onPaginate.bind(this)
    this.setCurrentPage = this.setCurrentPage.bind(this)
    this.renderTable = this.renderTable.bind(this)

    this.state = {
      currentPage: 1,
    }

    this.emptyTableItems = {
      emptyText: <Empty style={{ paddingBottom: '.5em' }} description={this.props.emptyMessage} />,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data || this.props.loading !== nextProps.loading || this.state.currentPage !== nextState.currentPage
  }

  // Setear página actual de la tabla
  setCurrentPage(i) {
    if (i === this.state.currentPage) return

    this.setState({ currentPage: i })
  }

  // Cuando se actualiza la página actual de la tabla
  onPaginate(i) {
    const { onPaginate } = this.props.pagination

    // Comprobar si 'onPaginate' es una función
    const isFuncOnPaginate = isFunction(onPaginate)

    // Si no lo es, finalizar función
    if (!isFuncOnPaginate) return

    // Evento 'onChange' que se ejecuta al cambiar de página
    onPaginate({
      currentPage: i,
      setCurrentPage: () => this.setCurrentPage(i),
    })
  }

  // Renderizar tabla
  renderTable() {
    const { pagination } = this.props
    // console.log('[currentPage]', this.state.currentPage)
    return (
      <Table
        bordered
        columns={this.props.fields}
        dataSource={this.props.data}
        locale={this.emptyTableItems}
        className={this.props.className}
        onRow={this.props.onRow}
        pagination={{
          total: pagination.totalSize,
          pageSize: pagination.pageSize,
          current: this.state.currentPage,
          onChange: this.onPaginate,
        }}
      />
    )
  }

  render() {
    return (
      <Skeleton data={this.props.data} loading={this.props.loading} items={this.props.skeletonItems} fields={this.props.skeletonFields} totalItems={this.props.pagination.pageSize}>
        {this.renderTable()}
      </Skeleton>
    )
  }
}

// <------------------------ Extra Components ------------------------>
export class ActionButton extends Component {
  static defaultProps = {
    icon: {},
    onAction: function () {},
  }

  shouldComponentUpdate(nextProps) {
    return this.props.icon !== nextProps.icon
  }

  render() {
    const actionButtonClasses = classnames(['rounded-1', this.props.className])

    return <Button icon={this.props.icon} style={this.props.style} onClick={this.props.onAction} attributes={this.props.attributes} className={actionButtonClasses} />
  }
}
