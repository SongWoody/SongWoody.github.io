import * as React from "react"

const Header = ({title}) => {
    return (
        <header style={headerStyle}>
            <h2>{title}</h2>
        </header>
    )
}

const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    backgroundColor: "#f8f9fa",
};

export default Header