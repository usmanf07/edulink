import React,{useState} from 'react'
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from './Login/Signin.js';
import Signup1 from './Login/Signup1.js';
import Log from './Login/Log'
const App = () => {

  return (
    <div className="App">
      <div className="gradient_bg">


{/* <Log/> */}



      
      <Router>
        <Routes>
        <Route path="/login" element={<Signin />}  />
        <Route path="/home" element={<Home />}  />
        <Route path="/Signup1" element={<Signup1 />}  />
        </Routes>
      </Router>
      </div>

    </div>
  )
}

export default App