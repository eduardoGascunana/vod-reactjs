import React from 'react'
import PropTypes from 'prop-types'
import styles from './ViewList.css'
import List from '../../components/list/List'
import Menu from '../../components/menu/Menu'
import SideMenu from '../../components/sideMenu/SideMenu'

class ViewList extends React.Component {
  constructor (props) {
    super(props)
    this.onClickMenuItem = this.onClickMenuItem.bind(this)
    this.onClickCover = this.onClickCover.bind(this)
    this.onClickIconCart = this.onClickIconCart.bind(this)
    this.onClickRating = this.onClickRating.bind(this)
    this.onSideMenu = this.onSideMenu.bind(this)
  }
  onClickMenuItem (index) {
    this.props.handleClickMenuItem && this.props.handleClickMenuItem(index, this.props.history)
  }   
  onClickCover (info) {
    this.props.handleClickCover && this.props.handleClickCover(info, this.props.history)
  }
  onClickIconCart (info) {
    this.props.handleClickIconCart && this.props.handleClickIconCart(info)
  }  
  onClickRating (info) {
    this.props.handleClickRating && this.props.handleClickRating(info)
  }    
  onSideMenu (show) {
    this.props.handleSideMenu && this.props.handleSideMenu(show)
  }
  render () {
    let sideMenu = null
    if (this.props.showSideMenu) {
      sideMenu = <SideMenu
        categories={this.props.categories}
        categorySelected={this.props.categorySelected}
        handleClickMenuItem={this.onClickMenuItem} 
        handleSideMenu={this.onSideMenu}/>
    }
    return (
      <div 
        className={styles.container}>
        {sideMenu}
        <div className={styles.menu}>
          <Menu 
            categories={this.props.categories} 
            categorySelected={this.props.categorySelected}
            handleClickMenuItem={this.onClickMenuItem} />
        </div>
        <div className={styles.list}>
          <List          
            loading={this.props.loading}  
            data={this.props.movies}
            handleClickCover={this.onClickCover}
            handleClickIconCart={this.onClickIconCart}
            handleClickRating={this.onClickRating} />
        </div>
      </div>
    )
  }
}

ViewList.propTypes = {
  movies: PropTypes.array,
  categories: PropTypes.array,
  categorySelected: PropTypes.string,
  handleClickMenuItem: PropTypes.func,
  handleClickCover: PropTypes.func,
  handleClickIconCart: PropTypes.func,
  handleClickRating: PropTypes.func,
  showSideMenu: PropTypes.bool,
  handleSideMenu: PropTypes.func
}

export default ViewList