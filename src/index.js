// carga el modulo de test de los componentes
//import test from './indexTest'

// carga el componente Core de la App
import React from 'react'
import ReactDOM from 'react-dom'
import Core from './Core'

// import Data from './models/data'
// import List from './components/list/List'

/* const model = new Data({
  category: 'Home'
})  
console.log(model)
const list = model.getItems()
console.log("list: ",list) */

/* let category = 'Action' // 'Home' por defecto
const data = new DataModel()
let onChangeCategory = function (promise) {
  promise.then(res => {
    console.log("index.js - callback - then: ", res)

    ReactDOM.render(<List data={res} />, document.getElementById('root'))
  })
}
ReactDOM.render(<Data category={category} handleChangeCategory={onChangeCategory} />, document.getElementById('root')) */


/* const category = 'Action' // 'Home' por defecto
const data = new Data()
data.getItems(category)
  .then(response => {
    const items = response.map((item) => {
      let a = item
      return a
    })
    ReactDOM.render(< Core coverList={items} />, document.getElementById('root'));
  }) */

ReactDOM.render(< Core />, document.getElementById('root'));