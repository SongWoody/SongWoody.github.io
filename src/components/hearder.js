import React from "react"
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"
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
                        alt="Logo picture"
                    />
                    <span className="site-title">{title}</span>
                </Link>
                <MenuButton isOpen={isMenuOpen} toggleMenu={toggleMenu} />
            </header>
        </div>
    )
}

export default Header