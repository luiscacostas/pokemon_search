import React, { useState, useEffect } from "react";
import defaultImg from '../../../../assets/404ERROR.jpg';

const Search = ({ setValue, setPokemon }) => {
  const [searchPokemon, setSearchPokemon] = useState([]);
  const [timeDebounce, setTimeDebounce] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value.trim();
    if (timeDebounce) {
      clearTimeout(timeDebounce);
    }
    if(value !== ''){
      setTimeDebounce(setTimeout(() => {
        fetchPokemon(value);
      }, 2000));
    }
  };

  const fetchPokemon = async (pokemonName) => {
    try {
      const resultadoBusqueda = searchPokemon.find((input)=>input.name === pokemonName)
    if(resultadoBusqueda){
      setPokemon([resultadoBusqueda])
    }else{
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (!resp.ok) {
        throw new Error("Pokemon not found");
      }
      const data = await resp.json();
      console.log('no he entrado')
      setPokemon([data]);
      setSearchPokemon([...searchPokemon, data])
      
    }  
    } catch (error) {
      console.error("Error fetching pokemon data:", error);
      setPokemon([
        { name: "Error 404", id: null, sprites: { other: { "official-artwork": { front_default: defaultImg } } } }
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pokemonName = e.target.pokemonName.value.trim();
    if(pokemonName === ''){
      setPokemon([
        { name: "Error 404", id: null, sprites: { other: { "official-artwork": { front_default: defaultImg } } } }
      ]);
    }else{
      setValue(pokemonName);
      fetchPokemon(pokemonName);
      e.target.pokemonName.value = '';
    }  
  };
 
  return (
    <article>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="name">Pokemon</label>
          <input type="text" name='pokemonName' id="name" onChange={handleChange} />
          <button type="submit">Buscar</button>
        </div>
      </form>
    </article>
  );
};

export default Search;