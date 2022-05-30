// React
import { Component, Fragment, createRef } from 'react'

// Components
import Table, { ActionButton } from '@layouts/common/Table'
import OrderDetails from '@layouts/orders/Orders.Details'

// Librarys
import { Tag } from 'antd'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Actions
import getProductsActions from '@redux/actions/products'

// Utils
import { truncate, formatDate, createState, createDispatch, showConfirmModal, convertEmptySpacesInHyphens } from '@utils/Helper'

class OrdersTable extends Component {
  static defaultProps = {
    limit: 5,
  }

  constructor(props) {
    super(props)
    this.refOrderDetails = createRef()
    this.onCancelOrder = this.onCancelOrder.bind(this)
    this.onDeleteOrder = this.onDeleteOrder.bind(this)
    this.onConfirmOrder = this.onConfirmOrder.bind(this)
    this.renderSecondaryButton = this.renderSecondaryButton.bind(this)

    this.eyeButton = {
      name: 'eye',
      color: 'var(--bg-blue)',
    }

    this.checkButton = {
      name: 'check',
      color: 'var(--bg-green)',
    }

    this.cancelButton = {
      name: 'ban',
      color: 'var(--bg-darkyellow)',
    }

    this.deleteButton = {
      name: 'trash-alt',
      color: 'var(--bg-red)',
    }

    this.styles = {
      fields: {
        medium: {
          width: 150,
        },
        large: {
          width: 280,
        },
      },
    }

    this.fields = [
      {
        title: '#',
        dataIndex: 'index',
        key: 'index',
        render: this.renderIndex,
      },
      {
        title: 'Nombre del producto',
        dataIndex: 'product',
        key: 'product',
        render: this.renderOrderProduct,
      },
      {
        title: 'Cantidad del producto',
        dataIndex: 'totalUnits',
        key: 'totalUnits',
        render: this.renderOrderTotalUnits.bind(this),
      },
      {
        title: 'Estado del pedido',
        dataIndex: 'status',
        key: 'status',
        render: this.renderOrderStatus,
      },
      {
        title: 'Fecha de realización del pedido',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: this.renderDate.bind(this),
      },
      {
        title: 'Acciones',
        dataIndex: 'actions',
        key: 'actions',
        render: this.renderActionButtons.bind(this),
      },
    ]
  }

  shouldComponentUpdate(nextProps) {
    const { company } = this.props

    return this.props[company].orders !== nextProps[company].orders || this.props[company].loadingOrders !== nextProps[company].loadingOrders
  }

  // Evento 'click' en una celda de la tabla
  onRowClick = ({ _id, status, product }) => {
    return {
      onClick: () => this.onShowOrderDetails({ _id, status, product }),
    }
  }

  // Evento 'click' en el icono "ban" para cancelar un pedido
  onCancelOrder(order) {
    showConfirmModal({
      icon: 'exclamation-circle',
      iconColor: 'var(--bg-darkyellow)',
      title: `¿Estás seguro o segura que deseas cancelar el pedido del producto "${order.product.name}"?`,
      description: `Al cancelar el pedido del producto \"${order.product.name}\", el estado del pedido cambiará a \"Cancelado\" y no podrás realizar otro pedido de este producto.`,
      confirmButtonIcon: 'ban',
      confirmButtonTitle: 'Cancelar pedido',
      confirmButtonStyle: {
        border: 'none',
        color: '#000000',
        fontWeight: 'bold',
        backgroundColor: 'var(--bg-darkyellow)',
      },
      onSuccess: (hideConfirmModal) => {
        const { company, dispatch } = this.props
        dispatch[company].cancelOrder(order, { hideConfirmModal })
      },
    })
  }

  // Evento 'click' en el icono "trash" para eliminar un pedido
  onDeleteOrder(order) {
    showConfirmModal({
      icon: 'exclamation-circle',
      iconColor: 'var(--bg-red)',
      title: `¿Estás seguro o segura que deseas eliminar el producto "${order.product.name}" de tu historial de pedidos?`,
      description: `Has cancelado el pedido, por lo tanto, puedes eliminar el producto sin ningún problema. Al eliminar el producto \"${order.product.name}\", podrás volver a realizar un pedido de este producto.`,
      confirmButtonIcon: 'trash-alt',
      confirmButtonTitle: 'Eliminar pedido',
      confirmButtonStyle: { backgroundColor: 'var(--bg-red)', color: '#ffffff' },
      onSuccess: (hideConfirmModal) => {
        const { company, dispatch } = this.props
        dispatch[company].deleteOrder(order, { hideConfirmModal })
      },
    })
  }

  // Evento 'click' en el icono "check" para confirmar un pedido
  onConfirmOrder(order) {
    showConfirmModal({
      icon: 'check-circle',
      iconColor: 'var(--bg-green)',
      title: 'Confirmación de pedido',
      description: `Al confirmar el pedido del producto \"${order.product.name}\", finalizarás el procedimiento de compra del producto, por lo que te agradecemenos inmensamente por confiar en nosotros.`,
      confirmButtonIcon: 'check',
      confirmButtonTitle: 'Confirmar pedido',
      confirmButtonStyle: {
        border: 'none',
        color: '#ffffff',
        backgroundColor: 'var(--bg-green)',
      },
      onSuccess: (hideConfirmModal) => {
        const { company, dispatch } = this.props
        dispatch[company].confirmOrder(order, { hideConfirmModal })
      },
    })
  }

  // Mostrar detalles del pedido
  onShowOrderDetails({ _id, status, product }) {
    this.refOrderDetails.current?.show({
      _id: _id,
      status: status,
      product: {
        ...product,
        price: product.price.toFixed(2),
        defaultImage: {
          ...product.defaultImage,
          alt: convertEmptySpacesInHyphens(product.name),
        },
      },
    })
  }

