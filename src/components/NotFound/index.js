import {withRouter} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NotFound = props => {
  const gotoBackPage = () => {
    const {history} = props
    history.goBack()
  }
  return (
    <>
      <div className="container">
        <Header />
        <img
          src="https://res.cloudinary.com/dsqi87vu5/image/upload/v1713010573/vinay/ualm6byut1cxpsrvql5e.jpg"
          alt="not found"
        />
        <h1>No Data FOUND</h1>
        <p>
          we are sorry, the page you requested could not be found Please go back
          to the homepage.
        </p>
        <button onClick={gotoBackPage} type="button">
          Go to Home
        </button>
      </div>
    </>
  )
}

export default withRouter(NotFound)
