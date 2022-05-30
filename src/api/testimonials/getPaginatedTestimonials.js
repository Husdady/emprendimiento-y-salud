// Librarys
import axios from '@api/axios'
import { message } from 'antd'

// API
import { API_URL } from '@api/credentials'

// Utils
import fragments from '@utils/fragments'

export default async function getPaginatedTestimonials({ limit, setTestimonials }) {
  try {
    // Graphql query
    const query = JSON.stringify({
      query: `query {
      testimonials(pagination: true, skip: 0, limit: ${limit}, sortBy: {
        createdAt: -1
      }) {
        ...TestimonialsFragment
      }}

      ${fragments.testimonials}`,
    })

    const { data } = await axios({
      method: 'POST',
      url: `${API_URL}/api/graphql`,
      data: query,
    })

    // Obtener testimonios paginados
    const APITestimonials = data['data'].testimonials

    if (!APITestimonials) {
      throw new Error('A ocurrido un error al obtener los testimonios')
    }

    // Agregar testimonios
    setTestimonials(APITestimonials)
  } catch (err) {
    // Mostar error por consola
    console.error('[getPaginatedTestimonials.error]', err.response)

    // Mostrar error por pantalla
    return message.error(err.message)
  }
}
