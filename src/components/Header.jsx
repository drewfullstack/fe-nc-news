import "../styles/Header.css";

import React, { useState } from "react";

function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <button className="home-btn">Home</button>
      </div>
      <div className="header-center">
        <h1 className="header-title">NC NEWS</h1>
      </div>
      <div className="header-right">
        <img src="user-icon.png" alt="user icon" className="user-icon" />
      </div>
    </div>
  );
}

export default Header;