  // Renderizar índice de tabla
  renderIndex(i) {
    return <b>#{i}</b>
  }

  // Renderizar producto del pedido
  renderOrderProduct(product) {
    return (
      <div className="field-product-name d-flex align-items-center">
        {/* Imagen del producto */}
        <img width="80" height="80" title={product.name} alt="product-image" className="pointer me-2" src={product?.defaultImage.url} />

        {/* Nombre del producto */}
        <span className="text-center">
          <b>{truncate(product.name, 15)}</b>
        </span>
      </div>
    )
  }

  // Renderizar cantidad total de los productos del pedido
  renderOrderTotalUnits(totalUnits) {
    return (
      <span className="mx-auto d-block text-center" style={this.styles.fields.medium}>
        <b>{totalUnits}</b>
        <span>&nbsp;unidades</span>
      </span>
    )
  }

  // Renderizar estado del pedido
  renderOrderStatus(status) {
    const tag = {}
    const orderType = {
      // Pedido en espera
      waiting: function () {
        Object.assign(tag, {
          icon: 'clock',
          text: 'En espera',
          color: 'var(--bg-darkyellow)',
          style: {
            fontWeight: 'bold',
            color: 'var(--bg-dark)',
            marginRight: 0,
          },
        })
      },

      // Pedido cancelado
      cancelled: function () {
        Object.assign(tag, {
          text: 'Cancelado',
          icon: 'times-circle',
          color: 'var(--bg-red)',
          style: {
            marginRight: 0,
          },
        })
      },

      // Pedido completado
      completed: function () {
        Object.assign(tag, {
          icon: 'check-circle',
          text: 'Completado',
          color: 'var(--bg-green)',
          style: {
            marginRight: 0,
          },
        })
      },
    }

    // Obtener la acción que se debe ejecutar
    const action = orderType[status]

    // Ejecutar acción
    action()

    return (
      <div className="mx-auto" style={{ width: 150 }}>
        <Tag color={tag.color} style={tag.style}>
          <FontAwesomeIcon icon={tag.icon} />
          <span className="ms-1">{tag.text}</span>
        </Tag>
      </div>
    )
  }

  // Renderizar fecha
  renderDate(date) {
    return (
      <i className="mx-auto d-block" style={this.styles.fields.large}>
        {formatDate(date)}
      </i>
    )
  }

  // Renderizar botón secundario
  renderSecondaryButton(fields) {
    const button = {}
    const orderType = {
      // Pedido en espera
      waiting: () => {
        Object.assign(button, {
          icon: this.cancelButton,
          attributes: { title: 'Cancelar pedido' },
          onClick: () => this.onCancelOrder(fields),
        })
      },

      // Pedido cancelado
      cancelled: () => {
        Object.assign(button, {
          icon: this.deleteButton,
          attributes: { title: 'Eliminar pedido' },
          onClick: () => this.onDeleteOrder(fields),
        })
      },

      // Pedido completado
      completed: () => {
        Object.assign(button, {
          icon: this.checkButton,
          attributes: { title: 'Confirmar pedido' },
          onClick: () => this.onConfirmOrder(fields),
        })
      },
    }

    // Obtener el estado del pedido
    const { status } = fields

    // Obtener la acción que se debe ejecutar
    const action = orderType[status]

    // Ejecutar acción
    action()

    return <ActionButton icon={button.icon} attributes={button.attributes} onAction={button.onClick} />
  }

  // Renderizar botones de acción
  renderActionButtons(_, fields) {
    return (
      <div className="flex jc-around mx-auto" style={{ width: 62 }}>
        {/* Botón visualizar pedido */}
        <ActionButton className="me-2" icon={this.eyeButton} onAction={() => this.onShowOrderDetails(fields)} attributes={{ title: 'Visualizar detalles del pedido' }} />

        {this.renderSecondaryButton(fields)}
      </div>
    )
  }

  render() {
    const { orders, totalOrders, loadingOrders } = this.props[this.props.company]

    return (
      <Fragment>
        <Table
          data={orders}
          fields={this.fields}
          onRow={this.onRowClick}
          className="my-orders mx-auto mt-3"
          loading={loadingOrders}
          emptyMessage={this.props.emptyMessage}
          skeletonFields={[25, 200, 180, 180, 200, 60]}
          skeletonItems={[18, 160, 140, 140, 160, 30]}
          pagination={{
            totalSize: totalOrders,
            pageSize: this.props.limit,
            onPaginate: this.props.onPaginate,
          }}
        />

        {/* Detalles del pedido */}
        <OrderDetails showCancelButton ref={this.refOrderDetails} company={this.props.company} />
      </Fragment>
    )
  }
}

// Obtener estado de pedidos de un cliente
function mapStateToProps({ manageProducts }) {
  return createState({
    objects: [
      { name: 'seytu', value: manageProducts.seytu },
      { name: 'omnilife', value: manageProducts.omnilife },
    ],
    state: (obj) => ({
      orders: obj.orders,
      totalOrders: obj.totalOrders,
      loadingOrders: obj.loadingOrders,
    }),
  })
}

// Obtener acciones para cancelar/eliminar/confirmar un pedido
function mapDispatchToProps(dispatch) {
  const actions = getProductsActions(dispatch)

  return {
    dispatch: createDispatch({
      objects: ['seytu', 'omnilife'],
      methods: (obj) => ({
        cancelOrder: actions[obj].cancelOrder,
        deleteOrder: actions[obj].deleteOrder,
        confirmOrder: actions[obj].confirmOrder,
      }),
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable)
