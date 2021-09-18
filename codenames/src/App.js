import './App.css'
import Landing from './Components/Landing'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from './Components/Game'
import UserInfo from './Components/UserInfo'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/Game" component={Game}/>
        <Route exact path="/UserInfo" component={UserInfo}/>
        <Route exact path="/" component={Landing}/>
      </Switch>
    </Router>  
  )
}

export default App
