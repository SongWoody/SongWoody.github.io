import * as React from "react"
import { Link } from "gatsby"
import Sidebar from "../components/sidebar"
import Header from "../components/hearder"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  console.log(`title: ${title}`)
  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <div className="layout-container">
        <div className="inner-container">
          <Header title={title}/>
          <main className="content" >{children}</main>
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
