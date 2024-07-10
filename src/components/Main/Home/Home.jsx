import React,{useState} from "react";

import PokemonList from "./List"
import Search from "./Search"

const Home = () => {
  const [value, setValue] = useState("pikachu");
  const [pokemon, setPokemon] = useState([]);
  return <section>
    <Search setValue={setValue} setPokemon={setPokemon} />
    <PokemonList pokemon={pokemon} setPokemon={setPokemon} />
  </section>;
};

export default Home;
