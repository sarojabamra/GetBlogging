import React, { useState } from "react";
import { API } from "../../service/api";
import { useEffect } from "react";
import "./AdminDashboard.css";
import { GrUserAdmin } from "react-icons/gr";
import User from "./users/User";
import Card from "../card/Card";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchUser, setSearchUser] = useState("");

  const filterUsers = (user) => {
    const userMatch =
      user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.username.toLowerCase().includes(searchUser.toLowerCase());

    return userMatch;
  };

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllUnapprovedPosts();
      if (response.isSuccess) {
        setPosts(response.data);
      }
    };
    fetchData();
  }, [toggle]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllUsers();
      if (response.isSuccess) {
        setUsers(response.data);
      }
    };
    fetchData();
  }, [toggle]);

  return (
    <>
      <div className="admin-page">
        <div className="admin-title">
          <GrUserAdmin className="icon" />
          <h1>Admin Dashboard</h1>
        </div>

        <div className="admincontainer">
          <div className="columns">
            <div className="unapproved-posts col1">
              <p className="adminpassage">
                Please review the pending posts below and approve those that
                adhere to our community guidelines. Ensure all content aligns
                with our standards before granting approval.
              </p>
              {posts && posts.length > 0 ? (
                posts
                  .slice()
                  .reverse()
                  .map((post) => (
                    <div key={post._id}>
                      <Card
                        post={post}
                        toggle={toggle}
                        setToggle={setToggle}
                        postId={post._id}
                      />
                    </div>
                  ))
              ) : (
                <div></div>
              )}
            </div>

            <div className="userslist col2">
              <p className="userlist">Users List</p>
              <h2>Manage/Remove Users</h2>
              <p className="userlistpassage">
                Manage user accounts by removing any that violate the code of
                conduct.
              </p>
              <form>
                <input
                  placeholder="Search by User"
                  value={searchUser}
                  className="inputuser"
                  onChange={(e) => setSearchUser(e.target.value)}
                />
              </form>
              {Array.isArray(users) && users.length > 0 ? (
                users
                  .filter(filterUsers)
                  .map((user) => (
                    <User key={user._id} user={user} setToggle={setToggle} />
                  ))
              ) : (
                <div className="nodata">No Users available to display.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
