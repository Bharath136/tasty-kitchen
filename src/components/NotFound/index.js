import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const notFoundUrl =
  'https://res.cloudinary.com/dppqkea7f/image/upload/v1625830262/NotFound_kpncbm.png'
const NotFound = () => (
  <div className="not-found-main-container">
    <Header />
    <div className="not-found-container">
      <img src={notFoundUrl} alt="not found" />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button type="button" className="home-button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
