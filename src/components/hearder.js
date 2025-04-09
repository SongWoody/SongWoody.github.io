import React from "react"
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"
import PropTypes from "prop-types"
import MenuButton from "./menuButton"
import { useSidebar } from "./sidebarContext";
import "./headerStyle.css"

const Header = ({ title, rootPath }) => {
    const { isMenuOpen, toggleMenu } = useSidebar();

    return (
        <div className="header-wrapper">
            <header className="header">
                <Link to={rootPath} className="logo-link">
                    <StaticImage
                        className="logo-image"
                        layout="fixed"
                        formats={["auto", "webp", "avif"]}
                        src="../images/nini_woody_15.png"
                        width={38}
                        height={25}
                        quality={95}
                        alt="Logo"
                    />
                    <span className="site-title">{title}</span>
                </Link>
                <MenuButton 
                    isOpen={isMenuOpen} 
                    toggleMenu={toggleMenu} 
                />
            </header>
        </div>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    rootPath: PropTypes.string.isRequired,
};

export default Header