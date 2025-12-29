import React from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { SidebarProvider } from "./SidebarContext"
import SocialLink from "./SocialLink"

// TypeScript 인터페이스 정의
interface LayoutProps {
  location: {
    pathname: string
  }
  title: string
  children: React.ReactNode
}

const Layout = ({ location, title, children }: LayoutProps) => {
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
             
            </footer>
          </div>
          <Sidebar />
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Layout
