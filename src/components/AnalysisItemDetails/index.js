import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CommitHistory from '../CommitHistory'
import LinearChart from '../LinearChart'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AnalysisItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.success, analysisInfo: {}}

  componentDidMount = () => {
    this.getAnalysisInfo()
  }

  onSuccessDataCollected = async analysisInfoData => {
    console.log(analysisInfoData)
    this.setState({
      analysisInfo: analysisInfoData,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dsqi87vu5/image/upload/v1713261500/vinay/qwejkp7ofxbaxeeqsfkf.jpg"
        alt=""
      />
      <p>No Repositories</p>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getAnalysisInfo = async () => {
    const {match} = this.props
    const {params} = match
    const {username} = params

    const analysisUrl = `https://apis2.ccbp.in/gpv/profile-summary/${username}`
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const response = await fetch(analysisUrl, {
      mode: 'no-cors',
    })
    // const analysisInfoData = await response.json();
    console.log(response)
    if (response.ok) {
      console.log(response)
      const analysisInfoData = await response.json()
      this.onSuccessDataCollected(analysisInfoData)
    } else {
      this.onFailureDataCollected(true)
    }
  }

  renderAnalysisView = () => (
    <>
      <LinearChart />
      <CommitHistory />
    </>
  )

  renderStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAnalysisView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderStatusView()}</div>
      </>
    )
  }
}

export default AnalysisItemDetails
