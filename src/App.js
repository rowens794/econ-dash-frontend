import React, { Component } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import MetricPage from './components/MetricPage/MetricPage';
import { BrowserRouter as Router, Route } from "react-router-dom";


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
        <div>
          <Route exact path="/" component={Dashboard} />
          <Route path="/:id" component={MetricPage} />
        </div>
      </Router>
    );
  }
}

export default App;
