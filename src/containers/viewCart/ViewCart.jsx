import React from 'react'
import PropTypes from 'prop-types'
import styles from './ViewCart.css'
import CartItem from '../../components/cartItem/CartItem'
import Modal from '../../components/modal/Modal'
import utils  from '../../common/utils'

const { locale: localeUtils } = utils
const locale = {
  header: 'Your cart',
  headerEmpty: ' is empty',
  modalEmpty: {
    header: 'Deletion process',
    body: 'Are you sure you want to empty the cart?'
  },
  modalBuy: {
    header: 'Purchasing process',
    body: `Congratulations! you have your ${localeUtils.symbol} movies available to watch when you want`
  },
  yes: 'Yes',
  not: 'Not',
  accept: 'Accept',
  buy: 'Buy',
  empty: 'Empty',
  total: `Total ${localeUtils.symbol}€`
}

class ViewCart extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      showModalBuy: false,
      showModalEmpty: false
    }
    this.onClickDelete = this.onClickDelete.bind(this)
    this.onClickBuy = this.onClickBuy.bind(this)
    this.onClickEmpty = this.onClickEmpty.bind(this)
    this.onClickBuyCartModal = this.onClickBuyCartModal.bind(this)
    this.onClickEmptyCartModal = this.onClickEmptyCartModal.bind(this)
  }
  onClickDelete (info) {
    this.props.handleClickIconDelete(info)
  } 
  onClickEmptyCartModal (ev) {
    if (Number(ev.target.id) === 0) {
      this.props.handleClickEmptyCart()
    } else {
      this.setState({
        showModalEmpty: false
      }) 
    }
  }
  onClickBuyCartModal () {
    this.setState({
      showModalBuy: false
    })    
    this.props.handleClickEmptyCart()
  }
  onClickBuy () {
    this.setState({
      showModalBuy: true
    })
  }
  onClickEmpty () {
    this.setState({
      showModalEmpty: true
    })    
  }
  getTotalAmount () {
    return this.props.data.reduce((total, item) => {
      return total + Number(item.price)
    }, 0)    
  }
  render () {
    let body = null
    let txtHeader = locale.header
    if (this.props.data.length === 0) {
      txtHeader += locale.headerEmpty
    } else {
      let listCart = this.props.data.map((item, index) => {
        return <CartItem
          key={index}
          data={item}
          handleClickDelete={this.onClickDelete} />
      })
      let modal = null
      if (this.state.showModalEmpty) {
        modal = <Modal 
          header={locale.modalEmpty.header}
          body={locale.modalEmpty.body}
          options={[locale.yes, locale.not]}
          handle={this.onClickEmptyCartModal}
        />
      } else if (this.state.showModalBuy) {
        modal = <Modal 
          header={locale.modalBuy.header}
          body={localeUtils.format(locale.modalBuy.body, [this.props.data.length])}
          options={[locale.accept]}
          handle={this.onClickBuyCartModal}
        />   
      }   
      body = 
        <div>
          <div className={styles.cartNumElements}>
            {this.props.data.length} elements
          </div>
          <br></br>
          <div className={styles.cartList}>
            <div className={styles.cartListItems}>
              {listCart}
            </div>
            <div className={styles.cartListSummary}>
              <div className={styles.cartListSummaryTotal}>
                {localeUtils.format(locale.total, [this.getTotalAmount()])}
              </div>
              <button className={styles.cartBtnBuy} onClick={this.onClickBuy}>
                {locale.buy}
              </button>
              <button className={styles.cartBtnEmpty} onClick={this.onClickEmpty}>
              {locale.empty}
              </button>
            </div>
          </div>
          {modal}
        </div>
    }
    return (
      <section className={styles.cart}>
        <div className={styles.cartHeader}>
          {txtHeader}
        </div>      
        {body}
      </section>
    )
  }
}

ViewCart.propTypes = {
  data: PropTypes.array,
  handleClickIconDelete: PropTypes.func,
  handleClickEmptyCart: PropTypes.func
}

export default ViewCart