import React from 'react'
import PropTypes from 'prop-types'
import styles from './IconCart.css'
import classNames from 'classnames'

const values = [
  'M22.73 22.73L2.77 2.77 2 2l-.73-.73L0 2.54l4.39 4.39 2.21 4.66-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h7.46l1.38 1.38c-.5.36-.83.95-.83 1.62 0 1.1.89 2 1.99 2 .67 0 1.26-.33 1.62-.84L21.46 24l1.27-1.27zM7.42 15c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h2.36l2 2H7.42zm8.13-2c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H6.54l9.01 9zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2z',
  'M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z'
]

class IconCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdd: this.props.isAdd
    }
    this.onClick = this.onClick.bind(this)
  }
  onClick(ev) {
    console.log("IconCart - onClick ",this.state.isAdd)

    this.setState({
      isAdd: !this.state.isAdd
    }, () => {
      if (this.props.handleClick) {
        this.props.handleClick(this.state.isAdd)
      }   
    })
    ev.stopPropagation()
  }
  render() {
    // console.log("IconCart - render")

    const classIcon = classNames(
      styles.cursor,
      // styles.black
      styles.white
    )
    return(
      <div onClick={this.onClick}>
        <svg className={classIcon} viewBox="0 0 24 24">
          <path d={values[Number(!this.state.isAdd)]}></path>  
        </svg>    
      </div>
    )
  }
}
    
IconCart.propTypes = {
  isAdd: PropTypes.bool,
  handleClick: PropTypes.func
}
      
export default IconCart