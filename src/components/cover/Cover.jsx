import React from 'react'
import PropTypes from 'prop-types'
import Rating from '../rating/Rating'
import IconCart from '../iconCart/IconCart'
import styles from './Cover.css'
import classNames from 'classnames'

class Cover extends React.Component {
  constructor(props) {
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
  /* componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps: ",nextProps);
  } */
  onClickCover(ev) {
    console.log("Cover - onClickCover")

    if (this.props.handleClick) {
      this.props.handleClick(this.props.data)
      
      /* const url = this.props.id ? 'detail/' + this.props.nameCategory : null
      window.history.pushState({}, null, url) */
    }    
    ev.stopPropagation()
  }
  onMouseOverCover(ev) {
    // console.log("Cover - onMouseOverCover")

    this.setState({
      isOverDetail: true
    })
  }
  onMouseLeaveCover(ev) {
    // console.log("Cover - onMouseLeaveCover")

    this.setState({
      isOverDetail: false
    })
  }
  onClickIconCart(isAdd) {
    console.log("Cover - onClickIconCart - isAdd: ", isAdd)

    if (this.props.handleClickIconCart) {
      this.props.handleClickIconCart({
        id: this.props.data.id,
        isAdd: isAdd
      })
    }  
  }
  onClickRating(rate) {
    console.log("Cover - onClickRating - rate: ",rate)

    // props are read-only !!!
    // this.props.rate = rate

    if (this.props.handleClickRating) {
      this.props.handleClickRating({
        id: this.props.data.id,
        rate: rate
      })
    }
  }
  render() {
    // console.log("Core - render")

    const {data} = this.props
    let imgPath
    try {
      imgPath = require(`../../images/${data.cover}`)
    } catch(err) {
      imgPath = require(`../../images/default.jpg`)
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
            <Rating rate={data.rate} handleClick={this.onClickRating}/>
          </div>
          <div className={styles.coverDetailRow}>
            <span className={styles.coverDetailRowPrice}>{data.price} €</span>
            <div className={classNames(styles.coverDetailRowIcon,  styles.coverCursor)}>
              <IconCart isAdd={data.isAddCart} handleClick={this.onClickIconCart}/>
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
  rate: PropTypes.number,
  handleClick: PropTypes.func,
  handleClickIconCart: PropTypes.func,
  handleClickRating: PropTypes.func
}

export default Cover