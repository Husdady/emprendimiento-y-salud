// Types
import {
  // Ordenar productos Seytú por ...
  SORT_SEYTU_PRODUCTS_BY_NEWEST,

  // Ordenar productos Omnilife por ...
  SORT_OMNILIFE_PRODUCTS_BY_NEWEST,

  // Guardar filtros de los productos Seytú y Omnilife
  SAVE_SEYTU_EXTRA_FILTERS,
  SAVE_OMNILIFE_EXTRA_FILTERS,
} from '@redux/types'

// Utils
import { getISODate } from '@utils/Helper'
import { isFunction, isEmptyString } from '@utils/Validations'

// Crear filtros por defecto
function createDefaultFilters({ sortKey }) {
  return {
    limit: 20,
    activeCategories: [],
    searchValue: '',
    stock: 0,
    minPrice: '',
    maxPrice: '',
    date: null,
    applyFiltersInSearch: false,
    applyFiltersInCategories: false,
    applyFiltersInSortBy: false,
    sortKey: sortKey,
    sortBy: {
      createdAt: -1,
    },
  }
}

const initialState = {
  seytu: createDefaultFilters({
    sortKey: SORT_SEYTU_PRODUCTS_BY_NEWEST,
  }),
  omnilife: createDefaultFilters({
    sortKey: SORT_OMNILIFE_PRODUCTS_BY_NEWEST,
  }),
}

const manageFilters = (state = initialState, action) => {
  const { callback } = action

  switch (action.type) {
    // Guardar filtros extras en productos Seytú
    case SAVE_SEYTU_EXTRA_FILTERS:
      // Retornar callback si existe
      if (isFunction(callback)) {
        return callback(state)
      }

      // Agregar filtros a productos Seytú
      return {
        ...state,
        seytu: {
          ...state.seytu,
          ...action.filters,
        },
      }

    // Guardar filtros extras en productos Omnilife
    case SAVE_OMNILIFE_EXTRA_FILTERS:
      // Retornar callback si existe
      if (isFunction(callback)) {
        return callback(state)
      }

      // Agregar filtros a productos Omnilife
      return {
        ...state,
        omnilife: {
          ...state.omnilife,
          ...action.filters,
        },
      }

    default:
      return state
  }
}

// Obtener el estado del reducer
export const getFiltersState = ({ manageFilters }) => ({ ...manageFilters })

// Obtener filtros extras con JS puro
export function getExtraFilters() {
  const stock = document.getElementsByClassName('stock')[0]
  const maxPrice = document.getElementsByClassName('max-price')[0].value
  const minPrice = document.getElementsByClassName('min-price')[0].value

  const selectors = {
    date: '.creation-product-date > .ant-picker-input > input',
    search: 'apply-filters-in-search',
    categories: 'apply-filters-in-categories',
    sortBy: 'apply-filters-in-sort-by',
  }

  const date = document.querySelector(selectors.date)
  const applyFiltersInSearch = document.getElementsByClassName(selectors.search)[0]
  const applyFiltersInSortBy = document.getElementsByClassName(selectors.sortBy)[0]
  const applyFiltersInCategories = document.getElementsByClassName(selectors.categories)

  let ISODate = null

  if (!isEmptyString(date.value)) {
    ISODate = getISODate({ symbol: '/', value: date.value })
  }

  return {
    stock: Number(stock.innerText),
    maxPrice: !isEmptyString(maxPrice) ? Number(maxPrice) : null,
    minPrice: !isEmptyString(minPrice) ? Number(minPrice) : null,
    date: ISODate,
    defaultDate: date.value,
    applyFiltersInSearch: applyFiltersInSearch.classList.contains('active'),
    applyFiltersInCategories: applyFiltersInCategories[0].classList.contains('active'),
    applyFiltersInSortBy: applyFiltersInSortBy.classList.contains('active'),
  }
}

export default manageFilters
