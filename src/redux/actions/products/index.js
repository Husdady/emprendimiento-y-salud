// Types
import * as types from '@redux/types'

// Thunks
import {
  // Orders
  createOrder,
  cancelOrder,
  deleteOrder,
  confirmOrder,
  getPaginatedOrders,

  // Products
  addFavoriteProduct,
  deleteFavoriteProduct,
  getPaginatedProducts,
  getMoreProducts,

  // Categories
  getCategories,
} from '@redux/thunks'

// Utils
import { createDispatch } from '@utils/Helper'

// Settings
export const config = {
  seytu: {
    orders: {
      company: 'seytu',
      graphqlQuery: 'seytu_client_orders',
      types: {
        setOrders: types.SET_SEYTU_ORDERS,
        addNewOrder: types.ADD_SEYTU_ORDER,
        deleteOrder: types.DELETE_SEYTU_ORDER,
        changeOrderStatus: types.CHANGE_SEYTU_ORDER_STATUS,
        showLoading: types.SHOW_LOADING_SEYTU_ORDERS,
        hideLoading: types.HIDE_LOADING_SEYTU_ORDERS,
      },
    },
    products: {
      company: 'seytu',
      graphqlQuery: 'seytu_products',
      types: {
        changeActiveTab: types.CHANGE_SEYTU_ACTIVE_TAB,
        addProducts: types.ADD_SEYTU_PRODUCTS,
        setProducts: types.SET_SEYTU_PRODUCTS,
        addFavoriteProduct: types.ADD_FAVORITE_SEYTU_PRODUCT,
        deleteFavoriteProduct: types.DELETE_FAVORITE_SEYTU_PRODUCT,
        showLoading: types.SHOW_LOADING_SEYTU_PRODUCTS,
        hideLoading: types.HIDE_LOADING_SEYTU_PRODUCTS,
      },
    },
    categories: {
      company: 'seytu',
      graphqlQuery: 'seytu_categories',
      types: {
        setCategories: types.SET_SEYTU_CATEGORIES,
        showLoading: types.SHOW_LOADING_SEYTU_CATEGORIES,
        hideLoading: types.HIDE_LOADING_SEYTU_CATEGORIES,
      },
    },
  },
  omnilife: {
    orders: {
      company: 'omnilife',
      graphqlQuery: 'omnilife_client_orders',
      types: {
        setOrders: types.SET_OMNILIFE_ORDERS,
        addNewOrder: types.ADD_OMNILIFE_ORDER,
        deleteOrder: types.DELETE_OMNILIFE_ORDER,
        changeOrderStatus: types.CHANGE_OMNILIFE_ORDER_STATUS,
        showLoading: types.SHOW_LOADING_OMNILIFE_ORDERS,
        hideLoading: types.HIDE_LOADING_OMNILIFE_ORDERS,
      },
    },
    products: {
      company: 'omnilife',
      graphqlQuery: 'omnilife_products',
      types: {
        changeActiveTab: types.CHANGE_OMNILIFE_ACTIVE_TAB,
        setProducts: types.SET_OMNILIFE_PRODUCTS,
        addProducts: types.ADD_OMNILIFE_PRODUCTS,
        addFavoriteProduct: types.ADD_FAVORITE_OMNILIFE_PRODUCT,
        deleteFavoriteProduct: types.DELETE_FAVORITE_OMNILIFE_PRODUCT,
        showLoading: types.SHOW_LOADING_OMNILIFE_PRODUCTS,
        hideLoading: types.HIDE_LOADING_OMNILIFE_PRODUCTS,
      },
    },
    categories: {
      company: 'omnilife',
      graphqlQuery: 'omnilife_categories',
      types: {
        setCategories: types.SET_OMNILIFE_CATEGORIES,
        showLoading: types.SHOW_LOADING_OMNILIFE_CATEGORIES,
        hideLoading: types.HIDE_LOADING_OMNILIFE_CATEGORIES,
      },
    },
  },
}

// Crear action que actualiza el estado del reducer
export default function (dispatch) {
  return createDispatch({
    objects: ['seytu', 'omnilife'],
    methods: (obj) => ({
      // Cambiar pestaña activa en la sección de productos
      changeActiveTab: function (key) {
        return dispatch({
          type: config[obj].products.types.changeActiveTab,
          tab: key,
        })
      },

      // Obtener pedidos realizados por el cliente
      getPaginatedOrders: function (extraData) {
        return dispatch(getPaginatedOrders({ ...extraData, ...config[obj].orders }))
      },

      // Crear un pedido de un producto
      createOrder: function (order, extraData) {
        return dispatch(createOrder({ order, ...extraData, ...config[obj].orders }))
      },

      // Cancelar un pedido de un producto
      cancelOrder: function (order, extraData) {
        return dispatch(cancelOrder(order, { ...extraData, ...config[obj].orders }))
      },

      // Eliminar un pedido de un producto
      deleteOrder: function (order, extraData) {
        return dispatch(deleteOrder(order, { ...extraData, ...config[obj].orders }))
      },

      // Confirmar un pedido de un producto
      confirmOrder: function (order, extraData) {
        return dispatch(confirmOrder(order, { ...extraData, ...config[obj].orders }))
      },

      // Agregar un producto favorito
      addFavoriteProduct: function (product) {
        return dispatch(addFavoriteProduct({ product, ...config[obj].products }))
      },

      // Eliminar un producto favorito
      deleteFavoriteProduct: function (product) {
        return dispatch(deleteFavoriteProduct({ product, ...config[obj].products }))
      },

      // Obtener productos paginados
      getPaginatedProducts: function (extraData) {
        return dispatch(getPaginatedProducts({ ...extraData, ...config[obj].products }))
      },

      // Obtener productos paginados
      getMoreProducts: function (extraData) {
        return dispatch(getMoreProducts({ ...extraData, ...config[obj].products }))
      },

      // Obtener categorías de los productos
      getCategories: () => dispatch(getCategories(config[obj].categories)),
    }),
  })
}
