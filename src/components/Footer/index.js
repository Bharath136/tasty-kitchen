import {
  FaInstagram,
  FaPinterestSquare,
  FaTwitterSquare,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const url =
  'https://res.cloudinary.com/dppqkea7f/image/upload/v1625978524/footer-icon_cs8bzb.png'

function Footer() {
  return (
    <div className="footer-container">
      <div className="log-heading">
        <img src={url} alt="website-footer-logo" className="footer-image" />
        <h1 className="main-heading">Tasty Kitchens</h1>
      </div>

      <p className="description">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="icons-container">
        <FaPinterestSquare className="icons" testid="pintrest-social-icon" />
        <FaInstagram className="icons" testid="instagram-social-icon" />
        <FaTwitterSquare className="icons" testid="twitter-social-icon" />
        <FaFacebookSquare className="icons" testid="facebook-social-icon" />
      </div>
    </div>
  )
}
export default Footer
