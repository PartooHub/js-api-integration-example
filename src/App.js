import React, { Component } from 'react';
import './App.css';

const OVERRIDEABLE_ACTIONS = [
  'open_business',
  'lab_create',
  'lab_results_received',
  'subscribe',
  'business_created',
  'error',
  'no_eligible_business_click',
  'pm_view_go_to_edit_click',
  'pm_view_go_to_partner_connection_click',
  'no_business_click',
  'lab_sign_up_button',
  'lab_login_button',
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      enabled: false,
      userToken: '',
      isLoggedIn: false,
    };
    this.partoo = null;
  }

  logUser() {
    this.partoo = Partoo.init('partoo-container'); // eslint-disable-line
    this.partoo.login(this.state.userToken);
    this.setState({ ...this.state, isLoggedIn: true });
  }
  
  logout() {
    Partoo.destroy(() => this.setState({ ...this.state, isLoggedIn: false})); // eslint-disable-line
  }

  navigate(route) {
    this.partoo.navigate(route);
  }
  
  back() {
    this.partoo.back();
  }
  
  foward() {
    this.partoo.forward();
  }

  setCallback(action_name) {
    console.log(`Callback set for ${action_name}`);
    
    this.partoo.on(action_name, function(data) {
      console.log(`${action_name} CALLBACK called with data`, data);
    })
  }
  
  render() {
    return (
      <div className="App">
        {!this.state.isLoggedIn ? (
            <div className="App-Login">
              <input
                type="text"
                name="userToken"
                value={this.state.userToken}
                onChange={(event) => {
                  this.setState({ ...this.state, userToken: event.target.value})
                }}
              />
              <button onClick={() => this.logUser()}>Login</button>
            </div>
        ): (
          <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button type="button" className="btn btn-primary" onClick={() => this.navigate('add')}>Add a business</button>
            <button type="button" className="btn btn-primary" onClick={() => this.navigate('businesses')}>Business List</button>
            <button type="button" className="btn btn-primary" onClick={() => this.navigate('presenceManagement')}>Presence Management</button>
            <button type="button" className="btn btn-primary" onClick={() => this.navigate('reviewManagement')}>Review Management</button>
            <button type="button" className="btn btn-primary" onClick={() => this.navigate('partnerConnections')}>Partner Connection</button>
            <button type="button" className="btn btn-primary" onClick={() => this.navigate('lab')}>Lab</button>
            <button type="button" className="btn btn-primary" onClick={() => this.foward()}>Forward</button>
            <button type="button" className="btn btn-primary" onClick={() => this.back()}>Back</button>
            <button type="button" className="btn btn-primary" onClick={() => this.logout()}>Logout</button>
            <select onChange={(event) => this.setCallback(event.target.value)}>
              {OVERRIDEABLE_ACTIONS.map((action, index) => (
                <option value={action} key={index}>{action}</option>
              ))}
            </select>
          </div>
        )}
        <div id="partoo-container"></div>
      </div>
    );
  }
}

export default App;
