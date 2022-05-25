import React from "react";
import logo from "./logo.svg";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="navin">
        <img src={logo} width={50} alt="LOGO"></img>
        <h3>Covid Vizualizer</h3>
      </div>
    </nav>
  );
}
