import React from 'react'
import List from '../../components/list/List'

class ViewList extends React.Component {
  constructor(props) {
    super(props)
    this.onClickCover = this.onClickCover.bind(this)
    this.onClickIconCart = this.onClickIconCart.bind(this)
    this.onClickRating = this.onClickRating.bind(this)
  }   
  onClickCover(info) {
    console.log("ViewList - onClickCover")
    this.props.handleClickCover(info, this.props.history)
  }
  onClickIconCart(info) {
    console.log("ViewList - onClickIconCart - isAdd: ", info)
    this.props.handleClickIconCart(info)
  }  
  onClickRating(info) {
    console.log("ViewList - onClickRating - rate: ", info)
    this.props.handleClickRating(info)
  }    
  render () {
    console.log("ViewList - render: ", this.props.items)

    return (
      <List
        data={this.props.items}
        handleClickCover={this.onClickCover}
        handleClickIconCart={this.onClickIconCart}
        handleClickRating={this.onClickRating} />
    )
  }
}

export default ViewList