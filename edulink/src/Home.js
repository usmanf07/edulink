import React,{ useEffect }  from 'react'
import { Blog, Possiblity, Features, Header, Edulink, Featuresecondary, Sectors} from './containers'
import {CTA, Brand} from './components'
import './App.css'
export default function Home(props) {


  return (
    <div className={props.myLogin ? "blue" : ""}>
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
