import React, { useState, useContext } from "react";
import "./Compose.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DataContext } from "../../context/DataProvider";
import Dropdown from "../dropdown/Dropdown";
import TagInput from "../tagInput/TagInput";
import { API } from "../../service/api";

const initialPost = {
  title: "",
  description: "",
  username: "",
  name: "",
  category: "",
  tags: [],
  createdDate: new Date(),
};

const Compose = () => {
  const [post, setPost] = useState(initialPost);

  const { account } = useContext(DataContext);

  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPost((prevPost) => ({
      ...prevPost,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    post.username = account.username;
    post.name = account.name;
  }, [account, post]);

  useEffect(() => {
    setPost((prevPost) => ({
      ...prevPost,
      category: selectedCategory,
    }));
  }, [selectedCategory]);

  const setTags = (newTags) => {
    setPost((prevPost) => ({
      ...prevPost,
      tags: newTags,
    }));
  };

  const savePost = async () => {
    if (!post.title || !post.description || !post.category) {
      alert("Title, Description, and Category are required.");
      return;
    }
    let response = await API.createPost(post);

    if (response.status === 201) {
      navigate("/blogs");
    }
  };

  return (
    <>
      <div className="compose">
        <div className="box">
          <div className="cols">
            <div className="col1">
              <input
                className="inputtitle"
                placeholder="Enter the title to your Blog here..."
                name="title"
                onChange={(e) => handleChange(e)}
              />
              <p className="user">{account.username}</p>
              <p className="name">
                <span>Author: </span>
                {post.name}
              </p>

              <div>
                <TagInput tags={post.tags} setTags={setTags} />
              </div>
            </div>
            <div className="btns">
              <div className="categorylist">
                <Dropdown
                  selected={selectedCategory}
                  setSelected={setSelectedCategory}
                />
              </div>
              <div className="publish">
                <button onClick={() => savePost()}>Publish</button>
              </div>
            </div>
          </div>
          <div className="text">
            <div className="hr" />
            <textarea
              placeholder="Share your thoughts with the world. Start typing..."
              name="description"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Compose;
