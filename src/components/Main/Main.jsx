import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './Home'
import New from './New'
import Details from './Details'

const Main = () => {
  return <main>
    <div className="pokemon"></div>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/New' element={<New />} />
      <Route path='/pokemon/:id' element={<Details />} />
      <Route path='/*' element={<Navigate to={'/'} />} />
    </Routes>
  </main>;
};
export default Main;
