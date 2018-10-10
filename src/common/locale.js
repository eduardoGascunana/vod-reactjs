import utils from './utils'

const { locale: localeUtils } = utils
const locale = {
  TITLE: 'Videoclub',
  OPTIONS: {
    BACK: 'Back',
    CART: 'Cart',
    EXIT: 'Exit'
  },
  MODAL_EXIT: {
    HEADER: 'Exit',
    BODY: 'Are you sure you want to exit the application?'
  },
  CART: {
    ADD: 'Add from Cart',
    REMOVE: 'Remove from Cart'
  },
  VIEW_DETAIL: {
    YEAR: 'Year',
    GENRE: 'Genre',
    PRICE: 'Price',
    RATE: 'Rate',
    DESCRIPTION: 'Description'
  },
  VIEW_HOME: {
    RECOMMENDED: 'Recommended',
    LAST_ADDITIONS: 'Last additions'
  },
  VIEW_CART: {
    HEADER: 'Your cart',
    HEADER_EMPTY: ' is empty',
    MODAL_EMPTY: {
      HEADER: 'Deletion process',
      BODY: 'Are you sure you want to empty the cart?'
    },
    MODAL_BUY: {
      HEADER: 'Purchasing process',
      BODY: `Congratulations! you have your ${localeUtils.symbol} movies available to watch when you want`
    },
    TOTAL: `Total ${localeUtils.symbol}€`,
  },
  YES: 'Yes',
  NOT: 'Not',
  ACCEPT: 'Accept',
  BUY: 'Buy',
  EMPTY: 'Empty', 
  ACCESS: 'Access' 
}

export default locale