import React from "react"
import PropTypes from "prop-types"
import Header from "./hearder"
import Sidebar from "./sidebar"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Header title={title} rootPath={rootPath} />
      <div className="layout-container">
        <div className="inner-container">
          <main className="content">{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </footer>
        </div>
        <Sidebar />
      </div>
    </div>
  )
}

Layout.propTypes = {
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout
