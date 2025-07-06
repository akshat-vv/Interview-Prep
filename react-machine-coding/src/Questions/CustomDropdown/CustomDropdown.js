import React, { useReducer, useRef, useState,useEffect } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

import "./dropdown.css";

const CustomDropdown = ({ options, onSelect, selectedItem }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  const handleOptionClick = (index) => {
    onSelect(options[index]);
    setDropdownOpen(false);
  };

  const handleKeyDown = (e) => {
    if (
      !dropdownOpen &&
      (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")
    ) {
      e.preventDefault();
      setDropdownOpen(true);
      setActiveIndex(0);
    } else if (dropdownOpen) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => Math.min(prev + 1, options.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          handleOptionClick(activeIndex);
          break;
        case "Escape":
          setDropdownOpen(false);
          buttonRef.current.focus();
          break;
        default:
          break;
      }
    }
  };

  const handleToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    if (dropdownOpen && listRef.current) {
      listRef.current.focus();
    }
  }, [dropdownOpen]);

  return (
    <div className="dropdown-container">
      <button
        ref={buttonRef}
        aria-haspopup="listbox"
        aria-expanded={dropdownOpen}
        className="dropdown-selection"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <span>{selectedItem ? selectedItem.name : "Select Option"}</span>
        {dropdownOpen ? <SlArrowUp /> : <SlArrowDown />}
      </button>
      {dropdownOpen && (
        <ul className="dropdown-options" ref={listRef}  role="listbox">
          {options.map((option, index) => {
            return (
              <li
                key={index}
                role="option"
                className="dropdown-item"
                style={{ background: activeIndex === index ? "#eee" : "#fff" }}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={()=>handleOptionClick(index)}
              >
                {option.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
