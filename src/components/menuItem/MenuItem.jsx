import React from 'react'
import PropTypes from 'prop-types'
import styles from './MenuItem.css'
import classNames from 'classnames'

class MenuItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHover: false,
      isSelected: this.props.isSelected
    }
    this.onClick = this.onClick.bind(this)
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)    
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isSelected !== this.props.isSelected) {
      this.setState({
        isSelected: nextProps.isSelected
      })
    }
  }  
  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.isSelected !== this.props.isSelected ||
      nextState.isHover !== this.state.isHover ||
      nextState.isSelected !== this.state.isSelected)
  }
  onClick(ev) {
    this.setState({
      isSelected: true
    })
    if (this.props.handleClick) {
      this.props.handleClick(this.props.index)
    }
    ev.stopPropagation()
    ev.preventDefault()
  }  
  onMouseOver(ev) {
    this.setState({
      isHover: true
    })
    ev.stopPropagation()
  }
  onMouseLeave(ev) {
    this.setState({
      isHover: false
    })
    ev.stopPropagation()
  }
  render() {
    const classActive = classNames(
      styles.item,
      {
        [styles.itemHover]: this.state.isHover
      },
      {
        [styles.itemSelected]: this.state.isSelected
      }
    )    
    return (
      <a 
        href={`list/${this.props.title}`}
        className={classActive}
        onClick={this.onClick}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}>
        {this.props.title}
      </a>
    )
  }
}

MenuItem.propTypes = {
  title: PropTypes.string,
  isSelected: PropTypes.bool,
  index: PropTypes.number,
  handleClick: PropTypes.func
}

export default MenuItem