import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  // Component state to manage username, password, error message, and error visibility
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
  }

  // Event handler for username input change
  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  // Event handler for password input change
  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  // Function to handle successful login
  loginSuccess = jwtToken => {
    const {history} = this.props
    // Set JWT token in Cookies with a 30-day expiration
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    // Redirect to the home page
    history.replace('/')
  }

  // Function to handle login failure
  loginFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  // Event handler for form submission
  onSubmit = async event => {
    event.preventDefault()
    const apiLoginUrl = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    // Send a POST request to the login API
    const response = await fetch(apiLoginUrl, options)
    console.log(response)
    // Parse the response data as JSON
    const data = await response.json()
    console.log(data)
    // Check if the response is OK (status code 200)
    if (response.ok === true) {
      // Handle successful login
      this.loginSuccess(data.jwt_token)
    } else {
      // Handle login failure
      this.loginFailure(data.error_msg)
    }
  }

  // Render the login form
  render() {
    const {username, password, errorMsg, showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-form-container">
          <div className="login-card-container">
            <div className="login-logo-heading-container">
              <img
                src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg"
                alt="website logo"
                className="login-logo"
              />
              <h1 className="login-logo-heading">Tasty Kitchens</h1>
            </div>
            <div className="mobile-image-container">
              <img
                src="https://res.cloudinary.com/ddgvegjgk/image/upload/v1635311318/tastykitchens/Rectangle_1457_ri10vf.png"
                alt="website login"
                className="login-image-mobile"
              />
            </div>
            <h1 className="login-heading">Login</h1>
            <form onSubmit={this.onSubmit} className="login-form">
              <div className="login-inputs-container">
                <label htmlFor="username" className="login-label">
                  USERNAME
                </label>
                <input
                  id="username"
                  type="text"
                  className="login-input"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="login-inputs-container">
                <label htmlFor="password" className="login-label">
                  PASSWORD
                </label>
                <input
                  id="password"
                  type="password"
                  className="login-input"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              {showErrorMsg && <p className="error-message">{errorMsg}</p>}
              <button className="login-button" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
        <img
          src="https://res.cloudinary.com/ddgvegjgk/image/upload/v1635315803/tastykitchens/Rectangle_1457_noyo6j.png"
          alt="website login"
          className="login-image-desktop"
        />
      </div>
    )
  }
}

export default Login
