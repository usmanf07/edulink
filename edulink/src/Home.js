import React,{ useEffect }  from 'react'
import { Possiblity, Features, Header, Edulink, Featuresecondary, Sectors} from './containers'
import {CTA} from './components'
import './App.css'

export default function Home() {


  return (
    <div>
       <Header />
        <Features />
        <Featuresecondary />
        <Sectors />
        <Edulink />
        <Possiblity />
         <CTA />
    </div>
  )
}