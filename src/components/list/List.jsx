import React from 'react'
import PropTypes from 'prop-types'
import styles from './List.css'
import Cover from '../cover/Cover'

class List extends React.Component {
  constructor (props) {
    super(props)
    this.onClickCover = this.onClickCover.bind(this)
    this.onClickIconCart = this.onClickIconCart.bind(this)
    this.onClickRating = this.onClickRating.bind(this)
  }  
  onClickCover (info) {
    this.props.handleClickCover && this.props.handleClickCover(info)
  }
  onClickIconCart (info) {
    this.props.handleClickIconCart && this.props.handleClickIconCart(info)
  }  
  onClickRating (info) {
    this.props.handleClickRating && this.props.handleClickRating(info)
  }  
  render () {
    let listCover = this.props.data.map((item, index) => {
      return <Cover 
        key={index} 
        data={item} 
        handleClick={this.onClickCover} 
        handleClickIconCart={this.onClickIconCart} 
        handleClickRating={this.onClickRating}/>
      }) 
    return (
      <section className={styles.list}>
        {listCover}
      </section>     
    )
  }
}

List.propTypes = {
  data: PropTypes.array,
  handleClick: PropTypes.func,
  handleClickRating: PropTypes.func,
  handleClickIconCart: PropTypes.func
}

export default List