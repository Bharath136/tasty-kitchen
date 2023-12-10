import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaCheckCircle} from 'react-icons/fa'
import {BiRupee} from 'react-icons/bi'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer/index'
import './index.css'

// Constants to represent different states of the cart
const cartStatusConstants = {
  initial: 'INITIAL',
  cartItemsFound: 'SUCCESS',
  noCartItems: 'FAILURE',
  paymentSuccess: 'PAYMENT',
}

class Cart extends Component {
  state = {cartItems: [], cartStatus: cartStatusConstants.initial}

  componentDidMount() {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0)
    // Fetch and display cart items
    this.getCartItems()
  }

  // Function to increase the quantity of a cart item
  increaseCartItemQuantity = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getCartItems()
  }

  // Function to decrease the quantity of a cart item
  decreaseCartItemQuantity = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id && eachItem.quantity > 0) {
        const updatedQuantity = eachItem.quantity - 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    this.removeCartItem(updatedCartData)
  }

  // Function to remove a cart item
  removeCartItem = updatedData => {
    const updatedCartData = updatedData.filter(
      eachCartItem => eachCartItem.quantity > 0,
    )
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getCartItems()
  }

  // Function to calculate the total amount of items in the cart
  calculateTotalAmount = () => {
    const {cartItems} = this.state
    const amountList = cartItems.map(each => each.quantity * each.cost)
    const totalAmount = amountList.reduce((a, b) => a + b, 0)
    return totalAmount
  }

  // Function to fetch and display cart items
  getCartItems = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    if (cartData.length === 0) {
      this.setState({
        cartStatus: cartStatusConstants.noCartItems,
      })
    } else {
      const cartItems = cartData.map(each => ({
        cost: each.cost,
        quantity: each.quantity,
        id: each.id,
        imageUrl: each.imageUrl,
        name: each.name,
      }))
      this.setState({
        cartStatus: cartStatusConstants.cartItemsFound,
        cartItems,
      })
    }
  }

  // Function to place an order
  placeOrder = () => {
    this.setState({cartStatus: cartStatusConstants.paymentSuccess})
    localStorage.clear('cartData')
  }

  // Function to render individual cart items
  renderCartItems = () => {
    const {cartItems} = this.state
    const totalAmount = this.calculateTotalAmount()

    return (
      <div className="cart-container">
        <div className="container">
          <div className="cart-item-container">
            <div className="cart-heading-container">
              <h1 className="cart-heading">Item</h1>
              <h1 className="cart-heading">Quantity</h1>
              <h1 className="cart-heading">Price</h1>
            </div>
            <div className="cart-items-container" data-testid="cartItem">
              {cartItems.map(item => (
                <li key={item.id} className="cart-item">
                  <img
                    src={item.imageUrl}
                    alt="cart-item"
                    className="cart-image-mobile"
                  />
                  <div className="details-container-mobile">
                    <h1 className="item-name">{item.name}</h1>
                    <div className="buttons-container">
                      <button
                        data-testid="decrement-quantity"
                        type="button"
                        className="minus-icon-container"
                        onClick={() => this.decreaseCartItemQuantity(item.id)}
                        aria-label="Decrement Count"
                      >
                        <HiOutlineMinusSm />
                      </button>
                      <p className="item-quantity">{item.quantity}</p>
                      <button
                        data-testid="increment-quantity"
                        type="button"
                        className="plus-icon-container"
                        onClick={() => this.increaseCartItemQuantity(item.id)}
                        aria-label="Increment Count"
                      >
                        <BsPlus className="plus-icon" />
                      </button>
                    </div>
                    <p className="item-price">{item.cost}</p>
                  </div>

                  <div className="details-container-desktop">
                    <div className="item-details">
                      <img src={item.imageUrl} alt="" className="cart-image" />
                      <h1 className="item-name">{item.name}</h1>
                    </div>
                    <div className="buttons-container">
                      <button
                        data-testid="decrement-quantity"
                        type="button"
                        className="minus-icon-container"
                        onClick={() => this.decreaseCartItemQuantity(item.id)}
                        aria-label="Decrement Count"
                      >
                        <HiOutlineMinusSm />
                      </button>
                      <p className="item-quantity" data-testid="item-quantity">
                        {item.quantity}
                      </p>
                      <button
                        data-testid="increment-quantity"
                        type="button"
                        className="plus-icon-container"
                        onClick={() => this.increaseCartItemQuantity(item.id)}
                        aria-label="Increment Count"
                      >
                        <BsPlus className="plus-icon" />
                      </button>
                    </div>
                    <p className="item-price">{item.cost}</p>
                  </div>
                </li>
              ))}
            </div>
            <div className="total-container">
              <h1 className="total-heading">Order Total :</h1>
              <div className="total-amount-and-confirm-button-container">
                <h1 className="total-amount" data-testid="total-price">
                  {totalAmount}.00
                </h1>
                <button
                  type="button"
                  className="place-order-button"
                  onClick={this.placeOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Function to render when the cart is empty
  cartEmpty = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625831743/cart-no-order_qivsro.png"
        alt="empty cart"
        className="empty-cart-image"
      />
      <h1 className="empty-cart-heading">No Order Yet!</h1>
      <p className="empty-cart-description">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button type="button" className="order-now-button">
          Order now
        </button>
      </Link>
    </div>
  )

  // Function to render when the payment is successful
  paymentSuccessful = () => (
    <div className="payment-success-container">
      <FaCheckCircle className="payment-success-icon" />
      <h1 className="payment-success-heading">Payment Successful</h1>
      <p className="payment-success-description">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button type="button" className="go-to-home-button">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  // Function to determine which components to render based on the cart status
  renderComponents = () => {
    const {cartStatus} = this.state

    switch (cartStatus) {
      case cartStatusConstants.cartItemsFound:
        return this.renderCartItems()
      case cartStatusConstants.noCartItems:
        return this.cartEmpty()
      case cartStatusConstants.paymentSuccess:
        return this.paymentSuccessful()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cart-container">
        <Header />
        {this.renderComponents()}
        <Footer />
      </div>
    )
  }
}

export default Cart
