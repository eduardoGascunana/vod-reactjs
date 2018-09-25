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
import CartModel from './models/Cart'
import Header from './components/header/Header'
import ViewList from './containers/viewList/ViewList'
import ViewDetail from './containers/viewDetail/ViewDetail';
import ViewCart from './containers/viewCart/ViewCart';

class Core extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewSelected: 'list',
      // viewSelected: null,
      category: 'Action',
      // category: 'home',
      movies: [],
      categories: [],
      infoDetail: null,
      cart: []
    }
    this.moviesModel = new MoviesModel()
    this.categoriesModel = new CategoriesModel()
    this.cartModel = new CartModel()
    this.onClickMenuItem = this.onClickMenuItem.bind(this)
    this.onClickCover = this.onClickCover.bind(this)
    this.onClickIconCart = this.onClickIconCart.bind(this)
    this.onClickRating = this.onClickRating.bind(this)    
    this.onClickHeaderItem = this.onClickHeaderItem.bind(this)
    this.onClickIconDelete = this.onClickIconDelete.bind(this)
  }
  componentWillMount() {
    this.moviesModel.subscribe(this.reloadItemsLoaded.bind(this))
    let categories = null
    let movies = null
    this.categoriesModel.getItems()
      .then(response => {
        categories = response
        return this.moviesModel.getItems(this.state.category)
      })
      .then(response => { 
        movies = response  
        return this.cartModel.get()
      })
      .then(response => {      
        this.setState({
          movies: this.completeInfoMovies(movies, this.state.category, response),
          categories: categories,
          cart: response
        })              
      })
  }
  componentDidUpdate() {
    window.onpopstate = (ev) => {
      const pathName = ev.currentTarget.location.pathname.split('/')
      this.setState({
        viewSelected: pathName[1],
        category: pathName[2]
      })
    }
  }
  completeInfoMovies(movies, category, cart) {
    movies.forEach(item => {
      item.isAddCart = cart.find(data => data.id === item.id) ? true : false
      item.nameCategory = category
    })
    return movies
  }
  reloadItemsLoaded() {
    const movies = this.completeInfoMovies(this.moviesModel.getItemsCached(), this.state.category, this.state.cart)
    let infoDetail = this.state.infoDetail
    if (this.state.infoDetail) {
      infoDetail = movies.find(cover => cover.id === this.state.infoDetail.id)
    }
    this.setState({
      movies: movies,
      infoDetail: infoDetail
    })
  }
  onClickMenuItem(index, history) {
    const name = this.categoriesModel.getNameCategory(index)
    this.moviesModel.getItems(name)
      .then(response => {       
        this.setState({
          movies: this.completeInfoMovies(response, this.state.category, this.state.cart),
          category: name
        })
        history.push('/list/' + name)                
      })
  }
  onClickHeaderItem(view, history) {
    this.setState({
      viewSelected: view
    })
    history.push('/' + view + '/')     
  }
  onClickCover(info, history) {
    this.setState({
      viewSelected: 'detail',
      infoDetail: info
    })
    history.push('/detail/' + info.nameCategory + '/' + info.id)
  }
  onClickIconCart(info) {
    const modifyCartModel = (item) => {
      return item.isAdd ? this.cartModel.add(item) : this.cartModel.delete(item)
    }
    modifyCartModel(info)
      .then(response => {
        this.setState({
          cart: response
        })        
        this.moviesModel.setItemCart(info)
      })
  }
  onClickRating(info) {
    this.moviesModel.modifyRate(info)
  }    
  onClickIconDelete(info) {
    this.cartModel.delete(info)
      .then(response => {        
        this.setState({
          movies: this.completeInfoMovies(this.state.movies, this.state.category, response),
          cart: response
        })        
      })
  }
  render() {
    return (
      <main className={styles.main} >
        <BrowserRouter>
          <div>
            <Route render={(props) => (
              <Header
                {...props}
                viewSelected={this.state.viewSelected}
                handleClick={this.onClickHeaderItem} />        
            )}/>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/list/:category' render={(props) => (
                <ViewList 
                  {...props} 
                  movies={$.extend(true, [], this.state.movies)} 
                  categories={this.state.categories}
                  categorySelected={this.state.category}
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
              <Route path='/cart' render={(props) => (
                <ViewCart
                  {...props}
                  data={this.state.cart}
                  handleClickIconDelete={this.onClickIconDelete}   
                />
              )}/>
            </Switch>
          </div>
        </BrowserRouter>
      </main>
    )
  }
}

const Home = () => {
  return (<h1>Estoy en la HOME</h1>)
}

export default Core