import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import FoodItem from '../FoodItem/index'
import Footer from '../Footer/index'

const restaurantsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    apiStatus: restaurantsApiStatusConstants.initial,
    restaurant: [],
    loadfooter: false,
  }

  componentDidMount() {
    // Fetch restaurant details when the component mounts
    this.getRestaurantDetails()
    // Scroll to the top of the page
    window.scrollTo(0, 0)
  }

  // Function to convert raw API data into a more structured format
  convertData = object => {
    const converted = {
      costForTwo: object.cost_for_two,
      cuisine: object.cuisine,
      foodItems: object.food_items.map(eachItem =>
        this.convertItemsData(eachItem),
      ),
      restaurantId: object.id,
      imageUrl: object.image_url,
      itemCount: object.items_count,
      location: object.location,
      name: object.name,
      opensAt: object.opens_at,
      rating: object.rating,
      reviewsCount: object.reviews_count,
    }
    return converted
  }

  // Function to convert food item data
  convertItemsData = foodArray => {
    const item = {
      cost: foodArray.cost,
      foodType: foodArray.food_type,
      id: foodArray.id,
      imageUrl: foodArray.image_url,
      name: foodArray.name,
      rating: foodArray.rating,
    }
    return item
  }

  // Function to fetch restaurant details from the API
  getRestaurantDetails = async () => {
    this.setState({apiStatus: restaurantsApiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const convertedData = this.convertData(data)
      this.setState({
        apiStatus: restaurantsApiStatusConstants.success,
        restaurant: convertedData,
        loadfooter: true,
      })
    }
  }

  // Function to render the details of the restaurant
  renderRestaurantDetails = () => {
    const {restaurant} = this.state
    const {
      costForTwo,
      name,
      restaurantId,
      cuisine,
      imageUrl,
      location,
      rating,
      reviewsCount,
    } = restaurant

    return (
      <div>
        <div className="restaurant-details-sub-container">
          <div className="container">
            <li className="restaurant-details-item" key={restaurantId}>
              <img
                src={imageUrl}
                alt="restaurant"
                className="restaurant-details-image"
              />
              <div className="restaurant-details-content-container">
                <h1 className="restaurant-details-name">{name}</h1>
                <p className="restaurant-details-cuisine">{cuisine}</p>
                <p className="restaurant-details-location">{location}</p>
                <div className="restaurant-details-rating-price-container">
                  <div className="restaurant-details-rating-container">
                    <div className="restaurant-details-icon-rating-container">
                      <AiFillStar size={20} />
                      <p className="rating">{rating}</p>
                    </div>
                    <p className="restaurant-details-rating-count">
                      {reviewsCount}+ Ratings
                    </p>
                  </div>
                  <div className="restaurant-details-rating-container">
                    <div className="restaurant-details-icon-rating-container">
                      <BiRupee size={20} />
                      <p className="rating">{costForTwo}</p>
                    </div>
                    <p className="restaurant-details-rating-count">
                      Cost for two
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </div>
        </div>
        {this.renderFoodItems()}
      </div>
    )
  }

  // Function to render the list of food items in the restaurant
  renderFoodItems = () => {
    const {restaurant} = this.state
    const {foodItems} = restaurant

    return (
      <div className="container">
        <ul className="food-items-list-container">
          {foodItems.map(eachItem => (
            <FoodItem key={eachItem.id} foodItem={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  // Function to render a loader while data is being fetched
  renderLoading = () => (
    <div className="loader-container" data-testid="restaurant-details-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // Function to determine which components to render based on the API status
  renderComponents = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case restaurantsApiStatusConstants.success:
        return this.renderRestaurantDetails()
      case restaurantsApiStatusConstants.inProgress:
        return this.renderLoading()
      case restaurantsApiStatusConstants.failure:
        return null
      default:
        return null
    }
  }

  render() {
    const {loadfooter} = this.state
    return (
      <div className="restaurant-details-main-container">
        <Header />
        {this.renderComponents()}
        {loadfooter && <Footer />}
      </div>
    )
  }
}

export default RestaurantDetails
