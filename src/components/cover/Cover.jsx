import React from 'react'
import PropTypes from 'prop-types'
import Rating from '../rating/Rating'
import Icon from '../icon/Icon'
import styles from './Cover.css'
import classNames from 'classnames'
import constants from '../../common/constants.js'

class Cover extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOverDetail: false
    }
    this.onClickCover = this.onClickCover.bind(this)
    this.onMouseOverCover = this.onMouseOverCover.bind(this)
    this.onMouseLeaveCover = this.onMouseLeaveCover.bind(this)
    this.onClickRating = this.onClickRating.bind(this)
    this.onClickIconCart = this.onClickIconCart.bind(this)
  }
  onClickCover (ev) {
    this.props.handleClick && this.props.handleClick(this.props.data) 
    ev.stopPropagation()
  }
  onMouseOverCover () {
    this.setState({
      isOverDetail: true
    })
  }
  onMouseLeaveCover () {
    this.setState({
      isOverDetail: false
    })
  }
  onClickIconCart (ev) {
    if (this.props.handleClickIconCart) {
      const {data} = this.props
      this.props.handleClickIconCart({
        id: data.id,
        isAdd: !data.isAddCart,
        name: data.name,
        price: data.price,
        cover: data.cover
      })
    }
    ev.stopPropagation()     
  }
  onClickRating (rate) {
    this.props.handleClickRating && this.props.handleClickRating({
      id: this.props.data.id,
      rate: rate
    })
  }
  shouldComponentUpdate (nextProps, nextState) {
    return (nextProps.data.id !== this.props.data.id || 
      nextProps.data.isAddCart !== this.props.data.isAddCart || 
      nextProps.data.rate !== this.props.data.rate || 
      nextState.isOverDetail !== this.state.isOverDetail)
  }
  render () {
    const {data} = this.props
    const valueIcon = data.isAddCart ? constants.ICON.TYPE.ADD_TO_CART : constants.ICON.TYPE.REMOVE_TO_CART
    let imgPath
    try {
      imgPath = require(`../../common/images/${data.cover}`)
    } catch(err) {
      imgPath = require(`../../common/images/default.jpg`)
    }
    const classOverDetail = classNames(
      styles.coverDetail,
      {
        [styles.hidden]: !this.state.isOverDetail
      },
      {
        [styles.visible]: this.state.isOverDetail
      }
    )
    return (
      <div className={styles.cover} onClick={this.onClickCover} onMouseOver={this.onMouseOverCover} onMouseLeave={this.onMouseLeaveCover}>
        <img src={imgPath} className={styles.coverCursor} alt={data.name}/>
        <div className={classOverDetail}>
          <div className={styles.coverDetailTitle}>{data.name}</div>
          <div className={styles.coverDetailRating}>
            <Rating id={data.id} rate={data.rate} handleClick={this.onClickRating}/>
          </div>
          <div className={styles.coverDetailRow}>
            <span className={styles.coverDetailRowPrice}>{data.price} €</span>
            <div className={classNames(styles.coverDetailRowIcon,  styles.coverCursor)}>
              <Icon type={valueIcon} handleClick={this.onClickIconCart}/>
            </div>
          </div>
        </div>
        <div className={styles.coverDetailBottom}>
          <div className={styles.coverDetailTitle}>{data.name}</div>
          <span className={styles.coverDetailRowPrice}>{data.price}€</span>
        </div>
      </div>
    )
  }
}

Cover.propTypes = {
  data: PropTypes.object,
  handleClick: PropTypes.func,
  handleClickIconCart: PropTypes.func,
  handleClickRating: PropTypes.func
}

export default Cover