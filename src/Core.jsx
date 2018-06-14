import React from 'react'
// import List from './components/list/List'
import ViewList from './containers/list/List'
import {
  BrowserRouter,
  Route
} from 'react-router-dom'
import { 
  Switch
} from 'react-router'
import DataModel from './models/data'

class Core extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: 'home',
      coverList: []
      // coverList: this.props.coverList
    }
    this.dataModel = new DataModel()
    this.onClickCover = this.onClickCover.bind(this)
    this.onClickIconCart = this.onClickIconCart.bind(this)
    this.onClickRating = this.onClickRating.bind(this)    
  }
  componentWillMount() {
    this.dataModel.getItems('Action')
      .then(response => {
        const items = response.map((item) => {
          return item
        })
        this.setState({
          coverList: items
        })
      })
  }
  onClickCover(info, history) {
    console.log("Core - onClickCover: ",info)
    /* TO-DO */
    /*    https://stackoverflow.com/questions/42123261/programmatically-navigate-using-react-router-v4 */
    // history.push('detail/' + info.nameCategory + '/' + info.id)
    history.push('/')
  }
  onClickIconCart(info) {
    console.log("Core - onClickIconCart - info: ", info)

    this.setState({
      coverList: this.dataModel.setItemCart(info)
    })
  }
  onClickRating(info) {
    console.log("Core - onClickIconRating - info: ", info)

    this.setState({
      coverList: this.dataModel.modifyRate(info)
    })
  }    
  render() {
    console.log("Core - render")

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/list/:category' render={(props) => (
            <ViewList 
              {...props} 
              items={this.state.coverList} 
              handleClickCover={this.onClickCover}
              handleClickIconCart={this.onClickIconCart}
              handleClickRating={this.onClickRating}
            />
          )}/>
          {/* <Route path='/detail/:category/:id' component={ViewDetail} data={}/> */}
          {/* <Route path='/cart' component={ViewCart} data={}/> */}
        </Switch>
      </BrowserRouter>
    )
  }
}

const Home = () => {
  return (<h1>Estoy en la HOME</h1>)
}

export default Core