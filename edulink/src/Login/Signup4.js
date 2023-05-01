import React,{useState} from 'react'

export default function Signup4() {


   const [test, setTest] = useState('');
  return (
   <div className='sign'>
      <div>
    <h1>
      Sign Up
    </h1>
    </div>

     <div className='information'>

     <input id="postalCode" type="text" value={test} onChange={(e) => setTest(e.target.value)} />




     </div>


    </div>
  )
}

