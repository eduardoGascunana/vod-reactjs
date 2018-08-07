import React from 'react'
import PropTypes from 'prop-types'
import Rating from '../../components/rating/Rating'
import styles from './ViewDetail.css'

class ViewDetail extends React.Component {
  constructor(props) {
  super(props)
    this.onClickIconCart = this.onClickIconCart.bind(this)
    this.onClickRating = this.onClickRating.bind(this)
  }
  onClickIconCart() {    
    if (this.props.handleClickIconCart) {
      this.props.handleClickIconCart({
        id: this.props.data.id,
        isAdd: !this.props.data.isAddCart
      })
    }
  }
  onClickRating(rate) {
    if (this.props.handleClickRating) {
      this.props.handleClickRating({
        id: this.props.data.id,
        rate: rate
      })
    }
  }
  render() {
    const {data} = this.props
    let imgPath
    try {
      imgPath = require(`../../common/images/${data.cover}`)
    } catch (err) {
      imgPath = require(`../../common/images/default.jpg`)
    }
    const textBtnCart = data.isAddCart ? 'Remove from Cart' : 'Add to cart'
    return (
      <div className={styles.container}>
        <div className={styles.containerImg}>
          <img src={imgPath} className={styles.img} alt={data.name} />
        </div>
        <div className={styles.btn}>
          <button type="button" className={styles.btnCart} onClick={this.onClickIconCart}>
            {textBtnCart}
          </button>
        </div>
        <div className={styles.detail}>
          <div className={styles.rowDetail}>
            <h1>{data.name}</h1>
          </div>
          <div className={styles.rowDetail}>
            <div className={styles.col1}>Year</div>
            <div className={styles.col2}>{data.year}</div>
          </div>
          <div className={styles.rowDetail}>
            <div className={styles.col1}>Genre</div>
            <div className={styles.col2}>{data.nameCategory}</div>
          </div>
          <div className={styles.rowDetail}>
            <div className={styles.col1}>Price</div>
            <div className={styles.col2}>{data.price}</div>
          </div>
          <div className={styles.rowDetail}>
            <div className={styles.col1}>Rate</div>
            <Rating rate={data.rate} handleClick={this.onClickRating}></Rating>
          </div>
        </div>
        <div className={styles.synopsis}>
          <div>Description</div>
          <div>{data.synopsis}</div>
        </div>
      </div>
    )
  }
}

ViewDetail.propTypes = {
  data: PropTypes.object,
  handleClickIconCart: PropTypes.func,
  handleClickRating: PropTypes.func
}

export default ViewDetail