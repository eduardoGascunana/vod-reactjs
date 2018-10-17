import constants from '../common/constants.js'

const CATEGORIES = 'Categories'

class CategoriesModel {
  constructor () {
    this.data = []
  }
  getNameCategory (index) {
    return this.data[index].name
  }
  getItems (category) {
    return fetch(process.env.PUBLIC_URL + constants.DATA.FOLDER + CATEGORIES + constants.DATA.EXTENSION)
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