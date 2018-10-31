import React from 'react'
import PropTypes from 'prop-types'
import Rating from '../../components/rating/Rating'
import IconLoading from '../../components/iconLoading/IconLoading'
import styles from './ViewDetail.css'
import locale from '../../common/locale.js'

class ViewDetail extends React.Component {
  constructor (props) {
    super(props)
    this.onClickIconCart = this.onClickIconCart.bind(this)
    this.onClickRating = this.onClickRating.bind(this)
  }
  onClickIconCart () {
    const { data } = this.props
    this.props.handleClickIconCart && this.props.handleClickIconCart({
      id: data.id,
      isAdd: !data.isAddCart,
      name: data.name,
      price: data.price,
      cover: data.cover
    })
  }
  onClickRating (rate) {
    this.props.handleClickRating && this.props.handleClickRating({
      id: this.props.data.id,
      rate: rate
    })
  }
  render () {
    let content
    if (this.props.loading) {
      content = <IconLoading></IconLoading>
    } else {
      const { data } = this.props
      const textBtnCart = data.isAddCart ? locale.CART.REMOVE : locale.CART.ADD
      let imgPath
      try {
        imgPath = require(`../../common/images/${data.cover}`)
      } catch (err) {
        imgPath = require(`../../common/images/default.jpg`)
      }
      content =
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
              <div className={styles.col1}>{locale.VIEW_DETAIL.YEAR}</div>
              <div className={styles.col2}>{data.year}</div>
            </div>
            <div className={styles.rowDetail}>
              <div className={styles.col1}>{locale.VIEW_DETAIL.GENRE}</div>
              <div className={styles.col2}>{data.nameCategory}</div>
            </div>
            <div className={styles.rowDetail}>
              <div className={styles.col1}>{locale.VIEW_DETAIL.PRICE}</div>
              <div className={styles.col2}>{data.price}</div>
            </div>
            <div className={styles.rowDetail}>
              <div className={styles.col1}>{locale.VIEW_DETAIL.RATE}</div>
              <Rating rate={data.rate} handleClick={this.onClickRating}></Rating>
            </div>
          </div>
          <div className={styles.synopsis}>
            <div>{locale.VIEW_DETAIL.DESCRIPTION}</div>
            <div>{data.synopsis}</div>
          </div>
        </div>
    }
    return (
      <div>
        {content}
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