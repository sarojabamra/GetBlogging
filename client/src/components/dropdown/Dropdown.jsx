import React, { useState } from "react";
import "./Dropdown.css";
import { categories } from "../../constants/categories";

const Dropdown = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);
  const options = categories.map((category) => category.type);

  return (
    <>
      <div className="dropdown">
        <div className="select" onClick={() => setIsActive(!isActive)}>
          <span className="dropdownbtn">{selected || "Category"}</span>
          <div className="caret"></div>
        </div>
        {isActive && (
          <ul className="dropdowncontent">
            {options.map((option) => (
              <li
                key={option}
                className="dropdownitem"
                onClick={() => {
                  setSelected(option);
                  setIsActive(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Dropdown;
