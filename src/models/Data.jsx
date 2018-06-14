import React from 'react'
import 'whatwg-fetch'

/* const dataModel = {
  getItems: (category) => {
    return fetch(process.env.PUBLIC_URL + '/data/' + category + '.json')
      .then(response => {
        console.log("then - response: ", response)
        return response.json()
      })
      .then(data => {
        console.log("then - data: ",data)
        return data
      })
      .catch(e => {
        console.error('Something went wrong: ', e)
      });
  }
} */

class DataModel extends React.Component {
  constructor(props) {
    super(props)
    /* this.state = {
      category: this.props.category,  
      coverList: []     // ¿?¿?¿? NO PORQUE AUNQUE SE CAMBIE EL ESTADO NO SE VA A RENDERIZAR NADA
    } */
    this.listByCategory = []
    this.dataCart = []
    this.listRateModified = []
  } 
  componentDidMount () {
    console.log("DataModel - componentDidMount");

    this.props.handleChangeCategory(this.getItems(this.props.category))
  }

  /* https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html */
  // getDerivedStateFromProps (nextProps, prevState) {
  componentWillReceiveProps (nextProps) {
    console.log("DataModel - componentWillReceiveProps");

    if (nextProps.category !== this.props.category) {
      this.props.handleChangeCategory(this.getItems(nextProps.category))
    }
  }
  getItems (category) {
    console.log("DataModel - getItems - category: ",category)

    return fetch(process.env.PUBLIC_URL + '/data/' + category + '.json')
    .then(response => {
      console.log("DataModel - getItems - then - response: ", response)

      return response.json()
    })
    .then(data => {
      console.log("DataModel - getItems - then - data: ", data)

      this.listByCategory = data
      this.setNameCategory(this.listByCategory)
      this.setIsCart (this.listByCategory)
      /* this.setState({
        coverList: his.listByCategory     // ¿?¿?¿? NO PORQUE AUNQUE SE CAMBIE EL ESTADO NO SE VA A RENDERIZAR NADA
      }) */
      return this.listByCategory
    })
    .catch(e => {
      console.error('Something went wrong: ', e)
    });
  } 
  setNameCategory (data) {
    data.forEach((item) => {
      item.nameCategory = this.props.category
    })
  }
  setIsCart (data) {
    data.forEach((item) => {
      item.isAddCart = this.dataCart.some((data) => {
        return data.id === item.id
      })
      // item.rate = this.getRateStoraged(item.id) || item.rate
    })
  }
  getRateStoraged () {
    /* TO-DO */
  }
  modifyRate () {
    /* TO-DO */
  }
  setItemCart () {
    /* TO-DO */
  }
  render () {
    return null
  }
}

export default DataModel