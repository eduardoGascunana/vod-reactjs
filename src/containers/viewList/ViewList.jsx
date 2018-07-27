import React from 'react'
import PropTypes from 'prop-types'
import styles from './ViewList.css'
import List from '../../components/list/List'
import Menu from '../../components/menu/Menu'

class ViewList extends React.Component {
  constructor(props) {
    super(props)
    this.onClickMenuItem = this.onClickMenuItem.bind(this)
    this.onClickCover = this.onClickCover.bind(this)
    this.onClickIconCart = this.onClickIconCart.bind(this)
    this.onClickRating = this.onClickRating.bind(this)
  }
  onClickMenuItem(index) {
    this.props.handleClickMenuItem(index, this.props.history)
  }   
  onClickCover(info) {
    this.props.handleClickCover(info, this.props.history)
  }
  onClickIconCart(info) {
    this.props.handleClickIconCart(info)
  }  
  onClickRating(info) {
    this.props.handleClickRating(info)
  }    
  render () {
    return (
      <div 
        className={styles.container}>
        <Menu 
          className={styles.menu}
          categories={this.props.categories} 
          handleClickMenuItem={this.onClickMenuItem} />
        <List
          className={styles.list}
          data={this.props.movies}
          handleClickCover={this.onClickCover}
          handleClickIconCart={this.onClickIconCart}
          handleClickRating={this.onClickRating} />
      </div>
    )
  }
}

ViewList.propTypes = {
  movies: PropTypes.array,
  categories: PropTypes.array,
  handleClickMenuItem: PropTypes.func,
  handleClickCover: PropTypes.func,
  handleClickIconCart: PropTypes.func,
  handleClickRating: PropTypes.func
}

export default ViewList