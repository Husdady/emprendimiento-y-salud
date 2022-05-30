// Librarys
import axios from '@api/axios'

// API
import { API_URL } from '@api/credentials'

// Utils
import fragments from '@utils/fragments'

export default async function getProductInformation({ product, graphqlQuery, ...extraData }) {
  try {
    // GraphQL query
    const query = JSON.stringify({
      query: `query {
      	${graphqlQuery} (name: "${product}") {
          ...ProductFragment
      }}

      ${fragments.product}`,
    })

    const { data } = await axios({
      method: 'POST',
      url: `${API_URL}/api/graphql`,
      data: query,
    })

    // Obtener productos
    const APIProduct = data['data'][graphqlQuery]

    // Setear producto
    extraData.setProductInformation(APIProduct)
  } catch (err) {
    // Mostrar mensaje de error por consola
    console.log('[getProductInformation.error]', err.response)

    // Mostrar mensaje de error por pantalla
    message.warn(`No se ha encontrado el producto con el nombre: "${product}"`)
  }

  // Ocultar loading
  extraData.hideLoading()
}
