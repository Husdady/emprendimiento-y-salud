// Librarys
import { combineReducers } from 'redux'

// Reducers
import client from './client'
import manageFilters from './filters'
import manageProducts from './products'

// Definir reducers
const reducers = combineReducers({
  client: client,
  manageFilters: manageFilters,
  manageProducts: manageProducts,
})

export default reducers
