import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, isAdmin }) => {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <h1>GetBlogging</h1>
        </div>
        <div className="navbuttons">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/blogs">
            <p>Blogs</p>
          </Link>
          <Link to={isAuthenticated ? `/compose` : `/signin`}>
            <p>Compose</p>
          </Link>
          {isAdmin ? (
            <div>
              <Link to="/admin">
                <p>Dashboard</p>
              </Link>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {isAuthenticated ? (
          <div className="buttons">
            <Link to="/signin">
              <button className="filledbtn">Log out</button>
            </Link>
          </div>
        ) : (
          <div className="buttons">
            <Link to="/signin">
              <button className="outlinebtn">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="filledbtn">Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
