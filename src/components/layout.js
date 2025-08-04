import React from "react"
import PropTypes from "prop-types"
import Header from "./Header"
import Sidebar from "./sidebar"
import { SidebarProvider } from "./sidebarContext"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <SidebarProvider>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <Header title={title} rootPath={rootPath} />
        <div className="layout-container">
          <div className="inner-container">
            <main className="content">{children}</main>
            <footer>
              <a href="https://github.com/SongWoody" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </footer>
          </div>
          <Sidebar />
        </div>
      </div>
    </SidebarProvider>
  )
}

Layout.propTypes = {
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout
