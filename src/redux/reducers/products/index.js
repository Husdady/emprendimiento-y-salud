// Types
import * as types from '@redux/types'

// Utils
import { createState, updateArrayItem, removeArrayItem } from '@utils/Helper'

export const initialState = createState({
  objects: ['seytu', 'omnilife'],
  state: () => ({
    activeTab: 'tab-o12j9a',
    orders: [],
    categories: [],
    products: [],
    favoriteProducts: [],
    totalOrders: 0,
    totalProducts: 0,
    totalCategories: 0,
    loadingOrders: null,
    loadingProducts: true,
    loadingCategories: null,
  }),
})

const manageProducts = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_SEYTU_ACTIVE_TAB:
      return { ...state, seytu: { ...state.seytu, activeTab: action.tab } }

    // Cambiar la actual tab en los productos Omnilife
    case types.CHANGE_OMNILIFE_ACTIVE_TAB:
      return { ...state, omnilife: { ...state.omnilife, activeTab: action.tab } }

    // Mostrar cargando en la tabla de productos Seytu
    case types.SHOW_LOADING_SEYTU_PRODUCTS:
      return { ...state, seytu: { ...state.seytu, loadingProducts: true } }

    // Ocultar cargando en la tabla de productos Seytu
    case types.HIDE_LOADING_SEYTU_PRODUCTS:
      return { ...state, seytu: { ...state.seytu, loadingProducts: false } }

    // Mostrar cargando historial de pedidos - Seytú
    case types.SHOW_LOADING_SEYTU_ORDERS:
      return { ...state, seytu: { ...state.seytu, loadingOrders: true } }

    // Ocultar cargando en la tabla de productos Seytu
    case types.HIDE_LOADING_SEYTU_ORDERS:
      return { ...state, seytu: { ...state.seytu, loadingOrders: false } }

    // Mostrar cargando en categorías - Seytu
    case types.SHOW_LOADING_SEYTU_CATEGORIES:
      return { ...state, seytu: { ...state.seytu, loadingCategories: true } }

    // Ocultar cargando en categorías - Seytu
    case types.HIDE_LOADING_SEYTU_CATEGORIES:
      return { ...state, seytu: { ...state.seytu, loadingCategories: false } }

    // Mostrar cargando en la tabla de productos Omnilife
    case types.SHOW_LOADING_OMNILIFE_PRODUCTS:
      return {
        ...state,
        omnilife: { ...state.omnilife, loadingProducts: true },
      }

    // Ocultar cargando en la tabla de productos Omnilife
    case types.HIDE_LOADING_OMNILIFE_PRODUCTS:
      return {
        ...state,
        omnilife: { ...state.omnilife, loadingProducts: false },
      }

    // Mostrar cargando historial de pedidos - Omnilife
    case types.SHOW_LOADING_OMNILIFE_ORDERS:
      return { ...state, omnilife: { ...state.omnilife, loadingOrders: true } }

    // Ocultar cargando historial de pedidos - Omnilife
    case types.HIDE_LOADING_OMNILIFE_ORDERS:
      return {
        ...state,
        omnilife: { ...state.omnilife, loadingOrders: false },
      }

    // Mostrar cargando en categorías - Omnilife
    case types.SHOW_LOADING_OMNILIFE_CATEGORIES:
      return {
        ...state,
        omnilife: { ...state.omnilife, loadingCategories: true },
      }

    // Ocultar cargando en categorías - Omnilife
    case types.HIDE_LOADING_OMNILIFE_CATEGORIES:
      return {
        ...state,
        omnilife: { ...state.omnilife, loadingCategories: false },
      }

    // Agregar producto a tabla de pedidos Seytú
    case types.ADD_SEYTU_ORDER:
      const newSeytuState = {
        ...state,
        seytu: {
          ...state.seytu,
          totalOrders: state.seytu.totalOrders + 1,
        },
      }

      // Si solamente se debe incrementar el total de pedidos
      if (action.incrementTotalOrders) {
        return newSeytuState
      }

      Object.assign(newSeytuState.seytu, {
        orders: [...state.seytu.orders, action.newOrder],
      })

      return newSeytuState

    // Añadir productos Seytú
    case types.ADD_SEYTU_PRODUCTS:
      return {
        ...state,
        seytu: {
          ...state.seytu,
          products: [...state.seytu.products, ...action.newProducts],
          totalProducts: state.seytu.totalProducts + action.newProducts.length,
        },
      }

    // Añadir un producto Seytú a favoritos
    case types.ADD_FAVORITE_SEYTU_PRODUCT:
      return {
        ...state,
        seytu: {
          ...state.seytu,
          favoriteProducts: [...state.seytu.favoriteProducts, action.favoriteProduct],
        },
      }

    // Actualizar estado de un pedido de un producto Seytú
    case types.CHANGE_SEYTU_ORDER_STATUS:
      return {
        ...state,
        seytu: {
          ...state.seytu,
          orders: updateArrayItem(state.seytu.orders, {
            filter: { _id: action.orderId },
            newData: (currentOrder) => ({ ...currentOrder, status: action.status }),
          }),
        },
      }

    // Eliminar un pedido de un producto Seytú
    case types.DELETE_SEYTU_ORDER:
      return {
        ...state,
        seytu: {
          ...state.seytu,
          orders: removeArrayItem(state.seytu.orders, {
            _id: action.orderId,
          }),
        },
      }

    // Eliminar un producto Seytú de favoritos
    case types.DELETE_FAVORITE_SEYTU_PRODUCT:
      return {
        ...state,
        seytu: {
          ...state.seytu,
          favoriteProducts: removeArrayItem(state.seytu.favoriteProducts, {
            _id: action.productId,
          }),
        },
      }

    // Setear productos Seytú
    case types.SET_SEYTU_PRODUCTS:
      return {
        ...state,
        seytu: {
          ...state.seytu,
          products: action.seytuProducts,
          totalProducts: action.seytuProducts.length,
        },
      }

    // Setear pedidos de productos Seytú
    case types.SET_SEYTU_ORDERS:
      return {
        ...state,
        seytu: {
          ...state.seytu,
          orders: action.seytuOrders,
          totalOrders: action.totalOrders,
        },
      }

    // Setear categorías de productos Seytú
    case types.SET_SEYTU_CATEGORIES:
      return {
        ...state,
        seytu: {
          ...state.seytu,
          categories: action.seytuCategories,
          totalCategories: action.seytuCategories.length + 1,
        },
      }

    // Agregar producto a tabla de pedidos Omnilife
    case types.ADD_OMNILIFE_ORDER:
      const newOmnilifeState = {
        ...state,
        omnilife: {
          ...state.omnilife,
          totalOrders: state.omnilife.totalOrders + 1,
        },
      }

      // Si solamente se debe incrementar el total de pedidos
      if (action.incrementTotalOrders) {
        return newOmnilifeState
      }

      Object.assign(newOmnilifeState.omnilife, {
        orders: [...state.omnilife.orders, action.newOrder],
      })

      return newOmnilifeState

    // Añadir productos Omnilife
    case types.ADD_OMNILIFE_PRODUCTS:
      return {
        ...state,
        omnilife: {
          ...state.omnilife,
          products: [...state.omnilife.products, ...action.newProducts],
          totalProducts: state.omnilife.totalProducts + action.newProducts.length,
        },
      }

    // Añadir un producto Omnilife a favoritos
    case types.ADD_FAVORITE_OMNILIFE_PRODUCT:
      return {
        ...state,
        omnilife: {
          ...state.omnilife,
          favoriteProducts: [...state.omnilife.favoriteProducts, action.favoriteProduct],
        },
      }

    // Actualizar estado de un pedido de un producto Omnilife
    case types.CHANGE_OMNILIFE_ORDER_STATUS:
      return {
        ...state,
        omnilife: {
          ...state.omnilife,
          orders: updateArrayItem(state.omnilife.orders, {
            filter: { _id: action.orderId },
            newData: (currentOrder) => ({ ...currentOrder, status: action.status }),
          }),
        },
      }

    // Eliminar un pedido de un producto Omnilife
    case types.DELETE_OMNILIFE_ORDER:
      return {
        ...state,
        omnilife: {
          ...state.omnilife,
          orders: removeArrayItem(state.omnilife.orders, {
            _id: action.orderId,
          }),
        },
      }

    // Eliminar un producto Seytú de favoritos
    case types.DELETE_FAVORITE_OMNILIFE_PRODUCT:
      return {
        ...state,
        omnilife: {
          ...state.omnilife,
          favoriteProducts: removeArrayItem(state.omnilife.favoriteProducts, {
            _id: action.productId,
          }),
        },
      }

    // Setear productos Omnilife
    case types.SET_OMNILIFE_PRODUCTS:
      return {
        ...state,
        omnilife: {
          ...state.omnilife,
          products: action.omnilifeProducts,
          totalProducts: action.omnilifeProducts.length,
        },
      }

    // Setear pedidos de productos omnilife
    case types.SET_OMNILIFE_ORDERS:
      return {
        ...state,
        omnilife: {
          ...state.omnilife,
          orders: action.omnilifeOrders,
          totalOrders: action.totalOrders,
        },
      }

    // Setear categorías de productos omnilife
    case types.SET_OMNILIFE_CATEGORIES:
      return {
        ...state,
        omnilife: {
          ...state.omnilife,
          categories: action.omnilifeCategories,
          totalCategories: action.omnilifeCategories.length + 1,
        },
      }

    default:
      return state
  }
}

// Obtener el estado del reducer y exportarlo
export default manageProducts
export const getProductsState = ({ manageProducts }) => ({ ...manageProducts })
