import React, { useState, useContext, useEffect } from "react";
import "./Comments.css";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  username: "",
  postComment: "",
  postId: "",
  date: new Date(),
};

const Comments = ({ post, isAuthenticated }) => {
  const [comment, setComment] = useState(initialValues);
  const { account } = useContext(DataContext);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.name,
      username: account.username,
      postId: post._id,
      postComment: e.target.value,
    });
  };

  const addComment = async (e) => {
    if (isAuthenticated) {
      if (!comment.postComment) {
        alert("The comment box should not be empty.");
        return;
      } else {
        let response = await API.newComment(comment);
        if (response.isSuccess) {
          setComment(initialValues);
          setToggle((prevState) => !prevState);
        }
      }
    } else {
      navigate("/signin");
    }
  };

  useEffect(() => {
    const getData = async () => {
      let response = await API.getAllComments(post._id);

      if (response.isSuccess) {
        setComments(response.data);
      }
    };
    if (post._id) {
      getData();
    }
  }, [post, toggle]);

  return (
    <>
      <div className="commentsection">
        <div className="writecomment">
          <div className="commentbox">
            <div className="row">
              <textarea
                placeholder="What do you think about this post? Leave a comment..."
                value={comment.postComment}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="hr" />
            <div className="commentbtn">
              <button onClick={() => addComment()}>Comment</button>
            </div>
          </div>
        </div>
      </div>
      <div className="commentscontainer">
        <div className="commentsdiv">
          <div className="comments">
            {Array.isArray(comments) &&
              comments.length > 0 &&
              comments
                .slice()
                .reverse()
                .map((comment) => (
                  <Comment comment={comment} setToggle={setToggle} />
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
