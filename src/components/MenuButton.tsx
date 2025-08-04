import React from "react"
import "./menuButtonStytle.css"

// TypeScript 인터페이스 정의
interface MenuButtonProps {
  isOpen: boolean
  toggleMenu: () => void
}

const MenuButton = ({ isOpen, toggleMenu }: MenuButtonProps) => {
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


export default MenuButton
