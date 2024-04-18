import React, {Component} from 'react'
import Cookies from 'js-cookie'
import {HiOutlineSearch} from 'react-icons/hi'
import Header from '../Header'
import ProfilePage from '../ProfilePage'
import './index.css'

class Login extends Component {
  state = {username: '', isUsernameInvalid: false}

  onChangeUsername = event => {
    if (event.key === 'Enter') {
      this.usernameAuthentication()
    } else {
      this.setState({username: event.target.value, isUsernameInvalid: false})
    }
  }

  onSuccessAuthenticate = userData => {
    const {username} = this.state
    const {history} = this.props
    const {id} = userData
    Cookies.set('awt_token', id)
    history.replace(`/${username}/profile`)
  }

  onFailureAuthenticate = error => {
    this.setState({isUsernameInvalid: error, username: ''})
  }

  onClickButton = () => {
    const {history} = this.props
    history.push('Home')
  }

  usernameAuthentication = async () => {
    const {username} = this.state
    const url = `https://apis2.ccbp.in/gpv/profile-details/${username}`

    const response = await fetch(url)
    if (response.ok === true) {
      const userData = await response.json()
      this.onSuccessAuthenticate(userData)
    } else {
      this.onFailureAuthenticate(true)
    }
  }

  render() {
    const {isUsernameInvalid, username} = this.state
    return (
      <>
        <div className="container">
          <Header />
          <div className="input-container">
            <input
              placeholder="Enter GitHub username"
              type="text"
              value={username}
              onChange={this.onChangeUsername}
              onKeyPress={this.onChangeUsername}
              className="input"
            />
            <button
              type="button"
              onClick={this.usernameAuthentication}
              data-testid="searchButton"
            >
              <HiOutlineSearch className="search" />
            </button>
          </div>

          {isUsernameInvalid && (
            <div>
              <p>Enter a valid GitHub username</p>
              <img
                src="https://res.cloudinary.com/dsqi87vu5/image/upload/v1713266820/vinay/elofunzkjlsyjrm6sdit.png"
                alt=""
              />
              <p>Something went wrong. Please try again.</p>
              <button type="button" onClick={this.onClickButton}>
                Try Again
              </button>
            </div>
          )}

          {!isUsernameInvalid && (
            <div>
              <img
                src="https://res.cloudinary.com/dsqi87vu5/image/upload/v1713012895/vinay/wg7xr5ivsw5rvql1pa25.png"
                alt="github profile visualizer home page"
              />
            </div>
          )}
        </div>
      </>
    )
  }
}

export default Login
