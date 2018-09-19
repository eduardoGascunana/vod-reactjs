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
    this.saveRateLocalStorage(item)
    this.itemToRender()
  }
  getRateStoraged (data) {
    const list = JSON.parse(localStorage.getItem('listItemsRateModified')) || []
    return data.map(item => {
      const storaged = list.find(store => store.id === item.id)
      item.rate = storaged ? storaged.rate : item.rate
      return item
    })
  }
  getItems (category) {
    this.category = category
    return fetch(process.env.PUBLIC_URL + '/data/' + category + '.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.listByCategory = this.getRateStoraged(data)
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
  saveRateLocalStorage (item) {
    let list = JSON.parse(localStorage.getItem('listItemsRateModified')) || []
    const index = list.findIndex(storage => item.id === storage.id)
    if (index !== -1) {
      list[index].rate = item.rate
      localStorage.setItem('listItemsRateModified', JSON.stringify(list))
    } else {
      localStorage.setItem('listItemsRateModified', JSON.stringify([...list, item]))
    }
  }
  subscribe (item) {
    this.itemToRender = item
  } 
}

export default MoviesModel