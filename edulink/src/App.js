import React,{useState} from 'react'
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from './Login/Signin.js';
import Signup1 from './Login/Signup1.js';
const App = () => {

  return (
    <div className="App">
      <div className="gradient_bg">
      
      <Router>
        <Routes>
        <Route path="/" element={<Signin />}  />
        <Route path="/home" element={<Home />}  />
        <Route path="/Signup1" element={<Signup1 />}  />
        </Routes>
      </Router>
      </div>
    </div>
  )
}

export default App