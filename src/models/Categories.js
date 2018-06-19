class CategoriesModel {
  constructor() {
    this.data = []
  }
  getNameCategory(index) {
    return this.data[index].name
  }
  getItems(category) {
    return fetch(process.env.PUBLIC_URL + '/data/Categories.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.data = data
        return this.data
      })
      .catch(e => {
        console.error('ERROR: ', e)
      })
  } 
}

export default CategoriesModel