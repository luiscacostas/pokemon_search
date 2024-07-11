import React from "react";
import Nav from "./Nav"
import logo from '../../assets/pokemon-23-logo.png'

const Header = () => {
  return <header className="header">
    <div>
      <img src={logo} alt="logo pokemon" />
    </div>
      <Nav />
  </header>;
};

export default Header;