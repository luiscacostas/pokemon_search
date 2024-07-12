import React, { useEffect, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PokemonCard from './PokemonCard';
import { ListContext } from '../../../../context/ListContext';
import ReactPaginate from 'react-paginate';

const PokemonList = () => {
  const { pokemon, updateList } = useContext(ListContext);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 50; 

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
        updateList(pokemonsData);
        
      } catch (error) {
        console.error("Error fetching pokemon data:", error);
      }
    };
    getAllPokemon();
  }, []);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const renderPokemon = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return pokemon.slice(startIndex, endIndex).map((dataItem) => (
      <PokemonCard
        key={uuidv4()}
        dataItem={dataItem}
        dataImg={dataItem.sprites.other['official-artwork']}
      />
    ));
  };

  return (
    <div className="pokemon-list-container">
      <div className="pokemon-list">
        <article className='contenedor-list contenedor'>
          {pokemon.length !== 0 ? renderPokemon() : <p>Cargando...</p>}
        </article>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(pokemon.length / itemsPerPage)}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination-container"
          pageClassName="pagination-item"
          activeClassName="active"
          previousClassName="pagination-previous"
          nextClassName="pagination-next"
        />
      </div>
    </div>
  );
};

export default PokemonList;