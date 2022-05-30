// Librarys
import axios from '@api/axios'
import { message } from 'antd'

// API
import { API_URL } from '@api/credentials'

// Utils
import { isFunction } from '@utils/Validations'

// Confirmar pedido de cliente
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

        // Mostrar "Confirmando pedido"
        message.loading('Confirmando pedido...', 999)
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

      // Ocultar "Confirmando pedido"
      message?.destroy()

      // Mostrar mensaje existoso
      return message.success('El pedido ha sido completado exitosamente', 7)
    } catch (err) {
      // Ocultar "Confirmando pedido"
      message?.destroy()

      // Ocultar "loading" en botón del modal que muestra los detalles del pedido
      if (isFunction(hideLoading)) hideLoading()

      // Si no hay respuesta del servidor
      if (!err.response) {
        return message.error(`A ocurrido un error al realizar un pedido del producto: "${order.product.name}"`)
      }

      // Si se recibe un error, mostrarlo
      if (err.message) {
        return message.error(err.message, 6)
      }
    }
  }
}
