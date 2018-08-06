class MoviesModel {
  constructor() {
    this.category = null
    this.listByCategory = []
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
    const pos = this.listByCategory.findIndex((cover) => {
      return cover.id === item.id
    })
    this.listByCategory[pos].isAddCart = item.isAdd

    this.itemToRender()
  }
  modifyRate (item) {
    const pos = this.listByCategory.findIndex((cover) => {
      return cover.id === item.id
    })
    this.listByCategory[pos].rate = item.rate
    /* 
      TO-DO 
      modificar "listRateModified" para que al modificar el "rate" de un "item", si cambio de genero y vuelvo, que muestre el "rate" modificado (y guardado en "listRateMofified" en lugar del devuelto)
    */
    this.itemToRender()
  }
  getRateStoraged () {
    /* TO-DO */
  }
  getItems (category) {
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
  getItemsCached () {
    return this.listByCategory
  }
  subscribe (item) {
    this.itemToRender = item
  } 
}

export default MoviesModel