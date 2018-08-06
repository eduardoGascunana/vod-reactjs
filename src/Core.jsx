import React from 'react'
import {
  BrowserRouter,
  Route
} from 'react-router-dom'
import { 
  Switch
} from 'react-router'
import $ from 'jquery'
import styles from './common/css/styles.css'
import MoviesModel from './models/Movies'
import CategoriesModel from './models/Categories'
import Header from './components/header/Header'
import ViewList from './containers/viewList/ViewList'
import ViewDetail from './containers/viewDetail/ViewDetail';

class Core extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewSelected: 'list',
      // viewSelected: null,
      category: 'home',
      movies: [],
      categories: [],
      infoDetail: null
    }
    this.moviesModel = new MoviesModel()
    this.categoriesModel = new CategoriesModel()
    this.onClickMenuItem = this.onClickMenuItem.bind(this)
    this.onClickCover = this.onClickCover.bind(this)
    this.onClickIconCart = this.onClickIconCart.bind(this)
    this.onClickRating = this.onClickRating.bind(this)    
  }
  reloadItemsLoaded () {
    const movies = this.moviesModel.getItemsCached()
    let infoDetail = this.state.infoDetail
    if (this.state.infoDetail) {
      const pos = movies.findIndex((cover) => {
        return cover.id === this.state.infoDetail.id
      }) 
      infoDetail = movies[pos]
    }
    this.setState({
      movies: movies,
      infoDetail: infoDetail
    })
  }
  componentWillMount() {
    this.moviesModel.subscribe(this.reloadItemsLoaded.bind(this))
    this.categoriesModel.getItems()
      .then(response => {
        const categories = response
        this.moviesModel.getItems('Action')
          .then(response => {
            const items = response.map((item) => {
              return item
            })
            this.setState({
              movies: items,
              categories: categories
            })
          })
      })
  }
  onClickMenuItem(index, history) {
    const name = this.categoriesModel.getNameCategory(index)
    this.moviesModel.getItems(name)
      .then(response => {
        const items = response.map((item) => {
          return item
        })
        this.setState({
          viewSelected: 'list',
          movies: items,
          category: name
        })
        history.push('/list/' + name)                
      })
  }
  onClickCover(info, history) {
    /* TO-DO */
    /*    https://stackoverflow.com/questions/42123261/programmatically-navigate-using-react-router-v4 */
    this.setState({
      viewSelected: 'detail',
      infoDetail: info
    })
    history.push('/detail/' + info.nameCategory + '/' + info.id)
  }
  onClickIconCart(info) {
    this.moviesModel.setItemCart(info)
  }
  onClickRating(info) {
    this.moviesModel.modifyRate(info)
  }    
  render() {
    return (
      <main className={styles.main} >
        <Header 
          viewSelected={this.state.viewSelected}/>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/list/:category' render={(props) => (
              <ViewList 
                {...props} 
                movies={$.extend(true, [], this.state.movies)} 
                categories={this.state.categories}
                handleClickCover={this.onClickCover}
                handleClickIconCart={this.onClickIconCart}
                handleClickRating={this.onClickRating}
                handleClickMenuItem={this.onClickMenuItem}
              />
            )}/>
            <Route path='/detail/:category/:id' render={(props) => (
              <ViewDetail
                {...props}
                data={this.state.infoDetail}
                handleClickIconCart={this.onClickIconCart}
                handleClickRating={this.onClickRating}  
              />              
            )}/>
            {/* <Route path='/cart' component={ViewCart} data={}/> */}
          </Switch>
        </BrowserRouter>
      </main>
    )
  }
}

const Home = () => {
  return (<h1>Estoy en la HOME</h1>)
}

export default Core