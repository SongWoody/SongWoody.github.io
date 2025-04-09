import React from "react"
import PropTypes from "prop-types"
import "./menuButtonStytle.css"

const MenuButton = ({ isOpen, toggleMenu }) => {
  return (
    <button
      onClick={toggleMenu}
      className={`menu-button ${isOpen ? "open" : ""}`}
      aria-label="Toggle Menu"
      aria-expanded={isOpen}
    >
      <div className="bar top" />
      <div className="bar middle" />
      <div className="bar bottom" />
    </button>
  )
}

MenuButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default MenuButton
