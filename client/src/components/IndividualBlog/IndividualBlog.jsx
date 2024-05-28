import React from "react";

import { API } from "../../service/api";

import { useState, useEffect, useContext } from "react";
import "./IndividualBlog.css";
import { Link, useNavigate, useParams } from "react-router-dom";

import { DataContext } from "../../context/DataProvider";
import Tag from "../tag/Tag";
import Category from "../category/Category";
import Comments from "./comments/Comments";

const IndividualBlog = ({ isAuthenticated }) => {
  const [post, setPost] = useState({});
  const { account } = useContext(DataContext);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return; // Skip fetching if id is undefined
        let response = await API.getPostById(id);
        if (response.isSuccess) {
          setPost(response.data);
        } else {
          console.log("Request failed:", response);
        }
      } catch (error) {
        console.log("There is an Error here:", error);
      }
    };
    fetchData();
  }, [id]);

  const deleteBlog = async () => {
    let response = await API.deletePost(post._id);
    if (response.isSuccess) {
      navigate("/blogs");
    }
  };

  return (
    <>
      <div className="details">
        <div className="box">
          <div className="cols">
            <div className="col1">
              <h1>{post.title}</h1>
              <p className="user">{post.username}</p>
              <p className="name">
                <span>Author: </span>
                {post.name}
              </p>

              <div className="tags-container">
                {Array.isArray(post.tags) &&
                  post.tags.map((tag, index) => (
                    <div className="tags" key={index}>
                      <Tag tag={tag} />
                    </div>
                  ))}
              </div>
            </div>

            {account.username === post.username ? (
              <div className="btns">
                <Link to={`/edit/${post._id}`}>
                  <div className="edit">
                    <button>Edit</button>
                  </div>
                </Link>
                <div className="deletebtn">
                  <button onClick={() => deleteBlog()}>Delete</button>
                </div>
              </div>
            ) : (
              <div className="btns">
                <div>
                  <Category category={post.category} />
                </div>
              </div>
            )}
          </div>
          <div className="text">
            <div className="hr" />
            <p className="description">{post.description}</p>
          </div>
        </div>
        <Comments post={post} isAuthenticated={isAuthenticated} />
      </div>
    </>
  );
};

export default IndividualBlog;
