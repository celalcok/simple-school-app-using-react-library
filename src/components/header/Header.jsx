import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../images/school_logo.png";

import "./header.css";
function Header() {
  return (
    <div className="header">
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="" className="navbar-brand-logo" />
            SCHOOL
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav vertical-menu">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/students">
                  Students
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teachers">
                  Teachers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/lessons">
                  Lessons
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/classes">
                  Classes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
