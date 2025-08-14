import React from 'react';
import LandingPages from './foody/pages/LandingPage';
import "./App.css"
import {Routes,Route} from 'react-router-dom'
import ProductMenu from './foody/components/ProductMenu';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/'element = {<LandingPages/>}/>
        <Route path='/products/:firmId/:firmName'element={<ProductMenu/>}/>
      </Routes>
     
    </div>
  )
}

export default App
