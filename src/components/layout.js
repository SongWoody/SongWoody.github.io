import React from "react"
import Sidebar from "../components/sidebar"
import Header from "../components/hearder"

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

export default Layout
