import React from 'react'
import PropTypes from 'prop-types'
import styles from './ViewHome.css'
import Img from '../../components/img/Img'

const category = 'Home'

class ViewHome extends React.Component {
  constructor (props) {
    super(props)
    /* this.state = {
      movies: []
    } */
    this.onClickAccess = this.onClickAccess.bind(this)
  }
/*   componentWillMount () {
    this.moviesModel.getItems(category)
      .then(response => {
        this.setState({
          movies: response
        })
      })
  } */  
  onClickAccess (ev) {
    if (this.props.handleClickAccess) {
      this.props.handleClickAccess({
        view: 'list',
        category: 'adventure'
      },this.props.history)
    }   
    ev.stopPropagation()
  }
  render () {

    // debugger

    /* 
      BASTANTE FEO .... 
    */ 
    const recommended = this.props.movies && this.props.movies[0] && this.props.movies[0].map((item, index) => {
      return <div className={styles.homeListCover}>
          <Img
          key={index}
          data={item} />
      </div>
    })
    const lastAdditions = this.props.movies && this.props.movies[1] && this.props.movies[1].map((item, index) => {
      return <div className={styles.homeListCover}>
        <Img
          key={index}
          data={item} />
      </div>
    })    
    return(
      <div className={styles.home}>
        <div className={styles.homeList}>
          <div className={styles.homeListTitle}>
            Recommended
          </div>
          <div className={styles.homeListCovers}>
            {recommended}
            {/* <template is="dom-repeat" items="[[recommendedList]]">
              <div className={styles.homelistCover}>
                <c-img data="[[item]]"></c-img>
              </div>
            </template> */}
          </div>
        </div>
        <div className={styles.homelist}>
          <div className={styles.homeListTitle}>
            Last additions
          </div>
          <div className={styles.homeListCovers}>
            {lastAdditions}
            {/* <template is="dom-repeat" items="[[lastAddedList]]">
              <div className={styles.homeListCover}>
                <c-img data="[[item]]"></c-img>
              </div>
            </template> */}
          </div>
        </div>
        <div className={styles.homeListBtn}>
          <button className={styles.btnCart} onClick={this.onClickAccess}>
            Access
          </button>
        </div>
      </div>      
    )
  }
}

/* ViewHome.defaultProps = {
  movies: [{}, {}]
} */

ViewHome.propTypes = {
  movies: PropTypes.array,
  handleClickAccess: PropTypes.func
}

export default ViewHome