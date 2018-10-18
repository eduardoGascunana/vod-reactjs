const constants = {
  ROUTE: {
    HOME: '(/home|/)',
    LIST: '/list/:category',
    DETAIL: '/detail/:category/:id',
    CART: '/cart'
  },
  VIEW: {
    DETAIL: 'detail',
    CART: 'cart',
    LIST: 'list',
    HOME: 'home'
  },
  ICON: {
    COLOR: {
      BLACK: 'black'
    },
    TYPE: {
      BACK: 'back',
      CART: 'cart',
      EXIT: 'exit',
      DELETE: 'delete',
      MENU: 'menu',
      ADD_TO_CART: 'addToCart',
      REMOVE_TO_CART: 'removeToCart'
    }    
  },
  DATA: {
    FOLDER: '/data/',
    EXTENSION: '.json'
  },
  CATEGORY_INIT: 'Home',
  CATEGORY_INIT_LIST: 'Adventure'
}

export default constants