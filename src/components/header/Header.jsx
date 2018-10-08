import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../icon/Icon'
import styles from './Header.css'
import Modal from '../../components/modal/Modal'
// import utils from '../../common/utils'

// const { locale: localeUtils } = utils
const locale = {
  title: 'Videoclub',
  options: {
    back: 'Back',
    cart: 'Cart',
    exit: 'Exit'
  }, 
  modalExit: {
    header: 'Exit',
    body: 'Are you sure you want to exit the application?'
  },
  yes: 'Yes',
  not: 'Not'
}
class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      viewSelected: '',
      showModalExit: false
    }
    this.onClickMenu = this.onClickMenu.bind(this)
    this.onClickExit = this.onClickExit.bind(this)
    this.onClickBack = this.onClickBack.bind(this)
    this.onClickExitModal = this.onClickExitModal.bind(this)
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.viewSelected !== prevState.viewSelected
      ? {
        viewSelected: nextProps.viewSelected
      }
      : null
  }  
  onClickMenu (ev) {
    if (this.props.handleClick) {
      this.props.handleClick(ev.currentTarget.dataset.headerItem, this.props.history)
    }
    ev.stopPropagation()
  }
  onClickExit (ev) {
    this.setState({
      showModalExit: true
    })
    ev.stopPropagation()
  }
  onClickExitModal (ev) {
    if (Number(ev.target.id) === 0) {
      if (this.props.handleClick) {
        this.props.handleClick('home', this.props.history)
      }
    }
    this.setState({
      showModalExit: false
    })
    ev.stopPropagation()
  }
  onClickBack () {
    this.props.history.goBack()
  }
  render () {
    let modalExit = null
    if (this.state.showModalExit) {
      modalExit = <Modal
        header={locale.modalExit.header}
        body={locale.modalExit.body}
        options={[locale.yes, locale.not]}
        handle={this.onClickExitModal}
      />
    }    
    let groupLinksRightSide = []
    let groupLinksLeftSide = []
    const { options } = locale
    if (['cart', 'detail'].includes(this.state.viewSelected)) {
      groupLinksLeftSide.push(
        <div key='back' data-header-item='back' className={styles.icon} onClick={this.onClickBack}>
          <Icon type='back' color='black' />
          <div className='text-btn'>{options.back} &nbsp;</div>
        </div>          
      )
    }
    if (['list', 'detail'].includes(this.state.viewSelected)) {
      groupLinksRightSide.push(
        <div key='cart' data-header-item='cart' className={styles.icon} onClick={this.onClickMenu}>
          <Icon type='cart' color='black'/>
          <div className='text-btn'>{options.cart} &nbsp;</div>
        </div>
      )
      groupLinksRightSide.push(
        <div key='exit' data-header-item='home' className={styles.icon} onClick={this.onClickExit}>
          <Icon type='exit' color='black'/>
          <div className='text-btn'>{options.exit} &nbsp;</div>
        </div>
      )
    } else if (this.state.viewSelected === 'cart') {
      groupLinksRightSide.push(
        <div key='exit' data-header-item='home' className={styles.icon} onClick={this.onClickExit}>
          <Icon type='exit' color='black' />
          <div className='text-btn'>{options.exit} &nbsp;</div>
        </div>
      )    
    }
    return (
      <div>
        <header className={styles.header}>
          {locale.title}
        </header>
        <div className={styles.mainHeader}>
          <div className={styles.mainHeaderLeftSide}>
            {groupLinksLeftSide}
          </div>
          <div className={styles.mainHeaderRightSide}>
            {groupLinksRightSide}
          </div>
        </div>
        {modalExit}
      </div>
    )
  }
}

Header.propTypes = {
  viewSelected: PropTypes.string,
  handleClick: PropTypes.func
}

export default Header