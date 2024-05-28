import React from "react";
import "./Home.css";
import "../blogs/Blogs.css";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import { API } from "../../service/api";

import { categories } from "../../constants/categories";
import { useState } from "react";
import { useEffect } from "react";
import Tag from "../tag/Tag";

const Home = ({ isAuthenticated }) => {
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const filterPosts = (post) => {
    if (!post || !post.title || !post.username || !post.name) {
      return false;
    }
    const titleMatch = post.title
      .toLowerCase()
      .includes(searchTitle.toLowerCase());
    const userMatch =
      post.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      post.username.toLowerCase().includes(searchUser.toLowerCase());
    const categoryMatch = selectedCategory
      ? post.category === selectedCategory
      : true;

    const tagMatch = selectedTag ? post.tags.includes(selectedTag) : true;
    return titleMatch && userMatch && categoryMatch && tagMatch;
  };

  const handleCategoryClick = (categoryType) => {
    setSelectedCategory(categoryType);
    setSelectedTag("");
    window.scrollTo({ top: 700, behavior: "smooth" });
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setSelectedCategory("");
    window.scrollTo({ top: 700, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllPosts();
      if (response.isSuccess) {
        setPosts(response.data);
      }
    };
    fetchData();
  }, []);

  const allTags = posts.reduce((acc, post) => acc.concat(post.tags), []);
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
        <div className="searchbar">
          <form className="search-title">
            <input
              placeholder="Search by Title..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
            <button>Search...</button>
          </form>
        </div>
        <div className="recentblogs">
          <div className="blogsection">
            <div className="columns">
              <div className="column1">
                {posts && posts.length > 0 ? (
                  posts
                    .filter(filterPosts)
                    .slice()
                    .reverse()
                    .map((post) => (
                      <Link to={`/details/${post._id}`}>
                        <Card
                          post={post}
                          searchTitle={searchTitle}
                          searchUser={searchUser}
                        />
                      </Link>
                    ))
                ) : (
                  <div className="nodata">No Blogs available to display.</div>
                )}
              </div>
              <div className="column2">
                <form>
                  <input
                    placeholder="Search by author"
                    value={searchUser}
                    className="inputuser"
                    onChange={(e) => setSearchUser(e.target.value)}
                  />
                </form>

                <div className="write">
                  <div>
                    <p>Write your own Blog!</p>
                    <h3>Start Composing...</h3>
                  </div>
                  <div>
                    <Link to={isAuthenticated ? `/compose` : `/signin`}>
                      <button>Compose</button>
                    </Link>
                  </div>
                </div>
                <div className="hr" />
                <div className="recent">
                  <p> What's new?</p>
                  <h3>Recent Blogs</h3>
                  <div className="recentsection">
                    {posts
                      .slice()
                      .reverse()
                      .slice(0, 3)
                      .map((post) => {
                        const dateWithoutTime = post.createdDate.split("T")[0];
                        return (
                          <Link to={`/details/${post._id}`}>
                            <div className="recents">
                              <h4>{post.title}</h4>
                              <p>
                                {post.username} • <span>{dateWithoutTime}</span>
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                  <div className="hr" />
                </div>
                <div className="categories">
                  <p> Discover by Topic</p>
                  <h3>Categories</h3>
                  <div className="categorylist">
                    {categories.map((category) => (
                      <div
                        className="categorytype"
                        key={category.id}
                        onClick={() => handleCategoryClick(category.type)}
                        style={{
                          fontWeight:
                            category.type === selectedCategory
                              ? "bold"
                              : "normal",
                        }}
                      >
                        <p>{category.type}</p>
                      </div>
                    ))}
                  </div>
                  <div className="hr" />
                </div>
                <div className="tags">
                  <p> Explore by Tags</p>
                  <h3>Popular Tags</h3>
                  <div className="tagsList">
                    {allTags
                      .slice()
                      .reverse()
                      .slice(0, 15)
                      .map((tag) => (
                        <div
                          className="individualTag"
                          key={tag.id}
                          onClick={() => handleTagClick(tag)}
                        >
                          <p>
                            <Tag tag={tag} />
                          </p>
                        </div>
                      ))}
                  </div>
                  <div className="hr" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
