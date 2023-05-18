import React,{useState} from 'react'
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from './Login/Signin.js';
import Log from './Login/Log'
import UniversityList from './UniversityList';
// import AllUniversityPage from './All_UniversitiesPage/MainPage'
import SingleInstitutePage from './Single_UniversityPage/MainPage'
import Temp1 from './Temp2';
import AllUniversity from './AllUniversity';

import MainSignUp from './Login/MainSignUp';
import Mainpage from './UniversityDashBoard/Mainpage';

import EditProfile from './EditProfile/EditProfile';
import UserApplications from './UserApplications/UserApplications';
import PaymentPage from './PaymentPage/PaymentPage';

import OtpPage from './Login/otpPage';
import EntryTest from './EntryTest/EntryTest';
import OutsiderInstitute from './outsiderInstitutePage/OutsiderInstitute';
import AppliedStudents from './UniversityDashBoard/AppliedStudents'

import UniTest from './UniTest';

import { Navbar } from './components';
import TestList from './TestList';

import { Footer } from './containers';
import SingleText from './SingleText';


const App = () => {

  return (
    <div className="App">
      <div className="gradient_bg">
      <Navbar />
      <Routes>

          <Route path='/' element={<Home/>}/>
          <Route path='/:id/' element={<Home/>}/>
          <Route path='/login'  element={<Log />}/>

          <Route path='/UserApplications' element={<UserApplications/>}/>
          <Route path='/EditProfile' element={<EditProfile/>}/>
          <Route path="/EntryTest" element={<EntryTest />}  />
          <Route path='/Verify' element={<OtpPage/>}/>

          <Route path='/Payment' element={<PaymentPage/>}/>
          {/* <Route path="/AllUniversityPage" element={<AllUniversityPage />}  />  */}
          <Route path="/AllUniversityPage" element={<AllUniversity />}  />
          <Route path="/SingleInstitutePage/:name" element={<SingleInstitutePage />}  />
          <Route path="/OutsiderInstitute" element={<OutsiderInstitute />}  />

          {/* <Route path="/SignUp" element={<Log />}  /> */}
          <Route path="/signup" element= {<MainSignUp/>} />
          <Route path="/universitydash/:name" element= {<Mainpage/>} />
          <Route path="/universitydash/:name/AppliedStudents" element= {<AppliedStudents/>} />
          <Route path="/signup/university" element= {<Log/>} />
          <Route path="/signup/user" element= {<Log/>} />
          <Route path="/signin/university/" element= {<Log/>} />

          <Route path="/universitydash/:name/maketest" element= { <UniTest/>} />

          <Route path="/universitydash/:name/showtest" element={<TestList/>} />
          <Route path="/universitydash/:name/showtest/:id" element={<SingleText/>} />
      </Routes>
      <Footer/>


      </div>

    </div>
  )
}

export default App
