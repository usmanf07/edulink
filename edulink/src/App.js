import React from 'react'
import {Footer, Blog, Possiblity, Features, Header, Edulink, Featuresecondary} from './containers'
import {CTA, Navbar, Brand} from './components'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <div className="gradient_bg">
        <Navbar />
        <Header />
        <Features />
        <Featuresecondary />
        <Edulink />
        <Possiblity />
        <CTA />
      </div>
{/*       
      <Brand />
       */}
{/*       
      <Blog />
      <Footer /> */}
    </div>
  )
}

export default App