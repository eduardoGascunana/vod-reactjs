import React from 'react'
import PropTypes from 'prop-types'
import styles from './SideMenu.css'
import MenuItem from '../menuItem/MenuItem'

class SideMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      indexSelected: 0
    }
    this.onClickItem = this.onClickItem.bind(this)
    this.onClickOutSideMenu = this.onClickOutSideMenu.bind(this)
  }
  static getDerivedStateFromProps (nextProps, prevState) {
    return nextProps.indexSelected !== prevState.indexSelected
      ? {
        indexSelected: nextProps.categories.findIndex(item => item.name.toLowerCase() === nextProps.categorySelected.toLowerCase())
      }
      : null
  }
  onClickItem (index) {
    this.props.handleClickMenuItem && this.props.handleClickMenuItem(index)
    this.props.handleSideMenu && this.props.handleSideMenu(false)
    this.setState({
      indexSelected: index
    })
  }
  onClickOutSideMenu () {
    this.props.handleSideMenu && this.props.handleSideMenu(false)
  }
  render () {
    const listItems = this.props.categories.map((item, index) => {
      return (
        <li
          key={index}
          className={styles.li}>
          <MenuItem
            index={index}
            title={item.name}
            isSelected={index === this.state.indexSelected}
            handleClick={this.onClickItem}
          />
        </li>
      )
    })
    return (
      <div className={styles.container}>
        <div className={styles.sideMenu}>
          <aside>
            <nav className={styles.nav}>
              <ul className={styles.ul}>
                {listItems}
              </ul>
            </nav>
          </aside>
        </div>
        <div className={styles.outSideMenu} onClick={this.onClickOutSideMenu}></div>
      </div>
    )
  }
}

SideMenu.propTypes = {
  categories: PropTypes.array,
  categorySelected: PropTypes.string,
  indexSelected: PropTypes.number,
  handleSideMenu: PropTypes.func
}

export default SideMenu