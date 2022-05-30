// Librarys
import axios from '@api/axios'

// API
import { API_URL } from '@api/credentials'

// Utils
import fragments from '@utils/fragments'

export default async function getAleatoryProducts({ company, graphqlQuery, productToExclude, ...extraData }) {
  try {
    // Mostrar "skeletons" en productos aleatorios
    extraData.showLoading()

    // GraphQL query
    const query = JSON.stringify({
      query: `query {
      ${graphqlQuery}(getAleatoryProducts: true, limit: 20, filters: {
        name: "${productToExclude}"
      }) {
        ...ProductsBenefitsFragment
      }}

      ${fragments.productsBenefits}`,
    })

    const { data } = await axios({
      method: 'POST',
      url: `${API_URL}/api/graphql`,
      data: query,
    })

    // Obtener productos
    const APIProducts = data['data'][graphqlQuery]

    if (APIProducts) {
      // Setear productos
      extraData.setProducts(APIProducts)

      // Ocultar loading
      setTimeout(extraData.hideLoading, 2000)
    }
  } catch (err) {
    // Mostrar error por consola
    console.error(`[getLatestProducts.${company}.error]`, err.response)
  }
}
