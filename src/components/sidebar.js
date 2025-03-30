import React from "react"
import { Link } from "gatsby"

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h4>Menu</h4>
      <ul>
        <li>Spring Boot</li>
        <li>Android</li>
        <li>JavaScript</li>
        {/* 필요 시 추가 */}
      </ul>
    </aside>
  )
}

export default Sidebar