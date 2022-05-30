// Librarys
import axios from '@api/axios'
import { message } from 'antd'

// API
import { API_URL } from '@api/credentials'

// Utils
import { isFunction } from '@utils/Validations'

// Cancelar pedido de cliente
export default function cancelOrder(order, extraData) {
  const { types, company, showLoading, hideLoading, hideModal, hideConfirmModal } = extraData

  return async (dispatch, getReduxStore) => {
    try {
      const { client } = getReduxStore()

      // Mostrar "loading" en botón del modal que muestra los detalles del pedido
      if (isFunction(showLoading)) showLoading()

      if (isFunction(hideConfirmModal)) {
        // Ocultar modal de confirmación
        hideConfirmModal()

        // Mostrar "Cancelando pedido"
        message.loading('Cancelando pedido...', 999)
      }

      // Obtener id del producto
      const productId = order.product._id

      const res = await axios({
        method: 'PUT',
        url: `${API_URL}/api/products/${company}/orders/${client._id}/cancel/${productId}`,
      })

      // Actualizar estado de pedido de la tabla
      dispatch({
        type: types.changeOrderStatus,
        orderId: order._id,
        status: 'cancelled',
      })

      // Ocultar "loading" en botón del modal que muestra los detalles del pedido
      if (isFunction(hideLoading)) hideLoading()

      // Ocultar modal que muestra los detalles del pedido
      if (isFunction(hideModal)) hideModal()

      // Ocultar "Cancelando pedido"
      message.destroy()

      // Mostrar mensaje existoso
      return message.warning(res.data.message, 7)
    } catch (err) {
      // Ocultar "Cancelando pedido"
      message.destroy()

      // Ocultar "loading" en botón del modal que muestra los detalles del pedido
      if (isFunction(hideLoading)) hideLoading()

      // Si no hay respuesta del servidor
      if (!err.response) {
        return message.error(`A ocurrido un error al cancelar el pedido del producto: "${order.product.name}"`)
      }

      // Si se recibe un error, mostrarlo
      if (err.message) {
        return message.error(err.message, 6)
      }
    }
  }
}
