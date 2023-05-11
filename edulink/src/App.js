import React,{useState} from 'react'
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from './Login/Signin.js';
import Signup1 from './Login/Signup1.js';
import Log from './Login/Log'
import UniversityList from './UniversityList';
import AllUniversityPage from './All_UniversitiesPage/MainPage'
import SingleInstitutePage from './Single_UniversityPage/MainPage'
import Temp1 from './Temp2';
import AllUniversity from './AllUniversity';
import EditProfile from './EditProfile/EditProfile';
const App = () => {

  return (
    <div className="App">
      <div className="gradient_bg">

      <EditProfile/>
      {/* <Routes>
          <Route path='/EditProfile' element={<EditProfile/>}/>
           <Route path='/' element={<Home/>}/>
          <Route path='/:id/' element={<Home/>}/>
          <Route path='/login'  element={<Signin />}/>
          <Route path="/Signup1" element={<Signup1 />}  />
          <Route path="/AllUniversityPage" element={<AllUniversityPage />}  /> 
          <Route path="/AllUniversityPage" element={<AllUniversity />}  />

          <Route path="/SingleInstitutePage/:name" element={<SingleInstitutePage />}  />
          <Route path="/temp2" element={<Temp1 />}  />
          <Route path="/SignUp" element={<Log />}  /> 

      </Routes> */}


      </div>

    </div>
  )
}

export default App
