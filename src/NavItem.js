import React from 'react';

const NavItem = ({ active, onClick, label }) =>  (
  <li className={active ? "nav-item active": "nav-item"}>
    <div className="nav-link" onClick={onClick}>{label}</div>
  </li>
)
export default NavItem;
