### Pokémon App

Bienvenido a la Pokémon App, una aplicación que te permite explorar y gestionar Pokémon utilizando la PokeAPI. Puedes buscar Pokémon por nombre o ID, ver sus detalles, y crear tus propios Pokémon personalizados con estadísticas específicas.

####Características

- Carga inicial: Al iniciar la aplicación, se carga la PokeAPI con una cantidad limitada de Pokémon.
- Busca Pokémon por nombre o ID.
- La búsqueda se activa 2 segundos después de que se ingrese el último carácter en el campo de búsqueda.
- Si no se encuentra ningún Pokémon, se muestra una imagen por defecto.
- Muestra detalles adicionales de un Pokémon al seleccionarlo.
- Crea nuevos Pokémon con nombre, ID, estadísticas de ataque, defensa, salud, peso y altura.
# Instalación
- Clona este repositorio
```javascript
git clone https://github.com/tu-usuario/tu-repositorio.git
```

###Estructuración de Carpetas
```javascript
src/
├── assets/
│   └── images/
├── components/
│   ├── PokemonCard/
│   │   ├── PokemonCard.jsx
│   │   └── PokemonCard.scss
│   ├── SearchBar/
│   │   ├── SearchBar.jsx
│   │   └── SearchBar.scss
│   └── New/
│       ├── New.jsx
│       └── New.scss
├── context/
│   └── SearchContext.jsx
├── pages/
│   ├── Home/
│   │   ├── Home.jsx
│   │   └── Home.scss
│   └── Detail/
│       ├── Detail.jsx
│       └── Detail.scss
├── App.jsx
└── index.js
```
#####Uso de Context
Para abastecer a los diferentes componentes con el contexto de búsqueda, se usa SearchContext. A continuación se muestra cómo configurar y utilizar este contexto.

####Componentes
#####PokemonCard
```javascript
// src/context/SearchContext.jsx
import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchPokemon, setSearchPokemon] = useState([]);

  const updateSearch = (newPokemonList) => {
    setSearchPokemon(newPokemonList);
  };

  return (
    <SearchContext.Provider value={{ searchPokemon, updateSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
```javascript
// src/components/PokemonCard/PokemonCard.jsx
import React from "react";
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import './PokemonCard.scss';

const PokemonCard = ({ dataItem: { name, id, types=[], stats, weight, height }, dataImg: { front_default }}) => {
  const typeOne = types[0]?.type?.name || 'unknown';
  const statsData = JSON.stringify(stats);
  return (
    <Link to={`/pokemon/${id}?name=${name}&image=${front_default}&typeOne=${typeOne}&stats=${statsData}&weight=${weight}&height=${height}`}>
      <Card className={`custom-bg-color card ${typeOne}`} shadow="sm" isPressable onPress={() => console.log("item pressed")}>
        <CardBody className={`overflow-visible p-0`}>
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={name}
            className="w-full object-cover h-[140px]"
            src={front_default}
          />
        </CardBody>
        <CardFooter className="text-small justify-between design-text-p">
          <b>{name}</b>
          <p className="text-default-">{id}</p>
          <p className="text-default-">{typeOne}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PokemonCard;

```
####Search
```javascript
// src/components/SearchBar/SearchBar.jsx
import React, { useState, useEffect } from 'react';
import './SearchBar.scss';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(() => {
      onSearch(searchTerm);
    }, 2000));
  }, [searchTerm]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Busca por nombre o ID"
      className="search-bar"
    />
  );
};

export default SearchBar;



```
####Contribuciones
Las contribuciones son bienvenidas. Por favor, sigue los pasos a continuación:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-caracteristica).
Haz tus cambios.
Haz un commit de tus cambios (git commit -am 'Añadir nueva característica').
Haz push a la rama (git push origin feature/nueva-caracteristica).
Abre un Pull Request.

###Créditos
PokeAPI
Luis Carlos Acosta
```