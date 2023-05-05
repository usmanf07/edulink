
import React, { useEffect, useState } from 'react';
import { Possiblity, Features, Header, Edulink, Featuresecondary, Sectors } from './containers';
import { CTA, Navbar } from './components';
import './App.css';
import { useLocation } from 'react-router-dom';


export default function Home() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(localStorage.getItem('loggedin'));

  useEffect(() => {
    if (location.state == null || location.state.id == null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location.state]);

  return (
    <div>

      <Navbar login={isLogin} name={location.state?.id} />
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
