// custom typefaces
import "@fontsource-variable/montserrat"
import "@fontsource/merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"

import React from "react"
import { GatsbyBrowser } from "gatsby"
import { SidebarProvider } from "./src/components/SidebarContext"

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => (
  <SidebarProvider>{element}</SidebarProvider>
)