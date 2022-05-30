// Favorite Products
import addFavoriteProduct from './products/addFavoriteProduct'
import deleteFavoriteProduct from './products/deleteFavoriteProduct'

// Products
import getMoreProducts from './products/getMoreProducts'
import getPaginatedProducts from './products/getPaginatedProducts'

// Products Orders
import createOrder from './orders/createOrder'
import cancelOrder from './orders/cancelOrder'
import deleteOrder from './orders/deleteOrder'
import confirmOrder from './orders/confirmOrder'
import getPaginatedOrders from './orders/getPaginatedOrders'

// Products Categories
import getCategories from './products/getCategories'

// Filters
import applyExtraFilters from './filters/applyExtraFilters'
import sortProductsBy from './filters/sortProductsBy'
import searchProducts from './filters/searchProducts'
import searchProductsByCategories from './filters/searchProductsByCategories'

export {
  // Favorite Products
  addFavoriteProduct,
  deleteFavoriteProduct,
  // Products
  getMoreProducts,
  getPaginatedProducts,
  // Products Orders
  createOrder,
  cancelOrder,
  deleteOrder,
  confirmOrder,
  getPaginatedOrders,
  // Products Categories
  getCategories,
  // Products Filters
  applyExtraFilters,
  searchProducts,
  searchProductsByCategories,
  sortProductsBy,
}
