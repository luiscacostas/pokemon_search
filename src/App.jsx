import { BrowserRouter } from 'react-router-dom'
import { useState } from 'react'
import { SearchContext } from './context/SearchContext'
import { ListContext } from './context/ListContext'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {
  const [searchPokemon, setSearchPokemon] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  

  const updateSearch = (newPokemon) => {
    setSearchPokemon(newPokemon);
  };
  const updateList = (newList) => {
    setPokemon(newList);
  };

  const searchPokemonData = { searchPokemon, updateSearch }
  const listPokemonData = { pokemon, updateList }
  return (
    <>
        <BrowserRouter >
          <Header/>
          <ListContext.Provider value={listPokemonData}>
          <SearchContext.Provider value={searchPokemonData}>
          <Main />
          </SearchContext.Provider>
          </ListContext.Provider>
        </BrowserRouter >
        <Footer />
    </>
  )
}

export default App
