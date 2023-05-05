import React, { useState } from 'react'
// import { Link } from 'react-router-dom';
import './Log.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
        await axios.post("http://localhost:3000/", {email, password
      })
      .then(res=>{
          if(res.data="User exists"){
              history('/Home', {state:{id:email}})
          }
      })
    }
    catch(e){
        console.log(e);
    }

  }

  return (
    <div className='sign'>

      <div>
        <h1>Sign In</h1>
      </div>


      <div className='information'>
      <form action="POST">
        <label>Email:</label>
        <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
        <label>Password:</label>
        <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
        <button onClick={submit}>Sign In</button>
      </form>
      <br></br>
      <p>OR</p>
      {/* <Link to="/Signup1"> <button>Sign Up</button></Link> */}
      </div>
    </div>
  )
}

export default Signin