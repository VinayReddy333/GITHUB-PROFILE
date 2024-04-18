import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfilePage extends Component {
  state = {
    userData: '',
    apiStatus: apiStatusConstants.initial,
    isLoading: true,
  }

  componentDidMount = () => {
    this.getUserData()
  }

  onSuccessDataCollected = userData => {
    this.setState({
      userData: {
        avatarUrl: userData.avatar_url,
        name: userData.name,
        username: userData.login,
        bio: userData.bio,
        followers: userData.followers,
        following: userData.following,
        publicRepos: userData.public_repos,
        company: userData.company,
        companyUrl: userData.company_url,
        location: userData.location,
      },
      apiStatus: apiStatusConstants.success,
    })
  }

  getUserData = async () => {
    const {match} = this.props
    const {params} = match
    const {username} = params

    const url = await fetch(
      `https://apis2.ccbp.in/gpv/profile-details/${username}`,
    )
    const userData = await url.json()

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    if (url.ok === true) {
      this.onSuccessDataCollected(userData)
    } else {
      this.renderFailureView()
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dsqi87vu5/image/upload/v1713261500/vinay/qwejkp7ofxbaxeeqsfkf.jpg"
        alt=""
      />
      <p>No Repositories</p>
    </div>
  )

  renderProfile = () => {
    const {userData} = this.state

    const {
      avatarUrl,
      name,
      username,
      bio,
      followers,
      following,
      publicRepos,
      company,
      companyUrl,
      location,
    } = userData

    return (
      <div>
        <img src={avatarUrl} alt="avatar" />
        <p>{name}</p>
        <p>{username}</p>
        <p>{bio}</p>
        <div>
          <p>{followers}</p>
          <p>FOLLOWERS</p>
          <hr />
          <p>{following}</p>
          <p>FOLLOWING</p>
          <hr />
          <p>{publicRepos}</p>
          <p>PUBLIC REPOS</p>
          <hr />
          <p>Company</p>
          <p>{company}</p>
          <p>Company url</p>
          <p>{companyUrl}</p>
          <p>{location}</p>
          <p>Location</p>
        </div>
      </div>
    )
  }

  renderStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfile()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderStatusView()} 
      </div>
    )
  }
}

export default ProfilePage
