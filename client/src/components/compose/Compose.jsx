import React, { useState, useContext } from "react";
import "./Compose.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DataContext } from "../../context/DataProvider";
import Dropdown from "../dropdown/Dropdown";
import TagInput from "../tagInput/TagInput";
import { API } from "../../service/api";
import { DropzoneArea } from "material-ui-dropzone";

const initialPost = {
  title: "",
  description: "",
  username: "",
  name: "",
  category: "",
  tags: [],
  createdDate: new Date(),
  image: "",
};

const Compose = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");

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

    if (response.isSuccess) {
      navigate("/blogs");
    }
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await API.uploadFile(data);
        post.image = response.data;
      }
    };
    getImage();
  }, [file]);

  const handleFileChange = (files) => {
    console.log("Files changed:", files); // Add this line to log the files array
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  console.log(file);

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
              <p className="composepassage">
                Welcome to the Compose Page! Share your stories with us. Use the
                editor to add your content, add images, and include tags to
                enhance visibility. Hit 'Publish' to share your work with the
                world.
              </p>
              <p className="user">{account.username}</p>
              <p className="name">
                <span>Logged in as: </span>
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
          <div className="hr" />
          <div className="dropzone">
            <DropzoneArea
              onChange={handleFileChange}
              acceptedFiles={["image/*"]}
              maxFileSize={5000000}
              filesLimit={1}
              dropzoneText="Drag and drop an image here or click."
              previewGridProps={{
                container: { spacing: 1, direction: "row" },
                item: { xs: 12 },
                justify: "center",
              }}
              previewGridClasses={{ container: "dropzone-preview-container" }}
              classes={{
                icon: "custom-dropzone-icon-compose",
              }}
            />
          </div>
          <div className="text">
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
