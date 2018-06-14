import React from 'react'
import PropTypes from 'prop-types'
import styles from './Rating.css'
import classNames from 'classnames'

class Rating extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      moving: this.props.rate,
      selected: this.props.rate
    }
    this.onClick = this.onClick.bind(this)
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }
  onClick(ev) {
    let val = Number(ev.target.dataset.rate)
    this.setState({
      moving: val,
      selected: val
    })
    if (this.props.handleClick) {
      this.props.handleClick(val)
    }
    ev.stopPropagation()
  }
  onMouseOver(ev) {
    this.setState({
      moving: Number(ev.target.dataset.rate)
    })
    ev.stopPropagation()
  }
  onMouseLeave(ev) {
    this.setState({
      moving: this.state.selected
    })
    ev.stopPropagation()
  }
  render() {
    // console.log("Rating - render")

    let ratingNodes = []
    // uso mejor array.map de ES6 ??????
    for (let i=this.props.length; i>0; i--) {
      let classActive = classNames(
        styles.ratingStar,
        {
          [styles.starActive]: i <= this.state.moving
        }
      )
      ratingNodes.push(
        <div key={i} data-rate={i} className={classActive}></div>
      )
    }
    return (
      <div 
        id="idStars" 
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
  rate: PropTypes.number,
  handleClick: PropTypes.func
}

export default Rating