import React, { useState } from "react";
import { API } from "../../service/api";
import "./SetAdmin.css";

const SetAdminPage = () => {
  const [userId, setUserId] = useState("");

  const makeAdmin = async () => {
    try {
      const response = await API.updateIsAdmin(JSON.stringify({ userId }));

      console.log(response);
      if (response.isSuccess) {
        alert("User updated to admin successfully");
        setUserId("");
      }
    } catch (error) {
      console.error("Error updating user to admin:", error.message);
      alert("Failed to update user to admin");
    }
  };

  const onInputChange = (e) => {
    setUserId(e.target.value);
  };

  return (
    <div className="setadmin-page">
      <div className="bg">
        <div className="form">
          <input
            placeholder="ID of user to promote to admin..."
            value={userId}
            type="text"
            onChange={onInputChange}
          />
          <button onClick={makeAdmin}>Make Admin</button>
        </div>
      </div>
    </div>
  );
};

export default SetAdminPage;
