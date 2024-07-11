import React, { useState, useEffect, useContext } from "react";
import defaultImg from '../../../../assets/404ERROR.jpg';
import {SearchContext} from '../../../../context/SearchContext'
import {ListContext} from '../../../../context/ListContext'


const Search = () => {
  const [timeDebounce, setTimeDebounce] = useState(0);
  const {searchPokemon, updateSearch} = useContext(SearchContext) //data
  const {pokemon, updateList} = useContext(ListContext)
  
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
      updateList([resultadoBusqueda])
    }else{
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (!resp.ok) {
        throw new Error("Pokemon not found");
      }
      const data = await resp.json();
      updateList([data]);
      updateSearch([...searchPokemon, data])
      
    }  
    } catch (error) {
      console.error("Error fetching pokemon data:", error);
      updateList([
        { name: "Error 404", id: null, sprites: { other: { "official-artwork": { front_default: defaultImg } } } }
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pokemonName = e.target.pokemonName.value.trim();
    if(pokemonName === ''){
      updateList([
        { name: "Error 404", id: null, sprites: { other: { "official-artwork": { front_default: defaultImg } } } }
      ]);
    }else{
      updateSearch(pokemonName);
      fetchPokemon(pokemonName);
      e.target.pokemonName.value = '';
    }  
  };

  return (
    <article>
      <form onSubmit={handleSubmit} className="form-search">
        <div>
          <input type="text" name='pokemonName' id="name" onChange={handleChange} placeholder="Busca un Pokemon..." />
          <button type="submit">Buscar</button>
        </div>
      </form>
    </article>
  );
};

export default Search;