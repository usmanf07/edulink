import React,{useState} from 'react'

export default function Signup1({ onNext }) {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const handleNext = (e) => {
    e.preventDefault();
    onNext({ username, password, email });
  }

  return (
    <div className='sign'>

    <div>
    <h1>
      Sign Up
    </h1>
    </div>


    <div className='information'>

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


    <button className='next' onClick={handleNext}>Next</button>

    </div>
  </div>
  )
}
