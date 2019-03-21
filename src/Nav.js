import React, { Component } from 'react';
import './App.css';
import CallbacksNavItem from './CallbacksNavItem';
import NavItem from './NavItem';
import { OVERRIDEABLE_ACTIONS, PAGES } from './data';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: this.props.initialPage };
  }
  
  navigateTo(page) {
    this.props.partoo.navigate(page);
    this.setState({ ...this.state, currentPage: page });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand">Partoo</div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {Object.entries(PAGES).map(([page, label]) => (
              <NavItem label={label} active={this.state.currentPage === page} onClick={() => this.navigateTo(page)} />  
            ))}
            {OVERRIDEABLE_ACTIONS[this.state.currentPage] &&
              <CallbacksNavItem
                partoo={this.props.partoo}
                actions={OVERRIDEABLE_ACTIONS[this.state.currentPage]}
                pageLabel={PAGES[this.state.currentPage]}
              />}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
