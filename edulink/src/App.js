import React,{useState} from 'react'
import {Footer, Blog, Possiblity, Features, Header, Edulink, Featuresecondary, Sectors} from './containers'
import {CTA, Navbar, Brand} from './components'
import All_UniversitiesPage from './All_UniversitiesPage/MainPage';
import UniPage from './Single_UniversityPage/MainPage'

import './App.css'
import Test from './Test';
import Log from './Login/Log';
import Home from './Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => {



  const [login, setLogin] = useState(0);

  const handleDivClick = () => {
   setLogin(1);

  };

  return (
    <div className="App">
      <div className="gradient_bg">

      <BrowserRouter>

          <Routes>
            <Route path="/" exact element={<Home/>} />
          </Routes>
         <Footer />
      </BrowserRouter>

      </div>





    </div>
  )
}

export default App
