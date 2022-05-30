// Librarys
import axios from '@api/axios'

// API
import { API_URL } from '@api/credentials'

// Utils
import fragments from '@utils/fragments'

export default async function getLastestTestimonials({ limit, setTestimonials }) {
  try {
    // Graphql query
    const query = JSON.stringify({
      query: `query {
        testimonials(getLastestTestimonials: true, limit: ${limit}) {
          ...TestimonialsFragment
        }}

        ${fragments.testimonials}`,
    })

    const { data } = await axios({
      method: 'POST',
      url: `${API_URL}/api/graphql`,
      data: query,
    })

    // Obtener testimonios
    const APITestimonials = data['data'].testimonials

    // Setear testimonios
    setTestimonials(APITestimonials)
  } catch (err) {
    // Mostrar error por consola
    console.error(`[getLastestTestimonials.error]`, err.response)
  }
}
