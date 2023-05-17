
import React, { useEffect, useState } from 'react';
import { Possiblity, Features, Header, Edulink, Featuresecondary, Sectors } from './containers';
import { CTA, Navbar } from './components';
import './App.css';
import { useLocation, useParams } from 'react-router-dom';


export default function Home() {
  
  const [isLogin, setIsLogin] = useState(sessionStorage.getItem('email'));
  const [email, setEmail] = useState('');

 
  
  
  useEffect(() => {
    let reloadCount = sessionStorage.getItem('reloadCount');
  reloadCount = reloadCount ? Number(reloadCount) : 0;

  if (reloadCount < 2) {
    sessionStorage.setItem('reloadCount', String(reloadCount + 1));
    if (reloadCount === 0) {
      window.location.reload();
    }
  } else {
    sessionStorage.removeItem('reloadCount');
  }
    // Get sessionId and email from sessionStorage
    const sessionId = sessionStorage.getItem('sessionId');
    const email = sessionStorage.getItem('email');
    console.log(email)
   
    if(email === null) {  
      setIsLogin(false);
      console.error('User is not logged in.'); // Log error message
      return;
    }
    else{
      setIsLogin(true);
    }
    setEmail(email);
  }, []);


  return (
    <div>

      {/* <Navbar login={isLogin} name={email} /> */}
      <Header />
      <Features />
      <Featuresecondary />
      <Sectors />
      <Edulink />
      <Possiblity />
      <CTA />

    </div>
  );
}
