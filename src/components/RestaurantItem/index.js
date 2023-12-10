import {Link} from 'react-router-dom'
import {TiStarFullOutline} from 'react-icons/ti'
import './index.css'

const RestaurantItem = props => {
  const {item} = props
  const {imageUrl, name, cuisine, id, userRating} = item
  const {rating, totalReviews} = userRating

  return (
    <Link
      to={`/restaurant/${id}`}
      style={{textDecoration: 'none'}}
      testid="restaurant-item"
    >
      <li className="restaurant-item">
        <img src={imageUrl} alt="restaurant" className="restaurant-image" />
        <div className="restaurant-details-container">
          <h1 className="restaurant-heading">{name}</h1>
          <p className="restaurant-cuisine">{cuisine}</p>
          <div className="restaurant-rating-container">
            <TiStarFullOutline className="star-icon" />
            <p className="rating-value">{rating}</p>
            <p className="rating-text">({totalReviews} Ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
