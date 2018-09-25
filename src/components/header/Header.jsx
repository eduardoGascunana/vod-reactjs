import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../icon/Icon'
import styles from './Header.css'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewSelected: ''
    }
    this.onClickMenu = this.onClickMenu.bind(this)
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.viewSelected !== prevState.viewSelected
      ? {
        viewSelected: nextProps.viewSelected
      }
      : null
  }  
  onClickMenu(ev) {
    if (this.props.handleClick) {
      this.props.handleClick(ev.currentTarget.dataset.headerItem, this.props.history)
    }
    ev.stopPropagation()
  }
  render() {
    let groupLinks = []
    // groupLinks.push(<div className='main-header-right-side'>)
    if (this.state.viewSelected === 'list') {
      groupLinks.push(
        <div key='cart' data-header-item='cart' className={styles.icon} onClick={this.onClickMenu}>
          <Icon type='cart' color='black'/>
          <div className='text-btn'>Cart &nbsp;</div>
        </div>
      )
      groupLinks.push(
        <div key='exit' data-header-item='exit' className={styles.icon} onClick={this.onClickMenu}>
          <Icon type='exit' color='black'/>
          <div className='text-btn'>Exit &nbsp;</div>
        </div>
      )
    } else if (this.state.viewSelected === 'detail') {
      groupLinks.push(<div key='cart' data-header-item='cart' className='text-btn'>Cart &nbsp;</div>)
      groupLinks.push(<div key='exit' data-header-item='exit' className='text-btn'>Exit &nbsp;</div>)
    } else if (this.state.viewSelected === 'cart') {
      groupLinks.push(<div key='exit' data-header-item='exit' className='text-btn'>Exit &nbsp;</div>)
    }
    // groupLinks.push(</div>)
    
    return (
      <div>
        <header className={styles.header}>
          Videoclub
        </header>
        <div className={styles.mainHeader}>
          {/* <div class='btn-back-web'>
            <iron-icon icon='arrow-back'></iron-icon>
            <div class='text-btn'>Back &nbsp;</div>
          </div> */}
          <div className={styles.mainHeaderLeftSide}>
            <iron-icon id="idIconMenu" icon="menu" class="btn-menu"></iron-icon>
            <iron-icon id="idIconBack" icon="arrow-back" class="btn-back"></iron-icon>

          </div>
          {/* <div class='btn-offline' style$='display: {{displayOffline}}'>
            <iron-icon icon='report-problem'></iron-icon>
            <div class='text-btn'>No Connection &nbsp;&nbsp;</div>
          </div> */}
          <div className={styles.mainHeaderRightSide}>
            {groupLinks}
          </div>
        </div>
      </div >
    )
  }
}

Header.propTypes = {
  viewSelected: PropTypes.string,
  handleClick: PropTypes.func
}

export default Header