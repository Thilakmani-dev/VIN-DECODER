import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import './App.css';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import InitialPage from './components/InitialPage';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

function App() {
  return (
    <Router>
      <Switch>
              <Route exact path="/" component={InitialPage} />
              <PublicRoute path="/login" component={LoginPage} />
              <PrivateRoute path="/home" component={HomePage} />
            </Switch>
    </Router>
  );
}

export default App;
