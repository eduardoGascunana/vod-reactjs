import constants from '../common/constants.js'

const NAME_LOCAL_STORAGE = 'listItemsRateModified'
class MoviesModel {
  constructor () {
    this.listByCategory = []
    this.itemToRender = null
  }
  setItemCart (item) {
    const pos = this.listByCategory.findIndex(cover => cover.id === item.id)
    this.listByCategory[pos].isAddCart = item.isAdd
    this.itemToRender()
  }
  modifyRate (item) {
    const pos = this.listByCategory.findIndex(cover => cover.id === item.id)
    this.listByCategory[pos].rate = item.rate
    this.saveRateLocalStorage(item)
    this.itemToRender()
  }
  getRateStoraged (data) {
    const list = JSON.parse(localStorage.getItem(NAME_LOCAL_STORAGE)) || []
    return data.map(item => {
      const storaged = list.find(store => store.id === item.id)
      item.rate = storaged ? storaged.rate : item.rate
      return item
    })
  }
  getItems (category) {
    return fetch(process.env.PUBLIC_URL + constants.DATA.FOLDER + category + constants.DATA.EXTENSION)
      .then(response => response.json())
      .then(data => {
        this.listByCategory = this.getRateStoraged(data)
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
    let list = JSON.parse(localStorage.getItem(NAME_LOCAL_STORAGE)) || []
    const index = list.findIndex(storage => item.id === storage.id)
    if (index !== -1) {
      list[index].rate = item.rate
      localStorage.setItem(NAME_LOCAL_STORAGE, JSON.stringify(list))
    } else {
      localStorage.setItem(NAME_LOCAL_STORAGE, JSON.stringify([...list, item]))
    }
  }
  subscribe (item) {
    this.itemToRender = item
  } 
}

export default MoviesModel