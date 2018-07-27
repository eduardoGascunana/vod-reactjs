import React from 'react'
import PropTypes from 'prop-types'
import styles from './Menu.css'
import MenuItem from '../menuItem/MenuItem'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      indexSelected: this.props.indexSelected
    }
    this.onClickItem = this.onClickItem.bind(this)
  }
  onClickItem (index) {
    console.log("Menu - onClickItem: ",index)

    if (this.props.handleClickMenuItem) {
      this.props.handleClickMenuItem(index)
    }
    this.setState({
      indexSelected: index
    })
  }
  render () {
    console.log("Menu - render ",this.state.indexSelected)

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
  indexSelected: PropTypes.number
}

export default Menu