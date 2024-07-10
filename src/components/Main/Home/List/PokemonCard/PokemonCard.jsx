import React from "react";

const PokemonCard = ({
  dataItem:{name, id},
  dataImg:{front_default}
}) => {
  return <article className="pokemon-card">
    <img src={front_default} alt="pokemon" />
    <div className="pokemon-info">
      <p className="pokemon-name">{name}</p>
    </div>
  </article>;
};

export default PokemonCard;
