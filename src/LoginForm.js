import React, { Component } from 'react';
import './App.css';
import HelpLinks from './HelpLinks';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = { userToken: '' };
  }

  onSubmit() {
    if (this.state.userToken !== '') {
      this.props.onSubmit(this.state.userToken);
    }
  }

  onInput(event) {
    this.setState({ ...this.state, userToken: event.target.value});
  }

  render() {
    return (
      <div className="login-container">
        <div className="form-container">
          <div className="logo-container">
            <img src="partoo_logo.png" />
          </div>
          <div className="alert alert-primary" role="alert">
            JS API integration demo (<a href="https://sandbox.partoo.co/app">sandbox env</a>)
          </div>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter the user token"
                value={this.state.userToken}
                onChange={(event) => this.onInput(event)}
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={() => this.onSubmit()}>Submit</button>
          </form>
          <HelpLinks />
        </div>
      </div>
    );
  }
}

export default LoginForm;
