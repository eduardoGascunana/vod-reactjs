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
import ViewHome from './containers/viewHome/ViewHome'
import ViewList from './containers/viewList/ViewList'
import ViewDetail from './containers/viewDetail/ViewDetail';
import ViewCart from './containers/viewCart/ViewCart';
import constants from './common/constants.js'

class Core extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      viewSelected: null,
      category: null,
      movies: [],
      categories: [],
      infoDetail: null,
      cart: [],
      showSideMenu: false,
      loading: true
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
    this.onClickEmptyCart = this.onClickEmptyCart.bind(this)
    this.onClickAccess = this.onClickAccess.bind(this)
    this.onSideMenu = this.onSideMenu.bind(this)
  } 
  componentWillMount () {
    this.moviesModel.subscribe(this.reloadItemsLoaded.bind(this))
    let categories = null
    let movies = null
    this.categoriesModel.getItems()
      .then(response => {
        categories = response
        return this.moviesModel.getItems(constants.CATEGORY_INIT)
      })
      .then(response => { 
        movies = response  
        return this.cartModel.get()
      })
      .then(response => {    
        this.setState({
          viewSelected: constants.CATEGORY_INIT,
          movies: this.completeInfoMovies(movies, constants.CATEGORY_INIT, response),
          categories: categories,
          category: constants.CATEGORY_INIT,
          cart: response,
          loading: false
        })              
      })
  }
  componentDidUpdate () {
    window.onpopstate = (ev) => {
      this.setState({
        loading: true
      })
      const path = ev.currentTarget.location.pathname
      let pathName = process.env && process.env.PUBLIC_URL && path.includes(process.env.PUBLIC_URL)
        ? path.slice(process.env.PUBLIC_URL.length)
        : path
      pathName = pathName.split('/')
      if ((pathName[0] === '' && pathName[1] === '') || pathName[1] === constants.VIEW.HOME) {
        this.moviesModel.getItems(constants.CATEGORY_INIT)
          .then(response => {
            this.setState({
              viewSelected: constants.CATEGORY_INIT,
              movies: this.completeInfoMovies(response, this.state.category, this.state.cart),
              category: pathName[2],
              loading: false
            })
          })        
      } else if (this.state.viewSelected === pathName[1] && this.state.category !== pathName[2]) {
        this.moviesModel.getItems(pathName[2])
          .then(response => {
            this.setState({
              movies: this.completeInfoMovies(response, this.state.category, this.state.cart),
              category: pathName[2],
              loading: false
            })
          })
      } else {
        this.setState({
          viewSelected: pathName[1],
          category: pathName[2],
          loading: false
        })
      }
    }
  }
  completeInfoMovies (movies, category, cart) {
    movies.forEach(item => {
      item.isAddCart = cart.find(data => data.id === item.id) ? true : false
      item.nameCategory = category
    })
    return movies
  }
  reloadItemsLoaded () {
    const movies = this.completeInfoMovies(this.moviesModel.getItemsCached(), this.state.category, this.state.cart)
    const infoDetail = this.state.infoDetail ? movies.find(cover => cover.id === this.state.infoDetail.id) : this.state.infoDetail
    this.setState({
      movies: movies,
      infoDetail: infoDetail
    })
  }
  onClickMenuItem (index, history) {
    this.setState({
      loading: true
    })
    const name = this.categoriesModel.getNameCategory(index)
    this.moviesModel.getItems(name)
      .then(response => {       
        this.setState({
          movies: this.completeInfoMovies(response, this.state.category, this.state.cart),
          category: name,
          loading: false
        })
        history.push(`/${constants.VIEW.LIST}/${name}`)                
      })
  }
  onClickHeaderItem (view, history) {
    this.setState({
      loading: true
    })      
    if (view === constants.VIEW.HOME) {
      this.moviesModel.getItems(constants.CATEGORY_INIT)
        .then(response => {
          this.setState({
            viewSelected: view,
            movies: response,
            category: constants.CATEGORY_INIT,
            loading: false
          })
          history.push(`/${view}`)
        })       
    } else {
      this.setState({
        viewSelected: view,
        loading: false
      })
      history.push(`/${view}/`)      
    }
  }
  onClickCover (info, history) {
    this.setState({
      loading: true
    })    
    this.setState({
      viewSelected: constants.VIEW.DETAIL,
      infoDetail: info,
      loading: false
    })
    history.push(`/${constants.VIEW.DETAIL}/${info.nameCategory}/${info.id}`)
  }
  onClickIconCart (info) {
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
  onClickRating (info) {
    this.moviesModel.modifyRate(info)
  }    
  onClickIconDelete (info) {  
    this.cartModel.delete(info)
      .then(response => {        
        this.setState({
          movies: this.completeInfoMovies(this.state.movies, this.state.category, response),
          cart: response
        })        
      })
  }
  onClickEmptyCart () { 
    this.cartModel.allDelete()
      .then(response => {
        this.setState({
          movies: this.completeInfoMovies(this.state.movies, this.state.category, response),
          cart: response
        })         
      })
  }
  onClickAccess (info, history) {
    this.setState({
      loading: true
    })    
    this.moviesModel.getItems(info.category)
      .then(response => {
        history.push(`/${info.view}/${info.category}`)      
        this.setState({
          viewSelected: info.view,
          movies: this.completeInfoMovies(response, info.category, this.state.cart),
          category: info.category,
          loading: false
        }) 
      })   
  }
  onSideMenu (show) {
    this.setState({
      showSideMenu: show
    })
  }
  render () {
    const {ROUTE} = constants
    return (
      <main className={styles.main} >
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div>
            <Route render={props => (
              <Header
                {...props}
                viewSelected={this.state.viewSelected}
                handleClick={this.onClickHeaderItem} 
                showSideMenu={this.state.showSideMenu}
                handleSideMenu={this.onSideMenu}
              />        
            )}/>
            <Switch>
              <Route path={ROUTE.HOME} render={props => (
                <ViewHome
                  {...props}
                  loading={this.state.loading}
                  movies={this.state.movies}
                  handleClickAccess={this.onClickAccess}
                />
              )} />
              <Route path={ROUTE.LIST} render={props => (
                <ViewList 
                  {...props}
                  loading={this.state.loading}
                  movies={$.extend(true, [], this.state.movies)} 
                  categories={this.state.categories}
                  categorySelected={this.state.category}
                  handleClickCover={this.onClickCover}
                  handleClickIconCart={this.onClickIconCart}
                  handleClickRating={this.onClickRating}
                  handleClickMenuItem={this.onClickMenuItem}
                  showSideMenu={this.state.showSideMenu}
                  handleSideMenu={this.onSideMenu}
                />
              )}/>
              <Route path={ROUTE.DETAIL} render={props => (
                <ViewDetail
                  {...props}
                  loading={this.state.loading}
                  data={this.state.infoDetail}
                  handleClickIconCart={this.onClickIconCart}
                  handleClickRating={this.onClickRating}  
                />              
              )}/>
              <Route path={ROUTE.CART} render={props => (
                <ViewCart
                  {...props}
                  loading={this.state.loading}
                  data={this.state.cart}
                  handleClickIconDelete={this.onClickIconDelete}   
                  handleClickEmptyCart={this.onClickEmptyCart}   
                />
              )}/>
            </Switch>       
            <footer className={styles.mainFooter}>
              <div>Eduardo Gascuñana Martos</div>
              <a href="https://www.linkedin.com/in/eduardo-gascu%C3%B1ana-martos-84269b37/">Linkedin</a>
            </footer>           
          </div>
        </BrowserRouter>
      </main>
    )
  }
}

export default Core