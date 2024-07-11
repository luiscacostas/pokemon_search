import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './Home'
import New from './New'
import Details from './Details'

const Main = () => {
  return <main className="contenedor">
    <div class="pokemon"></div>
    <article className="contenido-unitario">
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/New' element={<New />} />
      <Route path='/pokemon/:id' element={<Details />} />
      <Route path='/*' element={<Navigate to={'/'} />} />
    </Routes>
    </article>
  </main>;
};

export default Main;
