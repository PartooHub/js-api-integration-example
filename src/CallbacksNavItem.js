import React, { Component } from 'react';
import './App.css';

class CallbacksNavItem extends Component {
  setCallback(action_name) {
    this.props.partoo.on(action_name, (callBackData) => {
      console.log(`${action_name} CALLBACK called with data`, callBackData);
    })
  }
  
  render() {
    return (
      <li className="nav-item dropdown">
        <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Callbacks (page: {this.props.pageLabel})
        </div>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          {this.props.actions.map((callback) => (
            <div
              key={callback}
              className="dropdown-item"
              onClick={() => (this.setCallback(callback))}
            >
              {callback}
            </div>
          ))}
        </div>
      </li>
    );
  }
}

export default CallbacksNavItem;
