import React from "react"
import composeLogo from "../images/jetpack-compose.svg"

const ComposeLogo = () => {
  return (
    <img
      src={composeLogo}
      alt="Compose"
      style={{
        display: "inline-block",
        height: "0.8em",
        verticalAlign: "middle",
        marginRight: "0.2em",
        marginBottom: "0.1em",
      }}
    />
  )
}

export default ComposeLogo
