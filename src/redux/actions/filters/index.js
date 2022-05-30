// Types
import * as types from '@redux/types'

// Thunks
import { applyExtraFilters, sortProductsBy, searchProducts, searchProductsByCategories } from '@redux/thunks'

// Utils
import { createDispatch } from '@utils/Helper'

// Settings
export const config = {
  seytu: {
    products: {
      company: 'seytu',
      graphqlQuery: 'seytu_products',
      types: {
        setProducts: types.SET_SEYTU_PRODUCTS,
        saveExtraFilters: types.SAVE_SEYTU_EXTRA_FILTERS,
        sortByOldest: types.SORT_SEYTU_PRODUCTS_BY_OLDEST,
        sortByNewest: types.SORT_SEYTU_PRODUCTS_BY_NEWEST,
        sortByMostPopular: types.SORT_SEYTU_PRODUCTS_BY_MOST_POPULAR,
        sortByLeastPopular: types.SORT_SEYTU_PRODUCTS_BY_LEAST_POPULAR,
        sortByAscName: types.SORT_SEYTU_PRODUCTS_BY_ASC_NAME,
        sortByDescName: types.SORT_SEYTU_PRODUCTS_BY_DESC_NAME,
        sortByMinorStock: types.SORT_SEYTU_PRODUCTS_BY_MINOR_STOCK,
        sortByHighestStock: types.SORT_SEYTU_PRODUCTS_BY_HIGHEST_STOCK,
        sortByMostCheapest: types.SORT_SEYTU_PRODUCTS_BY_MOST_CHEAPEST,
        sortByMostExpensive: types.SORT_SEYTU_PRODUCTS_BY_MOST_EXPENSIVE,
        showLoading: types.SHOW_LOADING_SEYTU_PRODUCTS,
        hideLoading: types.HIDE_LOADING_SEYTU_PRODUCTS,
      },
    },
  },
  omnilife: {
    products: {
      company: 'omnilife',
      graphqlQuery: 'omnilife_products',
      types: {
        setProducts: types.SET_OMNILIFE_PRODUCTS,
        saveExtraFilters: types.SAVE_OMNILIFE_EXTRA_FILTERS,
        sortByOldest: types.SORT_OMNILIFE_PRODUCTS_BY_OLDEST,
        sortByNewest: types.SORT_OMNILIFE_PRODUCTS_BY_NEWEST,
        sortByMostPopular: types.SORT_OMNILIFE_PRODUCTS_BY_MOST_POPULAR,
        sortByLeastPopular: types.SORT_OMNILIFE_PRODUCTS_BY_LEAST_POPULAR,
        sortByAscName: types.SORT_OMNILIFE_PRODUCTS_BY_ASC_NAME,
        sortByDescName: types.SORT_OMNILIFE_PRODUCTS_BY_DESC_NAME,
        sortByHighestStock: types.SORT_OMNILIFE_PRODUCTS_BY_HIGHEST_STOCK,
        sortByMinorStock: types.SORT_OMNILIFE_PRODUCTS_BY_MINOR_STOCK,
        sortByMostCheapest: types.SORT_OMNILIFE_PRODUCTS_BY_MOST_CHEAPEST,
        sortByMostExpensive: types.SORT_OMNILIFE_PRODUCTS_BY_MOST_EXPENSIVE,
        showLoading: types.SHOW_LOADING_OMNILIFE_PRODUCTS,
        hideLoading: types.HIDE_LOADING_OMNILIFE_PRODUCTS,
      },
    },
  },
}

// Crear dispatch que cambien el estado del reducer
export default function (dispatch) {
  return createDispatch({
    objects: ['seytu', 'omnilife'],
    methods: (obj) => ({
      // Guardar filtros extras
      saveExtraFilters: function (filters) {
        return dispatch({
          type: config[obj].products.types.saveExtraFilters,
          filters: filters,
        })
      },

      // Aplicar filtros extras
      applyExtraFilters: function (extraData) {
        return dispatch(applyExtraFilters({ ...extraData, ...config[obj].products }))
      },

      // Buscar productos por nombre
      searchProducts: function (value) {
        return dispatch(searchProducts({ ...config[obj].products, value }))
      },

      // Setear categorías a filtros
      setCategoriesFilters: function (categories) {
        return dispatch({
          type: config[obj].products.types.saveExtraFilters,
          filters: {
            activeCategories: categories,
          },
        })
      },

      // Agregar categoría a filtros
      addCategoryId: function (categoryId) {
        return dispatch({
          type: config[obj].products.types.saveExtraFilters,
          callback: (state) => ({
            ...state,
            [obj]: {
              ...state[obj],
              activeCategories: [...state[obj].activeCategories, categoryId],
            },
          }),
        })
      },

      // Eliminar categoría de filtros
      deleteCategoryId: function (categoryId) {
        return dispatch({
          type: config[obj].products.types.saveExtraFilters,
          callback: (state) => ({
            ...state,
            [obj]: {
              ...state[obj],
              activeCategories: state[obj].activeCategories?.filter((activeCategory) => activeCategory !== categoryId),
            },
          }),
        })
      },

      // Buscar productos por categorías
      searchProductsByCategories: function (extraData) {
        return dispatch(
          searchProductsByCategories({
            ...extraData,
            ...config[obj].products,
          }),
        )
      },

      // Ordenar productos por ...
      sortProductsBy: (key) => dispatch(sortProductsBy(key, config[obj].products)),
    }),
  })
}
