import React from "react"
import * as styles from "./MenuButton.module.css"

// TypeScript 인터페이스 정의
interface MenuButtonProps {
  isOpen: boolean
  toggleMenu: () => void
}

const MenuButton = ({ isOpen, toggleMenu }: MenuButtonProps) => {
  return (
    <button
      onClick={toggleMenu}
      className={`${styles.menuButton} ${isOpen ? styles.open : ""}`}
      aria-label="Toggle Menu"
      aria-expanded={isOpen}
    >
      <div className={`${styles.bar} ${styles.top}`} />
      <div className={`${styles.bar} ${styles.middle}`} />
      <div className={`${styles.bar} ${styles.bottom}`} />
    </button>
  )
}


export default MenuButton
