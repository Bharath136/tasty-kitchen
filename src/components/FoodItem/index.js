import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'
import './index.css'

class FoodItem extends Component {
  state = {
    isFound: false,
    quantity: 0,
  }

  componentDidMount() {
    // Check if the food item is already in the cart
    this.checkCartItem()
  }

  // Function to check if the food item is in the cart
  checkCartItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {foodItem} = this.props
    const cartItem = cartData.filter(each => each.id === foodItem.id)
    if (cartItem.length !== 0) {
      if (cartItem[0].quantity > 0) {
        this.setState({quantity: cartItem[0].quantity, isFound: true})
      } else if (cartItem[0].quantity < 1) {
        this.removeCartItem()
        this.setState({quantity: cartItem[0].quantity, isFound: false})
      }
    }
  }

  // Function to increase the quantity of a cart item
  addCartItemQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItem} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodItem.id) {
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.checkCartItem()
  }

  // Function to decrease the quantity of a cart item
  removeCartItemQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItem} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodItem.id) {
        if (eachItem.quantity > 0) {
          const updatedQuantity = eachItem.quantity - 1
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.checkCartItem()
  }

  // Function to remove a cart item
  removeCartItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItem} = this.props
    const updatedCartData = cartData.filter(
      eachCartItem => eachCartItem.id !== foodItem.id,
    )
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.checkCartItem()
  }

  // Function to add a new item to the cart
  addCartItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {foodItem} = this.props
    const cartItem = {...foodItem, quantity: 1}
    cartData.push(cartItem)
    localStorage.setItem('cartData', JSON.stringify(cartData))
    this.checkCartItem()
    this.setState({isFound: true})
  }

  // Function to render the food item details
  renderFoodItems = () => {
    const {foodItem} = this.props
    const {isFound, quantity} = this.state

    return (
      <li className="food-item" data-testid="foodItem">
        <img
          src={foodItem.imageUrl}
          alt="food-item"
          className="food-item-image"
        />
        <div className="food-item-details-container">
          <h1 className="food-name">{foodItem.name}</h1>
          <div className="food-rating-container">
            <BiRupee />
            <p className="food-rating">{foodItem.cost}</p>
          </div>
          <div className="food-rating-container">
            <AiFillStar className="star-icon" />
            <p className="food-rating">{foodItem.rating}</p>
          </div>
          {isFound ? (
            // Render buttons for existing cart item
            <div className="buttons-container" id={foodItem.id}>
              <button
                type="button"
                className="button"
                data-testid="decrement-count"
                onClick={this.removeCartItemQuantity}
                aria-label="Decrement Count"
              >
                <HiOutlineMinusSm className="minus-icon" />
              </button>
              <p
                type="button"
                className="count-value"
                data-testid="active-count"
              >
                {quantity}
              </p>
              <button
                type="button"
                className="button"
                data-testid="increment-count"
                onClick={this.addCartItemQuantity}
                aria-label="Increment Count"
              >
                <BsPlus className="plus-icon" />
              </button>
            </div>
          ) : (
            // Render "Add" button for new cart item
            <button
              type="button"
              className="add-button"
              onClick={this.addCartItem}
            >
              Add
            </button>
          )}
        </div>
      </li>
    )
  }

  render() {
    return (
      <div className="food-item-main-container">{this.renderFoodItems()}</div>
    )
  }
}

export default FoodItem
