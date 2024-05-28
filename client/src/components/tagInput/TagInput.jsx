import React from "react";
import "./TagInput.css";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";

const TagInput = ({ tags, setTags }) => {
  const [tagValue, setTagValue] = useState("");

  const deleteTag = (val) => {
    let remainingTags = tags.filter((t) => t !== val);
    setTags(remainingTags);
  };

  const addTags = (e) => {
    if (tagValue && (e.key === "Enter" || e.key === ",")) {
      e.preventDefault(); // Prevent default behavior like form submission
      setTags([...tags, tagValue.trim()]); // Add trimmed tag value
      setTagValue(""); // Clear input field
    }
  };

  return (
    <>
      <div className="main">
        <div className="content">
          <div className="tagInput">
            {tags.map((item, index) => {
              return (
                <button onClick={() => deleteTag(item)} key={index}>
                  {item}
                  <span>
                    <div className="delete">
                      <IoIosClose />
                    </div>
                  </span>
                </button>
              );
            })}

            <input
              type="text"
              placeholder="Press enter to add tags..."
              value={tagValue}
              onChange={(e) => setTagValue(e.target.value)}
              onKeyDown={addTags}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TagInput;
