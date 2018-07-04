import React from 'react'
import styles from './List.css'
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
    console.log("ViewList - onClickMenuItem: ",index)
    this.props.handleClickMenuItem(index, this.props.history)
  }   
  onClickCover(info) {
    console.log("ViewList - onClickCover")
    this.props.handleClickCover(info, this.props.history)
  }
  onClickIconCart(info) {
    console.log("ViewList - onClickIconCart - isAdd: ", info)
    this.props.handleClickIconCart(info)
  }  
  onClickRating(info) {
    console.log("ViewList - onClickRating - rate: ", info)
    this.props.handleClickRating(info)
  }    
  render () {
    console.log("ViewList - render: ", this.props)

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

export default ViewList