import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute'
import Login from "./components/Login";
// import Footer from './components/Footer';
import BubblePage from './components/BubblePage';
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={ Login } />
        <PrivateRoute path='/BubblePage' component={ BubblePage } />
      </div>
    </Router>
  );
}

export default App;
