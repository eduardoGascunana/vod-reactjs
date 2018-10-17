import React from 'react'
import styles from './Img.css'

class Img extends React.Component {
  render () {
    const {data} = this.props
    let imgPath
    try {
      imgPath = require(`../../common/images/${data.cover}`)
    } catch (err) {
      imgPath = require(`../../common/images/default.jpg`)
    }    
    return (
      <img src={imgPath} className={styles.size} alt={data.name} />
    )
  }
}

export default Img