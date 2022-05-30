// Librarys
import axios from '@api/axios'

// API
import { API_URL } from '@api/credentials'

// Utils
import fragments from '@utils/fragments'
import { setIndexToTable } from '@utils/Helper'
import { isFunction, isEmptyObject, isEmptyArray } from '@utils/Validations'

// Paginar productos de pedidos realizados por un cliente
export default function getPaginatedOrders({ skip, limit, types, company, setCurrentPage, graphqlQuery }) {
  return async (dispatch, getState) => {
    try {
      // Obtener cliente y productos
      const { client, manageProducts } = getState()

      // Cliente vacío
      const emptyClient = isEmptyObject(client)

      // Comprobar si no existe un cliente que ha realizado un pedido
      if (emptyClient) {
        // Ocultar loading
        return dispatch({ type: types.hideLoading })
      }

      // Setear valor de "skip"
      const i = skip !== 0 ? (skip - 1) * limit : skip

      // Obtener pedidos
      const { orders } = manageProducts[company]

      // Graphql query
      const query = JSON.stringify({
        query: `query {
        ${graphqlQuery}(pagination: true, skip: ${i}, limit: ${limit}, filters: {
            clientId: "${client._id}"
        }) {
          ...OrdersFragment
        }}

        ${fragments.orders}`,
      })

      // Si ya se han cargado los pedidos en la tabla, mostrar loading
      if (!isEmptyArray(orders)) {
        dispatch({ type: types.showLoading })
      }

      // Petición para obtener los pedidos del cliente
      const { data } = await axios({
        method: 'POST',
        url: `${API_URL}/api/graphql`,
        data: query,
      })

      // Obtener el total de productos de cada pedido realizado por un cliente
      const APITotalClientProducts = data['data'][graphqlQuery].count

      // Obtener productos de cada pedido realizado por un cliente
      const APIClientProducts = data['data'][graphqlQuery].clientProducts

      // Si la API devuelve 'null', finalizar función
      if (!APIClientProducts) return

      const field = company + 'Orders'

      // Setear pedidos de productos del producto
      dispatch({
        type: types.setOrders,
        totalOrders: APITotalClientProducts,
        [field]: setIndexToTable({
          skip: skip,
          limit: limit,
          data: formatClientProducts(APIClientProducts),
        }),
      })

      // Setear página actual de la tabla
      isFunction(setCurrentPage) && setCurrentPage()

      // Ocultar loading
      dispatch({ type: types.hideLoading })
    } catch (err) {
      console.log(`[getPaginatedOrders.${company}.error]`, err)
    }
  }
}

// Formatear estructura de los productos del cliente
function formatClientProducts(clientProducts) {
  const result = []

  for (let i = 0; i < clientProducts.length; i++) {
    const item = clientProducts[i]
    const { _id, status, product, totalUnits, creationDate } = item

    result.push({
      index: i + 1,
      _id: item._id,
      key: product._id,
      product: product,
      status: item.status,
      totalUnits: item.totalUnits,
      creationDate: item.creationDate,
    })
  }

  return result
}
