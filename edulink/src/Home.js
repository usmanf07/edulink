
import React, { useEffect, useState } from 'react';
import { Possiblity, Features, Header, Edulink, Featuresecondary, Sectors } from './containers';
import { CTA, Navbar } from './components';
import './App.css';
import { useLocation, useParams } from 'react-router-dom';


export default function Home() {

  const [isLogin, setIsLogin] = useState(localStorage.getItem('loggedin'));
  const temp =useParams();
  useEffect(() => {
    ;
    if (temp.id==null) {
      setIsLogin(false);

    } else {
      setIsLogin(true);
    }
  }, [temp]);

  return (
    <div>

      <Navbar login={isLogin} name={temp.id} />
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
