import React, { useState, useContext } from "react";
import "./Compose.css";
import { useNavigate, useParams } from "react-router-dom";
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

const Edit = () => {
  const { id } = useParams();
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
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, [id]);

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

  const updatePost = async () => {
    if (!post.title || !post.description || !post.category) {
      alert("Title, Description, and Category are required.");
      return;
    }
    let response = await API.updatePost(post);

    if (response.isSuccess) {
      navigate(`/details/${id}`);
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
                placeholder="Give your Blog a Title..."
                name="title"
                value={post.title}
                onChange={(e) => handleChange(e)}
              />
              <p className="user">{account.username}</p>
              <div>
                <TagInput tags={post.tags} setTags={setTags} />
              </div>
            </div>
            <div className="btns">
              <div className="categorylist">
                <Dropdown
                  selected={post.category}
                  setSelected={setSelectedCategory}
                />
              </div>
              <div className="publish">
                <button onClick={() => updatePost()}>Update</button>
              </div>
            </div>
          </div>
          <div className="text">
            <div className="hr" />
            <textarea
              placeholder="Tell your story..."
              value={post.description}
              name="description"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
