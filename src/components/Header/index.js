import {Component} from 'react'
import {Link} from 'react-router-dom'
import {IoReorderThreeSharp} from 'react-icons/io5'
import {MdCancel} from 'react-icons/md'
import Cookies from 'js-cookie'
import './index.css'

const navItems = [
  {
    id: 1,
    path: '/',
    name: 'Home',
  },
  {
    id: 2,
    path: '/cart',
    name: 'Cart',
  },
]

class Header extends Component {
  state = {
    showNavItems: false,
    activeNavId: 1,
  }

  onShowNavItems = () => {
    const {showNavItems} = this.state
    this.setState({showNavItems: !showNavItems})
  }

  onChangeNavId = id => {
    this.setState({activeNavId: id})
  }

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {showNavItems, activeNavId} = this.state

    return (
      <div className="header-container">
        <div className="container">
          <div className="header-items-container">
            <Link to="/" style={{textDecoration: 'none'}}>
              <div className="header-logo-container">
                <img
                  src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg"
                  alt="website logo"
                  className="header-logo"
                />
                <h1 className="header-logo-heading">Tasty Kitchens</h1>
              </div>
            </Link>
            <IoReorderThreeSharp
              size={30}
              onClick={this.onShowNavItems}
              className="icon"
            />

            <ul className="nav-items-container">
              {navItems.map(item => (
                <Link
                  className={`nav-link ${
                    item.id === activeNavId ? 'active' : ''
                  }`}
                  to={item.path}
                  key={item.id}
                  onClick={() => this.onChangeNavId(item.id)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                className="logout-button"
                type="button"
                onClick={this.onLogout}
              >
                Logout
              </button>
            </ul>
          </div>
          {showNavItems && (
            <ul className="nav-items-container-mobile">
              <div className="nav-items-container-2">
                {navItems.map(item => (
                  <Link
                    className={`nav-link ${
                      item.id === activeNavId ? 'active' : ''
                    }`}
                    to={item.path}
                    key={item.id}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  className="logout-button"
                  type="button"
                  onClick={this.onLogout}
                >
                  Logout
                </button>
              </div>
              <MdCancel onClick={this.onShowNavItems} size={30} />
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Header
