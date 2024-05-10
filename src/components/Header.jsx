import "../styles/Header.css";
import { Link } from "react-router-dom";

import React, { useState } from "react";

function Header({ user }) {
  return (
    <div className="header">
      <div className="header-left">
        <Link to={`/`}>
          <button className="home-btn bold">Home</button>
        </Link>
      </div>
      <div className="header-center">
        <Link to={`/articles`} className="link">
          <h1 className="header-title">NC NEWS</h1>
        </Link>
      </div>

      <div className="header-right">
        {user ? (
          <Link to={`/`}>
            <img src={user.avatar_url} alt="user icon" className="user-icon" />{" "}
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
