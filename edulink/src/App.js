import React from 'react'
import {Footer, Blog, Possiblity, Features, Header, Edulink, Featuresecondary, Sectors} from './containers'
import {CTA, Navbar, Brand} from './components'
import All_UniversitiesPage from './All_UniversitiesPage/MainPage';
import UniPage from './Single_UniversityPage/MainPage'

import './App.css'
import Test from './Test';
import Log from './Login/Log';
const App = () => {
  return (
    <div className="App">
      <div className="gradient_bg">
         {/* <Navbar />
        <Header />
        <Features />
        <Featuresecondary />
        <Sectors />
        <Edulink />
        <Possiblity />
         <CTA />
         <Footer />

        {/* <All_UniversitiesPage />     */}
         <UniPage />

        {/* <All_UniversitiesPage /> */}
         {/* <UniPage /> */}
          <Log/>
          {/* <Example /> */}
      </div>




{/*
      <Brand />
       */}
{/*
      <Blog />
      <Footer />
      <All_UniversitiesPage />

  {/* <All_UniversitiesPage /> */}
    </div>
  )
}

export default App
