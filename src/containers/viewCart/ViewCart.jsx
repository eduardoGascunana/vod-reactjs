import React from 'react'
import PropTypes from 'prop-types'
import styles from './ViewCart.css'
import CartItem from '../../components/cartItem/CartItem'

class ViewCart extends React.Component {
  constructor (props) {
    console.log("ViewCart")
    super (props)
    /* this.state = {
      // total: this.props.data.reduce((total, item) => {
      //   return total + Number(item.price)
      // }, 0)
      total: 0
    } */
    this.onClickDelete = this.onClickDelete.bind(this)
  }
  onClickDelete (info) {
    this.props.handleClickIconDelete(info)
  }
  render () {
    console.log("ViewCart - render ",this.props.data)
    let listCart = this.props.data.map((item, index) => {
      return <CartItem
        key={index}
        data={item}
        handleClickDelete={this.onClickDelete} />
    })
    const total = this.props.data.reduce((total, item) => {
      return total + Number(item.price)
    }, 0)
    return (
      <section className={styles.cart}>
        <div className={styles.cartHeader}>
          Your Cart
        </div>
        <div className={styles.numElements}>
          {this.props.data.length} elements
        </div>
        <br></br>
        <div className={styles.cartList}>
          <div className={styles.cartListItems}>
            {listCart}
          </div>
          <div className={styles.cartListSummary}>
            <div className={styles.cartListSummaryTotal}>
              Total: {total}€
            </div>
            {/* <button type="button" class="cart-btn-buy" on-tap="_onTapBtnBuy">
              Buy
            </button>
            <button type="button" class="cart-btn-empty" on-tap="_onTapBtnEmpty">
              Empty
            </button> */}
          </div>
        </div>           
      </section>
    )
  }
}

ViewCart.propTypes = {
  data: PropTypes.array,
  handleClickIconDelete: PropTypes.func
}

export default ViewCart