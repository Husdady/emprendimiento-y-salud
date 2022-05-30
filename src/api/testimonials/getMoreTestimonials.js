// Librarys
import axios from '@api/axios'
import { message } from 'antd'

// API
import { API_URL } from '@api/credentials'

// Utils
import fragments from '@utils/fragments'
import { isFunction, isEmptyArray } from '@utils/Validations'

export default async function getMoreTestimonials({ skip, skipMore, limit, showLoading, hideLoading, addTestimonials, hideLoadMoreButton }) {
  // Mostrar loading en botón
  if (isFunction(showLoading)) showLoading()

  try {
    // Graphql query
    const query = JSON.stringify({
      query: `query {
      testimonials(pagination: true, skip: ${skip}, limit: ${limit}, sortBy: {
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

    // Si la API no trae testimonios en formato 'Array'
    if (!APITestimonials) {
      throw new Error('A ocurrido un error al cargar más testimonios')
    }

    // Agregar testimonios
    addTestimonials(APITestimonials)

    // Si ya no hay testimonios para mostrar
    if (isEmptyArray(APITestimonials)) {
      isFunction(hideLoadMoreButton) && hideLoadMoreButton()
      return message.success('Todos los testimonios se han cargado correctamente', 7)
    }

    // Aumentar valor de 'skip'
    if (isFunction(skipMore)) skipMore()
  } catch (err) {
    // Mostar error por consola
    console.error('[getMoreTestimonials.error]', err.response)

    // Mostrar error por pantalla
    message.error(err.message)
  }

  // Ocultar loading en botón
  if (isFunction(hideLoading)) hideLoading()
}
