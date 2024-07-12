import React from "react";
import pokeballLogo from '../../assets/pokeball.png'

const Footer = () => {
  return <footer className="footer">
  <div className="footer-content">
      <img src={pokeballLogo} alt="Pokeball Logo" />
      <p>© 2024 Luis Carlos Acosta</p>
  </div>
</footer>
};

export default Footer;
