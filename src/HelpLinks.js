import React from 'react';
import './App.css';

const HelpLinks = () => (
  <div className="help-container">
      <div className="help-container--left">
        <a href="https://doc.partoo.fr/rest_api/authorize.html#authorizing">Generating user token</a>
      </div>
      <div className="help-container--right">
        <div>
          <a href="https://doc.partoo.fr/rest_api/index.html">REST API</a>
        </div>
        <div>
          <a href="https://doc.partoo.fr/js_api/index.html">JS API</a>
        </div>
      </div>
  </div>
);

export default HelpLinks;
