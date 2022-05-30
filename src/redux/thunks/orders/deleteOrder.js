// Librarys
import axios from '@api/axios'
import { message } from 'antd'

// API
import { API_URL } from '@api/credentials'

// Utils
import { isFunction } from '@utils/Validations'

// Eliminar pedido cancelado de cliente
export default function deleteOrder(order, extraData) {
  const { types, company, showLoading, hideLoading, hideModal, hideConfirmModal } = extraData

  return async (dispatch, getReduxStore) => {
    try {
      const { client } = getReduxStore()

      // Mostrar "loading" en botón del modal que muestra los detalles del pedido
      if (isFunction(showLoading)) showLoading()

      if (isFunction(hideConfirmModal)) {
        // Ocultar modal de confirmación
        hideConfirmModal()

        // Mostrar "Eliminando pedido"
        message.loading('Eliminando pedido...', 999)
      }

      await axios({
        method: 'DELETE',
        url: `${API_URL}/api/products/${company}/orders/${client._id}/delete/${order._id}`,
      })

      // Eliminar pedido de tabla
      dispatch({
        type: types.deleteOrder,
        orderId: order._id,
      })

      // Ocultar "loading" en botón del modal que muestra los detalles del pedido
      if (isFunction(hideLoading)) hideLoading()

      // Ocultar modal que muestra los detalles del pedido
      if (isFunction(hideModal)) hideModal()

      // Ocultar "Cancelando pedido"
      message?.destroy()

      // Mostrar mensaje existoso
      return message.warn(`Has eliminado el producto "${order.product.name}" de tu historial de pedidos`, 7)
    } catch (err) {
      // Ocultar "Eliminando pedido"
      message?.destroy()

      // Ocultar "loading" en botón del modal que muestra los detalles del pedido
      if (isFunction(hideLoading)) hideLoading()

      // Si no hay respuesta del servidor
      if (!err.response) {
        return message.error(`A ocurrido un error al eliminar el producto: "${order.product.name}" de tu historial de pedidos`)
      }

      // Si se recibe un error, mostrarlo
      if (err.message) {
        return message.error(err.message, 6)
      }
    }
  }
}
