import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemon, setPokemon }) => {
  
  useEffect(() => {
    const getAllPokemon = async () => {
      try {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`);
        const data = await resp.json();
        const allPokemons = data.results;

        const pokemonsData = await Promise.all(
          allPokemons.map(async (pokemon) => {
            const resp = await fetch(pokemon.url);
            const dataPokemon = await resp.json();
            return dataPokemon;
          })
        );
        console.log(pokemonsData)
        setPokemon(pokemonsData);
        
      } catch (error) {
        console.error("Error fetching pokemon data:", error);
      }
      
    };
    getAllPokemon();
  }, [setPokemon]);

  const paintPokemon = () => {
    return pokemon.map((dataItem) => (
      <PokemonCard
        key={uuidv4()}
        dataItem={dataItem}
        dataImg={dataItem.sprites.other['official-artwork']}
      />
    ));
  };

  return (
    <article className='contenedor-list'>
      {pokemon.length !== 0 ? paintPokemon() : <p>Cargando...</p>}
    </article>
  );
};

export default PokemonList;