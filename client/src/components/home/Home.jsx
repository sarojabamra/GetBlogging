import React from "react";
import "./Home.css";
import "../blogs/Blogs.css";
import { Link } from "react-router-dom";

import Blogs from "../blogs/Blogs";

const Home = () => {
  return (
    <div>
      <div className="bg">
        <div className="home">
          <div className="home-container">
            <div className="line" />
            <h2>GetBlogging</h2>
            <p>
              Welcome to GetBlogging, your go-to destination for fresh ideas,
              insightful stories, and expert advice on a variety of topics.
              Whether you're passionate about technology, health, travel, or
              lifestyle, we've got something for everyone.
            </p>
            <p>
              Ready to explore? Browse our latest posts, discover new topics,
              and let your curiosity lead you to new adventures. Happy reading!
            </p>
            <div className="buttons">
              <Link to="/blogs" className="link">
                <button className="white-fill">
                  Check out our Latest Blogs!
                </button>
              </Link>
              <Link to="/signup">
                <button className="white-outline">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
