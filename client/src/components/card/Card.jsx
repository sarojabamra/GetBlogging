import React from "react";
import "./Card.css";
import Tag from "../tag/Tag";
import Category from "../category/Category";
import { MdOutlineDateRange } from "react-icons/md";
import { API } from "../../service/api";

import { addElipses } from "../../utils/common-utils";
import { Link } from "react-router-dom";

const Card = ({ post, searchTitle, searchUser, toggle, setToggle }) => {
  if (searchTitle || searchUser) {
    const titleMatch = post.title
      .toLowerCase()
      .includes(searchTitle.toLowerCase());
    const userMatch =
      post.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      post.username.toLowerCase().includes(searchUser.toLowerCase());

    if (!titleMatch || !userMatch) {
      return null;
    }
  }
  const dateWithoutTime = post.createdDate.split("T")[0];

  const approvePost = async (postId) => {
    let response = await API.approvePost(JSON.stringify({ postId }));
    if (response.isSuccess) {
      setToggle(!toggle); // Trigger re-fetching of data
    } else {
      console.error(response.msg); // Handle error appropriately
    }
  };

  return (
    <>
      <div className="card">
        <div className="title-row">
          <Link to={`/details/${post._id}`}>
            <h2 className="title">{addElipses(post.title, 100)}</h2>
          </Link>
          <div>
            {post.isApproved ? (
              <div>
                <Category category={post.category} />
              </div>
            ) : (
              <div>
                <button
                  onClick={() => approvePost(post._id)}
                  className="approve"
                >
                  Approve
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="posted-by">
          <p className="username">By {post.username}</p>
          <p className="name">{post.name}</p>
        </div>
        <div className="date-posted">
          <MdOutlineDateRange />
          <p className="date">{dateWithoutTime}</p>
        </div>
        <p className="description">{addElipses(post.description, 400)}</p>
        <div className="tags-container">
          {post.tags.map((tag, index) => (
            <div className="tags">
              <Tag tag={tag} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Card;
