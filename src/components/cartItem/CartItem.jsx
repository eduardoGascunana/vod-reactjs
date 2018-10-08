import React from 'react'
import PropTypes from 'prop-types'
import styles from './CartItem.css'
import Icon from '../icon/Icon'

class CartItem extends React.Component {
  constructor (props) {
    super (props)
    this.onClickIconDelete = this.onClickIconDelete.bind(this)
  }  
  onClickIconDelete (ev) {
    if (this.props.handleClickDelete) {
      this.props.handleClickDelete({
        id: this.props.data.id,
        isAdd: !this.props.data.isAddCart
      })
    }
    ev.stopPropagation()     
  }
  render () {
    const { data } = this.props
    let imgPath
    try {
      imgPath = require(`../../common/images/${data.cover}`)
    } catch (err) {
      imgPath = require(`../../common/images/default.jpg`)
    }    
    return (
      <div className={styles.cartItem}>
        <div className={styles.cartItemCover}>
          <img src={imgPath} alt={data.name} />                            
        </div>
        <div className={styles.cartItemInfo}>
          <div className={styles.cartItemTitle}>
            {data.name}
          </div>
          <div className={styles.cartItemInfoWraperEnd}>
            <div className={styles.cartItemPrice}>
              {data.price}€
              </div>
            <div className={styles.cartItemDelete}>
              <Icon type='delete' color='black' handleClick={this.onClickIconDelete} />
            </div>
          </div>
        </div>        
      </div>
    )
  }
}

CartItem.propTypes = {
  data: PropTypes.object,
  handleClickDelete: PropTypes.func
}

export default CartItem