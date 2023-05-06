import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup1({ onNext }) {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const history = useNavigate();


  const handleNext = (e) => {
    e.preventDefault();
    onNext({ username, username, email });
  }


  async function submit(e){
    e.preventDefault();
    try{
        await axios.post("http://localhost:8000/SignUp1", {username, email, password
      })
      .then(res=>{
          if(res.data=="exists"){
            alert("User already exists")
          }
          // else if(res.data == "Uservalidationfailed"){
          //   alert("User validation failed")
          // }
          // else if(res.data == "password_error"){
          //   alert("Password should be at least 6 digits")

          // }
          // else if(res.data == "error"){
          //   alert("Error found");
          // }
          else{
            history('/home', {state:{id:email}})
            // onNext({ username, email, password });
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
    <h1>
      Sign Up
    </h1>
    </div>


    <div className='information'>
    <form action="POST">
      <label>
        Username:
      </label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>
        Password:
      </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <label>
            Email:

      </label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />


      <button className='next' onClick={submit}>Next</button>
      {/* <input type="submit" onClick={submit}/> */}
    </form>
    </div>

  </div>
  )
}
