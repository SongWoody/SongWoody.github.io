import React from "react"
import { Link } from "gatsby"
import { useSidebar } from "./sidebarContext"
import "./sidebarStyle.css"

const Sidebar = () => {
  const { isMenuOpen, toggleMenu } = useSidebar();

  return (
    <aside className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={toggleMenu} aria-label="Close Menu">
        <span className="close-icon"></span>
      </button>
      <div className="sidebar-content">
        <h4>Menu</h4>
        <ul>
          <li><Link to="/spring">Spring Boot</Link></li>
          <li><Link to="/android">Android</Link></li>
          <li><Link to="/javascript">JavaScript</Link></li>
          {/* 필요 시 추가 */}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar