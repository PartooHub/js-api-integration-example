import React, { Component } from 'react';
import './App.css';
import LoginForm from './LoginForm';
import Nav from './Nav';

class App extends Component {
  constructor() {
    super();
    this.state = { isLoggedIn: false };
    this.partoo = null;
  }

  pages = {
    businesses: 'Business List',
    add: 'Add a business',
    partnerConnections: 'Partner Connection',
    presenceManagement: 'Presence Management',
    reviewManagement: 'Review Management',
    lab: 'Lab',
  };

  logUser(userToken) {
    this.partoo = Partoo.init('partoo-container'); // eslint-disable-line
    this.partoo.login(userToken);
    this.setState({ ...this.state, isLoggedIn: true });
  }
  
  logout() {
    Partoo.destroy(() => this.setState({ ...this.state, isLoggedIn: false})); // eslint-disable-line
  }

  componentWillUnmount() {
    Partoo.destroy(); // eslint-disable-line
  }

  render() {
    return (
      <div className="App">
        {!this.state.isLoggedIn ? <LoginForm onSubmit={(userToken) => this.logUser(userToken) }/> : <Nav partoo={this.partoo} initialPage="businesses" />}
        <div id="partoo-container"></div>
      </div>
    );
  }
}

export default App;
