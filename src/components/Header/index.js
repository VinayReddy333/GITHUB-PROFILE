import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = () => {
  return (
    <nav className="nav">
      <div className="content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/" className="nav-link">
            <h1 className="heading">GITHUB PROFILE VISUALIZER</h1>
          </Link>
        </div>

        <div className="nav-bar-large-container">
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/Repositories" className="nav-link">
                Repositories
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/Analysis" className="nav-link">
                Analysis
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
