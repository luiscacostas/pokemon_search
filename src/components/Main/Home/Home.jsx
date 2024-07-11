import React,{useState} from "react";
import PokemonList from "./List"
import Search from "./Search"


const Home = () => { 
  return <section className="contenedor">
    <Search />
    <PokemonList/>
  </section>;
};

export default Home;
