import React from 'react'
import PropTypes from 'prop-types'
import styles from './Modal.css'

const DEFAULT_CLASS = 'modalButton'
class Modal extends React.Component {
  constructor (props) {
    super(props)
    this.onClickButtons = this.onClickButtons.bind(this)
  }
  onClickButtons (ev) {
    this.props.handle && this.props.handle(ev)
  }
  render () {
    const options = this.props.options.map((item, index) => {
      return <button key={item} id={index} className={styles[this.props.class]}>{item}</button>
    })

    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <div className={styles.modalHeaderTitle}>
              {this.props.header}
            </div>
          </div>
          <div className={styles.modalBody}>
            {this.props.body}
          </div>
          <div className={styles.modalFooter}>
            <div className={styles.modalFooterWraper} onClick={this.onClickButtons}>
              <div>
                {options}
              </div>
            </div>
          </div>
        </div>
      </div> 
    )
  }
}

Modal.defaultProps = {
  class: DEFAULT_CLASS
}

Modal.propTypes = {
  header: PropTypes.string,
  body: PropTypes.string,
  options: PropTypes.array,
  class: PropTypes.string,
  handle: PropTypes.func
}

export default Modal
