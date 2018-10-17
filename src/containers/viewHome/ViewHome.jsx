import React from 'react'
import PropTypes from 'prop-types'
import styles from './ViewHome.css'
import Img from '../../components/img/Img'
import locale from '../../common/locale.js'
import constants from '../../common/constants.js'

class ViewHome extends React.Component {
  constructor (props) {
    super(props)
    this.onClickAccess = this.onClickAccess.bind(this)
  } 
  onClickAccess (ev) {
    this.props.handleClickAccess && this.props.handleClickAccess({
      view: constants.VIEW.LIST,
      category: constants.CATEGORY_INIT_LIST
    },this.props.history) 
    ev.stopPropagation()
  }
  render () {
    const recommended = this.props.movies && this.props.movies[0] && this.props.movies[0].map((item, index) => {
      return <div key={index} className={styles.homeListCover}>
          <Img data={item} />
      </div>
    })
    const lastAdditions = this.props.movies && this.props.movies[1] && this.props.movies[1].map((item, index) => {
      return <div key={index} className={styles.homeListCover}>
        <Img data={item} />
      </div>
    })    
    return(
      <div className={styles.home}>
        <div className={styles.homeList}>
          <div className={styles.homeListTitle}>
            {locale.VIEW_HOME.RECOMMENDED}
          </div>
          <div className={styles.homeListCovers}>
            {recommended}
          </div>
        </div>
        <div className={styles.homelist}>
          <div className={styles.homeListTitle}>
            {locale.VIEW_HOME.LAST_ADDITIONS}
          </div>
          <div className={styles.homeListCovers}>
            {lastAdditions}
          </div>
        </div>
        <div className={styles.homeListBtn}>
          <button className={styles.btnCart} onClick={this.onClickAccess}>
            {locale.ACCESS}
          </button>
        </div>
      </div>      
    )
  }
}

ViewHome.propTypes = {
  movies: PropTypes.array,
  handleClickAccess: PropTypes.func
}

export default ViewHome