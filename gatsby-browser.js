// custom typefaces
import "@fontsource-variable/montserrat"
import "@fontsource/merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"

import React from "react";
import { SidebarProvider } from "./src/components/sidebarContext";

export const wrapRootElement = ({ element }) => (
  <SidebarProvider>{element}</SidebarProvider>
);