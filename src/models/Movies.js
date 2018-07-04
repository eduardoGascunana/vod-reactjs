class MoviesModel {
  constructor() {
    this.category = null
    this.listByCategory = []
    this.dataItem = {}
    this.dataCart = []
    this.listRateModified = []

    this.itemToRender = null
  }
  setNameCategory (data) {
    data.forEach((item) => {
      item.nameCategory = this.category
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
  setItemCart (item) {
    console.log("moviesModel - setItemCart: ",item)

    const pos = this.listByCategory.findIndex((cover) => {
      return cover.id === item.id
    })
    this.listByCategory[pos].isAddCart = item.isAdd
    this.dataItem.isAddCart = item.isAdd
    // return this.listByCategory
    this.itemToRender()
  }
  modifyRate (item) {
    const pos = this.listByCategory.findIndex((cover) => {
      return cover.id === item.id
    })
    this.listByCategory[pos].rate = item.rate
    this.dataItem.rate = item.rate
    /* 
      TO-DO 
      modificar "listRateModified"
    */
   return this.listByCategory
  }
  getRateStoraged () {
    /* TO-DO */
  }
  getItems (category) {
    console.log("Movies - getItems: ",category)

    this.category = category
    return fetch(process.env.PUBLIC_URL + '/data/' + category + '.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.listByCategory = data
        this.setNameCategory(this.listByCategory)
        this.setIsCart(this.listByCategory)        
        return this.listByCategory
      })
      .catch(e => {
        console.error('ERROR: ', e)
      })
  }
  subscribe (item) {
    console.log("Movies - subscribe")

    this.itemToRender = item
  } 
}

export default MoviesModel