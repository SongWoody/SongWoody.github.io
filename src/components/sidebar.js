import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { useSidebar } from "./sidebarContext"
import "./sidebarStyle.css"

const MenuItem = ({ to, children }) => (
  <li>
    <Link to={to}>{children}</Link>
  </li>
);

MenuItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Sidebar = () => {
  const { isMenuOpen, toggleMenu } = useSidebar();

  return (
    <aside className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
      <button 
        className="close-button" 
        onClick={toggleMenu} 
        aria-label="Close Menu"
      >
        <span className="close-icon" />
      </button>
      <nav className="sidebar-content">
        <h4>Menu</h4>
        <ul>
          <MenuItem to="/spring">Spring Boot</MenuItem>
          <MenuItem to="/android">Android</MenuItem>
          <MenuItem to="/javascript">JavaScript</MenuItem>
          {/* 필요 시 추가 */}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar