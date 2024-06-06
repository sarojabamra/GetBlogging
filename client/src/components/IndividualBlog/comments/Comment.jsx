import React from "react";
import "./Comments.css";

import { MdOutlineDeleteOutline } from "react-icons/md";
import { API } from "../../../service/api";
import { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";

const Comment = ({ comment, setToggle }) => {
  const dateWithoutTime = comment.date.split("T")[0];

  const { account } = useContext(DataContext);

  const removeComment = async () => {
    let response = await API.deleteComment(comment._id);
    if (response.isSuccess) {
      setToggle((prevState) => !prevState);
    }
  };

  return (
    <>
      <div className="individualComment">
        <div className="col1">
          <div className="commentInfo">
            <p className="name">{comment.name}</p>
            <p className="username">@{comment.username}</p>
            <p>•</p>
            <p className="date">{dateWithoutTime}</p>
          </div>
          <div className="commentContent">
            <p className="comment">{comment.postComment}</p>
          </div>
        </div>
        {comment.name === account.name && (
          <div className="col2 deletecomment">
            <MdOutlineDeleteOutline onClick={() => removeComment()} />
          </div>
        )}
      </div>
    </>
  );
};

export default Comment;
