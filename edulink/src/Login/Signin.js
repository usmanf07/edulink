import React, { useState } from 'react'
import { Link } from 'react-router-dom';
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
        await axios.post("http://localhost:8000/", {email, password
      })
      .then(res=>{
          if(res.data=="exists"){
              history('/home', {state:{id:email}})
          }
          else{
              alert("User does not exist")
          }
      })
      .catch(err=>{
          console.log(err)
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
        <input type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
        <label>Password:</label>
        <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
        <input type="submit" onClick={submit}/>
      </form>
      <br></br>
      <p>OR</p>
      <Link to="/Signup1"> <button>Sign Up</button></Link>
      </div>
    </div>
  )
}

export default Signin