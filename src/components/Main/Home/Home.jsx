import React from "react";
import PokemonList from "./List"
import Search from "./Search"

const Home = () => { 
  return <section className="container">
    <Search />
    <PokemonList/>
  </section>;
};
export default Home;
