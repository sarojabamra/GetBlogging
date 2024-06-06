import React from "react";
import "./User.css";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { API } from "../../../service/api";
import { FaUser } from "react-icons/fa";

const User = ({ user, setToggle }) => {
  const removeUser = async () => {
    let response = await API.deleteUser(user._id);
    if (response.isSuccess) {
      setToggle((prevState) => !prevState);
    }
  };

  return (
    <div className="userBox">
      <div className="individualUser">
        <div className="row">
          <FaUser className="icon2" />
          <div>
            <p className="name">{user.name}</p>
            <p className="username">username: {user.username}</p>
          </div>
        </div>

        <div>
          <div className="dltuser" onClick={() => removeUser()}>
            <MdOutlineDeleteOutline className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
