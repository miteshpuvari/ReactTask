import { Route, useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, useLocation } from "react-router-dom";
import './App.css';

import Login from './Screen/Login/Login';
import Dashboard from './Screen/Dashboard/Dashboard';


export default function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Router>
    </div>
  );
}
