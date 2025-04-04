import React from "react"
import "./menuButtonStytle.css"

const MenuButton = ({ isOpen, toggleMenu }) => {
  return (
    <button
      onClick={toggleMenu}
      className={`menu-button ${isOpen ? "open" : ""}`}
      aria-label="Toggle Menu"
    >
      <div className="bar top"></div>
      <div className="bar middle"></div>
      <div className="bar bottom"></div>
    </button>
  )
}

export default MenuButton
