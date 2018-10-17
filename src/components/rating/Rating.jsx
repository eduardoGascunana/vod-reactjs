import React from 'react'
import PropTypes from 'prop-types'
import styles from './Rating.css'
import classNames from 'classnames'

class Rating extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: 0,
      moving: 0,
      selected: 0
    }
    this.onClick = this.onClick.bind(this)
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }
  static getDerivedStateFromProps (nextProps, prevState) {
    return nextProps.id !== prevState.id 
      ? {
        id: nextProps.id,
        moving: nextProps.rate,
        selected: nextProps.rate      
      } 
      : null
  }
  onClick (ev) {
    const val = Number(ev.target.dataset.rate)
    this.setState({
      moving: val,
      selected: val
    })
    this.props.handleClick && this.props.handleClick(val)
    ev.stopPropagation()
  }
  onMouseOver (ev) {
    this.setState({
      moving: Number(ev.target.dataset.rate)
    })
    ev.stopPropagation()
  }
  onMouseLeave (ev) {
    this.setState({
      moving: this.state.selected
    })
    ev.stopPropagation()
  }
  render () {
    const ratingNodes = Array(this.props.length)
      .fill(null)
      .map((item, index) => {
        const classActive = classNames(
          styles.ratingStar,
          {
            [styles.starActive]: this.props.length - index <= this.state.moving
          }
        )
        const value = this.props.length - index
        return (
          <div key={value}  data-rate={value} className={classActive}></div>
        )
      })
    return (
      <div 
        className={styles.rating} 
        ref={(stars) => {this.containerStars = stars}} 
        onClick={this.onClick} 
        onMouseOver={this.onMouseOver} 
        onMouseLeave={this.onMouseLeave}>
          {ratingNodes}
      </div>
    )
  }
}

Rating.defaultProps = {
  length: 5
}

Rating.propTypes = {
  id: PropTypes.string,
  rate: PropTypes.number,
  handleClick: PropTypes.func
}

export default Rating