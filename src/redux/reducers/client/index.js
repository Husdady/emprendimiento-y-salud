// Types
import { SAVE_CLIENT } from '@redux/types'

const initialState = {}

const client = (state = initialState, action) => {
  switch (action.type) {
    // Guardar id del cliente que realizó un pedido
    case SAVE_CLIENT:
      return {
        _id: action.clientId,
        name: action.clientName,
        phone: action.clientPhone,
      }

    default:
      return state
  }
}

// Obtener el estado del reducer y exportarlo
export default client
export const getClientState = ({ client }) => ({ client })
