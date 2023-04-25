import React from 'react'
import {Footer, Blog, Possiblity, Features, Header, Edulink} from './containers'
import {CTA, Navbar, Brand} from './components'
import All_UniversitiesPage from './All_UniversitiesPage/MainPage';

import './App.css'

const App = () => {
  return (
    <div className="App">
      <div className="gradient_bg">
        <Navbar />
        <Header />
        <Features />
        <Edulink />
        <Possiblity />
        <CTA />
      </div>
{/*       
      <Brand />
       */}
{/*       
      <Blog />
      <Footer />

      {/* <All_UniversitiesPage /> */}
    </div>
  )
}

export default App