import React from 'react'
import styles from './IconLoading.css'

class IconLoading extends React.Component {
  render () {
    const pathIconLoading = require(`../../common/loading.gif`)
    return (
      <div className={styles.spinner}>
        <div className={styles.container}>
          <img src={pathIconLoading} alt='' />
        </div>
      </div>      
    )
  }
}

export default IconLoading