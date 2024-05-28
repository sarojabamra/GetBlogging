import React from "react";
import "./Card.css";
import Tag from "../tag/Tag";
import Category from "../category/Category";
import { MdOutlineDateRange } from "react-icons/md";

import { addElipses } from "../../utils/common-utils";

const Card = ({ post, searchTitle, searchUser }) => {
  const titleMatch = post.title
    .toLowerCase()
    .includes(searchTitle.toLowerCase());
  const userMatch =
    post.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    post.username.toLowerCase().includes(searchUser.toLowerCase());

  if (!titleMatch || !userMatch) {
    return null;
  }
  const dateWithoutTime = post.createdDate.split("T")[0];
  return (
    <>
      <div className="card">
        <div className="title-row">
          <h2 className="title">{addElipses(post.title, 100)}</h2>
          <div>
            <Category category={post.category} />
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
