import React, { Component } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <Router>
        <Route exact path="/" component={Dashboard} />
      </Router>
    );
  }
}

export default App;
