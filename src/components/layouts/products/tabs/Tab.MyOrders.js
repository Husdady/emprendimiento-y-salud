// React
import { Component } from 'react'

// Components
import OrderTable from '@layouts/orders/Orders.Table'

// Librarys
import { connect } from 'react-redux'

// Actions
import getProductsActions from '@redux/actions/products'

// Utils
import { createDispatch } from '@utils/Helper'

class MyOrders extends Component {
  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    this.getPaginatedOrders({})
  }

  // Obtener productos paginados del pedido del cliente
  getPaginatedOrders = ({ currentPage, setCurrentPage }) => {
    const { company, dispatch } = this.props

    const config = {
      skip: 0,
      limit: 5,
    }

    if (currentPage) {
      Object.assign(config, {
        skip: currentPage,
        setCurrentPage: setCurrentPage,
      })
    }

    dispatch[company].getPaginatedOrders(config)
  }

  render() {
    return <OrderTable company={this.props.company} onPaginate={this.getPaginatedOrders} emptyMessage="No se han realizado pedidos" />
  }
}

function mapDispatchToProps(dispatch) {
  const actions = getProductsActions(dispatch)

  return {
    dispatch: createDispatch({
      objects: ['seytu', 'omnilife'],
      methods: (obj) => ({
        getPaginatedOrders: actions[obj].getPaginatedOrders,
      }),
    }),
  }
}

export default connect(null, mapDispatchToProps)(MyOrders)
