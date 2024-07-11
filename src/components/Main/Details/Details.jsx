// DetallePokemon.jsx
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";


const DetailsPokemon = () => {
  
  const {id} = useParams();
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
    <section>
      <h3>{name}</h3>
      <span>{statsNames[0]} {statsValues[0]}</span>
    </section>
    <div>
      <img src={image} alt={name}/>
    </div>
    <div>
      <span>Peso:{weight/10}kg Altura{height/10}m</span>
      <span>{typeOne}</span>
    </div>
    <div>
    <p>{statsNames[0]}</p><progress value={statsValues[0]} max={100} />
    <p>{statsNames[1]}</p><progress value={statsValues[1]} max={100} />
    <p>{statsNames[2]}</p><progress value={statsValues[2]} max={100} />
    </div>
  </article>);
};

export default DetailsPokemon;