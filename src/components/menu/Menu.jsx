import React from 'react'
import PropTypes from 'prop-types'
import styles from './Menu.css'
import MenuItem from '../menuItem/MenuItem'

class Menu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      indexSelected: 0
    }
    this.onClickItem = this.onClickItem.bind(this)
  }
  static getDerivedStateFromProps (nextProps, prevState) {
    return nextProps.indexSelected !== prevState.indexSelected
      ? {
        indexSelected: nextProps.categories.findIndex(item => item.name.toLowerCase() === nextProps.categorySelected.toLowerCase())
      }
      : null
  }  
  onClickItem (index) {
    if (this.props.handleClickMenuItem) {
      this.props.handleClickMenuItem(index)
    }
    this.setState({
      indexSelected: index
    })
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
      <aside>
        <nav className={styles.nav}>
          <ul className={styles.ul}>
            {listItems}
          </ul>
        </nav>
      </aside>
    )
  }
}

Menu.propTypes = {
  categories: PropTypes.array,
  categorySelected: PropTypes.string,
  indexSelected: PropTypes.number
}

export default Menu