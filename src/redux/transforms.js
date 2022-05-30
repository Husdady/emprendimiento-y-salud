// Librarys
import { createTransform } from 'redux-persist'

// Reducers
import { initialState } from '@redux/reducers/products'

// Utils
import { createState } from '@utils/Helper'

function getInboundState(inboundState) {
  return createState({
    objects: ['seytu', 'omnilife'],
    state: (obj) => ({
      activeTab: inboundState[obj].activeTab,
      favoriteProducts: inboundState[obj].favoriteProducts,
    }),
  })
}

function getOnboundState(onboundState) {
  return createState({
    objects: ['seytu', 'omnilife'],
    state: (obj) => ({
      ...initialState[obj],
      activeTab: onboundState[obj].activeTab,
      favoriteProducts: onboundState[obj].favoriteProducts,
    }),
  })
}

// Crear "transform" personalizado, para obtener algunos estados de nuestra "store"
const transform = createTransform(getInboundState, getOnboundState, {
  whitelist: ['manageProducts'],
})

export default transform
