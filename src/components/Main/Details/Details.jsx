// DetallePokemon.jsx
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const DetailsPokemon = () => {
  
  //const {id} = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const name = queryParams.get('name');
  const image = queryParams.get('image');
  const typeOne = queryParams.get('typeOne');
  const weight = queryParams.get('weight')
  const height = queryParams.get('height')
  const stats = queryParams.get('stats');
  const statsValues = JSON.parse(stats).map((object)=>object.base_stat)
  const statsNames = JSON.parse(stats).map((object)=>object.stat.name)

  console.log(statsValues)
  console.log(statsNames)

  if (!name || !image || !typeOne) {
    return <p>Invalid Pokemon details</p>;
  }

  return (<article className={`card_details ${typeOne}`}>
    <section className="card-header">
      <h3>{name}</h3>
      <span className="card-stat">{statsNames[0]}: {statsValues[0]}</span>
    </section>
    <div className="card-image">
      <img src={image} alt={name}/>
    </div>
    <div className="card-info">
      <span>Peso: {weight/10} kg | Altura: {height/10} m</span>
      <span className={`card-type ${typeOne}`}>{typeOne}</span>
    </div>
    <div className="card-stats">
      <div className="stat">
        <p>{statsNames[0]}</p>
        <progress value={statsValues[0]} max={100}></progress>
      </div>
      <div className="stat">
        <p>{statsNames[1]}</p>
        <progress value={statsValues[1]} max={100}></progress>
      </div>
      <div className="stat">
        <p>{statsNames[2]}</p>
        <progress value={statsValues[2]} max={100}></progress>
      </div>
    </div>
  </article>);
};

export default DetailsPokemon;