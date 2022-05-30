// Librarys
import axios from '@api/axios'

// API
import { API_URL } from '@api/credentials'

// Utils
import fragments from '@utils/fragments'

/**
 * Obtener últimos productos
 * @param {company: String, limit: Number, query: String, setProducts: Function}
 * @returns
 */
export default async function getLastestProducts({ company, limit, graphqlQuery, setProducts }) {
  try {
    // GraphQL query
    const query = JSON.stringify({
      query: `query {
      ${graphqlQuery} (getLastestProducts: true, limit: ${limit}) {
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

    // Setear productos
    setProducts(APIProducts)
  } catch (err) {
    // Mostrar error por consola
    console.error(`[getLastestProducts.${company}.error]`, err.response)
  }
}
