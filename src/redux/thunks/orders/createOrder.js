// Librarys
import axios from '@api/axios'
import { message } from 'antd'

// API
import { API_URL } from '@api/credentials'

// Types
import { SAVE_CLIENT } from '@redux/types'

// Utils
import nanoid from '@utils/nanoid'

// Crear pedido
export default function createOrder({ order, types, company, showLoading, hideLoading, hideModal, resetForm }) {
  return async (dispatch, getState) => {
    const { client, manageProducts } = getState()
    const { product, totalUnits, optionalMessage, nameOfTheIndividual, whatsappOfTheIndividual } = order

    // Obtener la fecha de creación del pedido
    const createdAt = new Date().toISOString()

    // Obtener los productos de los pedidos del cliente
    const { orders, totalOrders } = manageProducts[company]

    try {
      // Mostrar loading
      showLoading()

      // Setear id del cliente
      const newClientId = !client._id ? nanoid() : client._id

      // Setear id del pedido
      const orderId = nanoid()

      const newOrder = {
        clientId: newClientId,
        clientName: nameOfTheIndividual,
        clientPhone: whatsappOfTheIndividual,
        clientProduct: {
          _id: orderId,
          status: 'waiting',
          name: product.name,
          product: product._id,
          totalUnits: totalUnits,
          optionalMessage: optionalMessage,
          creationDate: createdAt,
          totalCost: product.price * totalUnits,
        },
      }

      const res = await axios({
        method: 'POST',
        data: newOrder,
        url: `${API_URL}/api/products/${company}/orders/new-order`,
      })

      // Setear nueva información del cliente
      const newClientData = {
        clientId: newClientId,
        clientName: nameOfTheIndividual,
        clientPhone: whatsappOfTheIndividual,
      }

      if (JSON.stringify(client) !== JSON.stringify(newClientData)) {
        // Guardar id del cliente
        dispatch({
          type: SAVE_CLIENT,
          ...newClientData,
        })
      }

      // Si el total de pedidos, es mayor a 5, simplemente aumentar el total de pedidos
      if (totalOrders > 5) {
        dispatch({
          type: types.addNewOrder,
          incrementTotalOrders: true,
        })
      }

      // Añadir pedido
      if (totalOrders <= 5) {
        // Obtener el índice del último producto de la tabla de pedidos
        const lastProduct = orders.slice(-1).pop()

        // Setear información del nuevo pedido
        const newOrder = {
          key: orderId,
          _id: orderId,
          index: lastProduct ? lastProduct.index + 1 : 1,
          status: 'waiting',
          totalUnits: totalUnits,
          creationDate: createdAt,
          product: {
            _id: product._id,
            name: product.name,
            stock: product.stock,
            price: parseInt(product.price),
            defaultImage: {
              url: product.defaultImage.url,
            },
          },
        }

        // Agregar nuevo pedido a la tabla
        dispatch({
          type: types.addNewOrder,
          newOrder: newOrder,
        })
      }

      // Ocultar loading en botón 'Realizar pedido'
      hideLoading()

      // Ocultar modal
      hideModal()

      // Mensaje exitoso
      return message.success(res.data.message, 7)
    } catch (err) {
      // Mostrar error en consola
      console.error('[createOrder.error]', err.response)

      // Ocultar loading en botón 'Realizar pedido'
      hideLoading()

      // Ocultar modal
      hideModal()

      // Si no hay respuesta del servidor
      if (!err.response) {
        return message.error(`A ocurrido un error al realizar un pedido del producto: "${order.product.name}"`)
      }

      const { data } = err.response

      // Error de pedido duplicado
      if (data.duplicateError) {
        return message.warn(data.duplicateError, 7)
      }

      // Mostrar error por pantalla
      if (data) {
        return message.error(data.error, 6)
      }

      // Si se recibe un error, mostrarlo en pantalla
      if (err.message) {
        return message.error(err.message, 6)
      }
    }
  }
}
