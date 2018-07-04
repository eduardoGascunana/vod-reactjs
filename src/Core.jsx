import React from 'react'
import {
  BrowserRouter,
  Route
} from 'react-router-dom'
import { 
  Switch
} from 'react-router'
import MoviesModel from './models/Movies'
import CategoriesModel from './models/Categories'
import styles from './common/css/styles.css'
import ViewList from './containers/list/List'
import Header from './components/header/Header'

class Core extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewSelected: 'list',
      // viewSelected: null,
      category: 'home',
      movies: [],
      categories: []
    }
    this.moviesModel = new MoviesModel()
    this.categoriesModel = new CategoriesModel()
    this.onClickMenuItem = this.onClickMenuItem.bind(this)
    this.onClickCover = this.onClickCover.bind(this)
    this.onClickIconCart = this.onClickIconCart.bind(this)
    this.onClickRating = this.onClickRating.bind(this)    
  }
  componentWillMount() {
    console.log("Core - componenteWillMount")

    this.moviesModel.subscribe(this.render.bind(this))

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
    console.log("Core - onClickMenuItem: ", index)

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
    console.log("Core - onClickCover: ",info)
    /* TO-DO */
    /*    https://stackoverflow.com/questions/42123261/programmatically-navigate-using-react-router-v4 */
    this.setState({
      viewSelected: 'detail'
    })
    history.push('detail/' + info.nameCategory + '/' + info.id)
  }
  onClickIconCart(info) {
    console.log("Core - onClickIconCart - info: ", info)

    /* this.setState({
      movies: this.moviesModel.setItemCart(info)
    }) */
    this.moviesModel.setItemCart(info)
  }
  onClickRating(info) {
    console.log("Core - onClickIconRating - info: ", info)

    /* this.setState({
      movies: this.moviesModel.modifyRate(info)
    }) */
  }    
  render() {
    if (this.state.movies[0]) {
      console.log("Core - render ",this.state.movies[5].isAddCart)
    }

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
                movies={this.state.movies} 
                categories={this.state.categories}
                handleClickCover={this.onClickCover}
                handleClickIconCart={this.onClickIconCart}
                handleClickRating={this.onClickRating}
                handleClickMenuItem={this.onClickMenuItem}
              />
            )}/>
            {/* <Route path='/detail/:category/:id' component={ViewDetail} data={}/> */}
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