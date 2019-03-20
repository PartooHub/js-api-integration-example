import React, { Component } from 'react';
import './App.css';

const OVERRIDEABLE_ACTIONS = {
  businesses: [
    'open_business',
    'subscribe',
  ],
  lab: [
    'lab_create',
    'lab_results_received',
    'lab_sign_up_button',
    'lab_login_button',
  ],
  add: [
    'business_created',

  ],
  edit: [
    'business_additional_info_updated',
    'business_address_updated',
    'business_contact_updated',
    'business_description_updated',
    'business_open_hours_updated',
  ],
  other: [
    'error',
    'no_eligible_business_click',
    'no_business_click',
    'pm_view_go_to_edit_click',
    'pm_view_go_to_partner_connection_click',
  ],
  partnerConnections: [],
  presenceManagement: [],
  reviewManagement: [],
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      enabled: false,
      userToken: '',
      isLoggedIn: false,
      callBackData: {},
    };
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

  logUser() {
    this.partoo = Partoo.init('partoo-container'); // eslint-disable-line
    this.partoo.login(this.state.userToken);
    this.setState({ ...this.state, isLoggedIn: true, currentPage: 'businesses' });
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
    this.setState({...this.state, callBackData: {}});
    
    this.partoo.on(action_name, (callBackData) => {
      console.log(`${action_name} CALLBACK called with data`, callBackData);
      this.setState({ ...this.state, callBackData })
    })
  }

  navigateTo(page) {
    this.partoo.navigate(page);
    this.setState({ ...this.state, currentPage: page });
  }

  getOverridableActions() {
    return OVERRIDEABLE_ACTIONS[this.state.currentPage] || [];
  }

  hasOverridableActions() {
    return this.getOverridableActions().length > 0;
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
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand">Partoo</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                {Object.entries(this.pages).map(([page, label]) => (
                    <li className={this.state.currentPage === page ? "nav-item active": "nav-item"}>
                      <div key={page} className="nav-link" onClick={() => this.navigateTo(page)}>{label}</div>
                    </li>
                ))}
                {this.hasOverridableActions() && (
                  <li class="nav-item dropdown">
                    <div class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Callbacks (page: {this.pages[this.state.currentPage]})
                    </div>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      {this.getOverridableActions().map((callback) => (
                        <div key={callback} class="dropdown-item" onClick={() => (this.setCallback(callback))}>{callback}</div>
                      ))}
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        )}
        <div id="partoo-container"></div>
      </div>
    );
  }
}

export default App;
