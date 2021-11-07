import './App.css'
import Landing from './Components/LandingPage/Landing'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from './Components/GamePage/Game'
import UserInfo from './Components/UserInfo/UserInfo'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/game" component={Game}/>
        <Route exact path="/userinfo" component={UserInfo}/>
        <Route exact path="/" component={Landing}/>
      </Switch>
    </Router>  
  )
}

export default App
