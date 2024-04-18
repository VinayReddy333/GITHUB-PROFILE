import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import NotFound from './components/NotFound'
import ProfilePage from './components/ProfilePage'
import AnalysisItemDetails from './components/AnalysisItemDetails'
import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/:user/profile" component={ProfilePage} />
      <Route exact path="/:user/analysis" component={AnalysisItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
