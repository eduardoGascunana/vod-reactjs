import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../icon/Icon'
import styles from './Header.css'
import classNames from 'classnames'
import Modal from '../../components/modal/Modal'
import locale from '../../common/locale.js'
import constants from '../../common/constants.js'

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
    this.onClickSideMenu = this.onClickSideMenu.bind(this)
    this.onClickExitModal = this.onClickExitModal.bind(this)
  }
  static getDerivedStateFromProps (nextProps, prevState) {
    return nextProps.viewSelected !== prevState.viewSelected
      ? {
        viewSelected: nextProps.viewSelected
      }
      : null
  }
  onClickSideMenu () {
    this.props.handleSideMenu && this.props.handleSideMenu(!this.props.showSideMenu)
  }
  onClickMenu (ev) {
    this.props.handleClick && this.props.handleClick(ev.currentTarget.dataset.headerItem, this.props.history)
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
      this.props.handleClick && this.props.handleClick(constants.VIEW.HOME, this.props.history)
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
        header={locale.MODAL_EXIT.HEADER}
        body={locale.MODAL_EXIT.BODY}
        options={[locale.YES, locale.NOT]}
        handle={this.onClickExitModal}
      />
    }    
    let groupLinksRightSide = []
    let groupLinksLeftSide = []
    if (this.state.viewSelected === constants.VIEW.LIST) {
      const classSideMenu = classNames(
        styles.icon,
        {
          [styles.sideIconMenuShow]: !this.props.showSideMenu
        },
        {
          [styles.sideIconMenuHide]: this.props.showSideMenu
        }
      )
      groupLinksLeftSide.push(
        <div key={constants.ICON.TYPE.MENU} data-header-item={constants.ICON.TYPE.MENU} className={classSideMenu} onClick={this.onClickSideMenu}>
          <Icon type={constants.ICON.TYPE.MENU} color={constants.ICON.COLOR.BLACK} />
        </div>       
      )
    }
    const { OPTIONS } = locale
    if ([constants.VIEW.CART, constants.VIEW.DETAIL].includes(this.state.viewSelected)) {
      groupLinksLeftSide.push(
        <div key={constants.ICON.TYPE.BACK} data-header-item={constants.ICON.TYPE.BACK} className={styles.icon} onClick={this.onClickBack}>
          <Icon type={constants.ICON.TYPE.BACK} color={constants.ICON.COLOR.BLACK} />
          <div className={styles.txtBtn}>{OPTIONS.BACK} &nbsp;</div>
        </div>          
      )
    }
    if ([constants.VIEW.LIST, constants.VIEW.DETAIL].includes(this.state.viewSelected)) {
      groupLinksRightSide.push(
        <div key={constants.ICON.TYPE.CART} data-header-item={constants.ICON.TYPE.CART} className={styles.icon} onClick={this.onClickMenu}>
          <Icon type={constants.ICON.TYPE.CART} color={constants.ICON.COLOR.BLACK} />
          <div className={styles.txtBtn}>{OPTIONS.CART} &nbsp;</div>
        </div>
      )
      groupLinksRightSide.push(
        <div key={constants.ICON.TYPE.EXIT} data-header-item={constants.VIEW.HOME} className={styles.icon} onClick={this.onClickExit}>
          <Icon type={constants.ICON.TYPE.EXIT} color={constants.ICON.COLOR.BLACK} />
          <div className={styles.txtBtn}>{OPTIONS.EXIT} &nbsp;</div>
        </div>
      )
    } else if (this.state.viewSelected === constants.VIEW.CART) {
      groupLinksRightSide.push(
        <div key={constants.ICON.TYPE.EXIT} data-header-item={constants.VIEW.HOME} className={styles.icon} onClick={this.onClickExit}>
          <Icon type={constants.ICON.TYPE.EXIT} color={constants.ICON.COLOR.BLACK} />
          <div className={styles.txtBtn}>{OPTIONS.EXIT} &nbsp;</div>
        </div>
      )    
    }
    const classHeader = this.state.viewSelected && this.state.viewSelected.toLowerCase() === constants.VIEW.HOME ? styles.homeHeader : styles.mainHeader

    return (
      <div>
        <header className={styles.header}>
          {locale.TITLE}
        </header>
        <div className={classHeader}>
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
  handleClick: PropTypes.func,
  showSideMenu: PropTypes.bool,
  handleSideMenu: PropTypes.func
}

export default Header