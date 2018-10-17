const NAME_LOCAL_STORAGE = 'listCartMovies'

class CartModel {
  constructor () {
    this.data = JSON.parse(localStorage.getItem(NAME_LOCAL_STORAGE)) || []
  }
  add (info) {
    return new Promise((resolve, reject) => {
      this.data.push(info)
      this.setItemsLocalStorage()      
      this.get().then(response => resolve(response))
    })  
  }
  delete (info) {
    return new Promise((resolve, reject) => {
      const index = this.data.findIndex(item => item.id === info.id)
      this.data.splice(index, 1)
      this.setItemsLocalStorage()      
      this.get().then(response => resolve(response))
    })    
  }
  allDelete () {
    return new Promise((resolve, reject) => {
      this.data = []
      this.get().then(response => resolve(response))
    })
  }
  get () {
    return new Promise((resolve, reject) => {
      resolve(this.data)
    })
  }
  setItemsLocalStorage () {
    localStorage.setItem(NAME_LOCAL_STORAGE, JSON.stringify(this.data))
  }
}

export default CartModel