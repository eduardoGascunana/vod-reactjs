import React from 'react'
import PropTypes from 'prop-types'
import styles from './ViewHome.css'
import Img from '../../components/img/Img'
import IconLoading from '../../components/iconLoading/IconLoading'
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
    let content
    if (this.props.loading || this.props.movies.length !== 2) {
      content = <IconLoading></IconLoading>
    } else {
      const { movies } = this.props
      const recommended = movies[0].map((item, index) => {
        return <div key={index} className={styles.homeListCover}>
            <Img data={item} />
        </div>
      })
      const lastAdditions = movies[1].map((item, index) => {
        return <div key={index} className={styles.homeListCover}>
          <Img data={item} />
        </div>
      })
      content = (
        <div>
          <div className = {styles.homeList} >
            <div className={styles.homeListTitle}>
              {locale.VIEW_HOME.RECOMMENDED}
            </div>
            <div className={styles.homeListCovers}>
              {recommended}
            </div>
          </div >
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
    return(
      <div className={styles.home}>
        {content}
      </div>      
    )
  }
}

ViewHome.propTypes = {
  movies: PropTypes.array,
  handleClickAccess: PropTypes.func
}

export default ViewHome