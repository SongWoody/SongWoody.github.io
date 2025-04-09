import React from "react"
import { Link } from "gatsby"

const Header = ({ title, rootPath }) => {
    return (
        <div className="header-wrapper">
            <Link to={rootPath} className="header-link">
                {title}
            </Link>
        </div>
    )
}

export default Header