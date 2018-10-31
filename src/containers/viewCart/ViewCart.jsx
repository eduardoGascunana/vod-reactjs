import React from 'react'
import PropTypes from 'prop-types'
import styles from './ViewCart.css'
import CartItem from '../../components/cartItem/CartItem'
import IconLoading from '../../components/iconLoading/IconLoading'
import Modal from '../../components/modal/Modal'
import utils  from '../../common/utils'
import locale from '../../common/locale.js'

const { locale: localeUtils } = utils

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
    this.props.handleClickIconDelete && this.props.handleClickIconDelete(info)
  } 
  onClickEmptyCartModal (ev) {
    Number(ev.target.id) === 0
      ? this.props.handleClickEmptyCart && this.props.handleClickEmptyCart()
      : this.setState({
          showModalEmpty: false
        }) 
  }
  onClickBuyCartModal () {
    this.setState({
      showModalBuy: false
    })    
    this.props.handleClickEmptyCart && this.props.handleClickEmptyCart()
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
    let content
    if (this.props.loading) {
      content = <IconLoading></IconLoading>
    } else {
      let body = null
      let txtHeader = locale.VIEW_CART.HEADER
      if (this.props.data.length === 0) {
        txtHeader += locale.VIEW_CART.HEADER_EMPTY
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
            header={locale.VIEW_CART.MODAL_EMPTY.HEADER}
            body={locale.VIEW_CART.MODAL_EMPTY.BODY}
            options={[locale.YES, locale.NOT]}
            handle={this.onClickEmptyCartModal}
          />
        } else if (this.state.showModalBuy) {
          modal = <Modal 
            header={locale.VIEW_CART.MODAL_BUY.HEADER}
            body={localeUtils.format(locale.VIEW_CART.MODAL_BUY.BODY, [this.props.data.length])}
            options={[locale.ACCEPT]}
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
                  {localeUtils.format(locale.VIEW_CART.TOTAL, [this.getTotalAmount()])}
                </div>
                <button className={styles.cartBtnBuy} onClick={this.onClickBuy}>
                  {locale.BUY}
                </button>
                <button className={styles.cartBtnEmpty} onClick={this.onClickEmpty}>
                {locale.EMPTY}
                </button>
              </div>
            </div>
            {modal}
          </div>
        content = 
          <div>
            <div className={styles.cartHeader}>
              {txtHeader}
            </div>
            {body}
          </div>        
      }
    }
    return (
      <section className={styles.cart}>
        {content}
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