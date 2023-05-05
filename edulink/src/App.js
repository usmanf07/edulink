import React,{useState} from 'react'
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from './Login/Signin.js';

const App = () => {

  return (
    <div className="App">
      <div className="gradient_bg">
      
      <Router>
        <Routes>
        <Route path="/" element={<Signin/>}  />
        <Route path="/home" element={<Home/>}  />

        </Routes>
      </Router>
      </div>
    </div>
  )
}

export default App