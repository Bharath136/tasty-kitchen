import {Component} from 'react'
import {BsFilterLeft} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Counter from '../Counter/index'
import RestaurantItem from '../RestaurantItem'
import Header from '../Header'
import Footer from '../Footer'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const limit = 9

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const carouselApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const restaurantsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    carouselApiStatus: carouselApiStatusConstants.initial,
    restaurantApiStatus: restaurantsApiStatusConstants.initial,
    carousel: [],
    restaurants: [],
    selectedSortByValue: sortByOptions[1].value,
    activePage: 1,
    searchInput: '',
    loadFooter: false,
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.getCarousel()
    this.getRestaurants()
  }

  // Function to convert restaurant objects for consistency
  convertRestaurantObjects = object => {
    const converted = {
      costForTwo: object.cost_for_two,
      cuisine: object.cuisine,
      groupByTime: object.group_by_time,
      hasOnlineDelivery: object.has_online_delivery,
      hasTableBooking: object.has_table_booking,
      id: object.id,
      imageUrl: object.image_url,
      isDeliveringNow: object.is_delivering_now,
      location: object.location,
      menuType: object.menu_type,
      name: object.name,
      opensAt: object.opens_at,
      userRating: {
        rating: object.user_rating.rating,
        ratingColor: object.user_rating.rating_color,
        ratingText: object.user_rating.rating_text,
        totalReviews: object.user_rating.total_reviews,
      },
    }
    return converted
  }

  // Function to fetch carousel data
  getCarousel = async () => {
    this.setState({carouselApiStatus: carouselApiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({
        carouselApiStatus: carouselApiStatusConstants.success,
        carousel: data.offers,
      })
    }
  }

  // Function to fetch restaurant data
  getRestaurants = async () => {
    this.setState({
      restaurantApiStatus: restaurantsApiStatusConstants.inProgress,
    })
    const {selectedSortByValue, activePage, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const offset = (activePage - 1) * limit
    const restaurantsApiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${selectedSortByValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantsApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const {restaurants} = data
      const convertedRestaurants = restaurants.map(each =>
        this.convertRestaurantObjects(each),
      )
      this.setState({
        restaurantApiStatus: restaurantsApiStatusConstants.success,
        restaurants: convertedRestaurants,
        loadFooter: true,
      })
    } else if (response.ok === false) {
      this.setState({
        restaurantApiStatus: restaurantsApiStatusConstants.failure,
      })
    }
  }

  // Function to render carousel
  renderCarousel = () => {
    const {carousel} = this.state
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 700,
      infinite: true,
      dotsClass: 'slick-dots',
      autoplay: true,
      autoplaySpeed: 3000,
      adaptiveHeight: true,
    }
    return (
      <div className="carousel-container">
        <div className="container">
          <Slider {...settings}>
            {carousel.map(eachCarousel => (
              <img
                src={eachCarousel.image_url}
                alt={`offer-${eachCarousel.id}`}
                key={eachCarousel.id || eachCarousel.image_url}
                className="carousel-image"
              />
            ))}
          </Slider>
        </div>
      </div>
    )
  }

  // Function to handle page change
  onChangePage = id => {
    this.setState({activePage: id}, this.getRestaurants)
  }

  // Function to handle search input change
  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  // Function to handle sort by option change
  changeTheSortByOptionValue = event => {
    this.setState(
      {selectedSortByValue: event.target.value},
      this.getRestaurants,
    )
  }

  // Function to render restaurant items
  renderRestaurants = () => {
    const {restaurants, selectedSortByValue} = this.state
    return (
      <div className="restaurants-container">
        <div className="container">
          <div className="restaurants-header-container">
            <div className="restaurants-heading-container">
              <h1 className="restaurants-heading">Popular Restaurants</h1>
              <p className="restaurants-description">
                Select Your favourite restaurant special dish and make your day
                happy...
              </p>
            </div>
            <div className="restaurants-filter-container">
              <div className="restaurants-searchbar-container">
                <input
                  type="search"
                  onChange={this.onChangeSearchInput}
                  placeholder="Search Restaurant..."
                />
              </div>
              <div className="restaurants-sort-by-container">
                <BsFilterLeft size={25} />
                <p className="sort-text">Sort By</p>
                <select
                  id="sortBy"
                  onChange={this.changeTheSortByOptionValue}
                  value={selectedSortByValue}
                  className="sort-text"
                >
                  {sortByOptions.map(eachOption => (
                    <option key={eachOption.id}>
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <ul className="restaurants-list">
            {restaurants.map(restaurant => (
              <RestaurantItem key={restaurant.id} item={restaurant} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  // Function to render loader for restaurant data
  restaurantsLoader = () => (
    <div className="loader-container" data-testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // Function to render message when no restaurants are found
  emptyRestaurant = () => <div>No Restaurants Found!</div>

  // Function to render restaurant components based on API status
  renderRestaurantComponents = () => {
    const {restaurantApiStatus} = this.state
    switch (restaurantApiStatus) {
      case restaurantsApiStatusConstants.success:
        return this.renderRestaurants()
      case restaurantsApiStatusConstants.inProgress:
        return this.restaurantsLoader()
      case restaurantsApiStatusConstants.failure:
        return this.emptyRestaurant()
      default:
        return null
    }
  }

  // Function to render loader for carousel data
  renderCarouselLoader = () => (
    <div className="loader-container" data-testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // Function to render carousel components based on API status
  renderCarouselComponents = () => {
    const {carouselApiStatus} = this.state
    switch (carouselApiStatus) {
      case carouselApiStatusConstants.success:
        return this.renderCarousel()
      case carouselApiStatusConstants.inProgress:
        return this.renderCarouselLoader()
      default:
        return null
    }
  }

  render() {
    const {loadFooter} = this.state
    return (
      <div className="home-container">
        <Header />
        {this.renderCarouselComponents()}
        {this.renderRestaurantComponents()}
        <div className="pagination-container">
          <Counter onChangePage={this.onChangePage} />
        </div>
        {loadFooter && <Footer />}
      </div>
    )
  }
}

export default Home
