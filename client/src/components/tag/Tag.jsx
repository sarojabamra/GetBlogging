import React from "react";
import "./Tag.css";

const Tag = ({ tag }) => {
  return (
    <>
      <div className="tag">
        <p>#{tag}</p>
      </div>
    </>
  );
};

export default Tag;
