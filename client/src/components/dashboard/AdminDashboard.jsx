import React, { useState } from "react";
import { API } from "../../service/api";
import { useEffect } from "react";
import "./AdminDashboard.css";
import User from "./users/User";
import Card from "../card/Card";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [posts, setPosts] = useState([]);

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
        <h1>Admin Dashboard</h1>
        <div className="admincontainer">
          <div className="columns">
            <div className="unapproved-posts col1">
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
              <h2>Manage Users</h2>
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
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
