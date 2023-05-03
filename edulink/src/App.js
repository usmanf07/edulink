import React from 'react'
import {Footer, Blog, Possiblity, Features, Header, Edulink} from './containers'
import {CTA, Navbar, Brand} from './components'
import All_UniversitiesPage from './All_UniversitiesPage/MainPage';
import UniPage from './Single_UniversityPage/MainPage'

import './App.css'

const App = () => {



  const [login, setLogin] = useState(0);

  const handleDivClick = () => {
   setLogin(1);

  };

  return (
    <div className="App">
      <div className="gradient_bg">

      <BrowserRouter>
         <Navbar/>
         <Routes>
         <Route path="/" exact element={<Home myLogin={login}/>} />

        </Routes>
         <Footer />
      </BrowserRouter>
        {/* <All_UniversitiesPage />
         {/* <UniPage /> */}

        {/* <All_UniversitiesPage /> */}
         {/* <UniPage /> */}
          {/* <Log/> */}
          {/* <Example /> */}
      </div>




{/*
      <Brand />
       */}
{/*
      <Blog />
      <Footer />
      <All_UniversitiesPage />

  {/* <All_UniversitiesPage /> */}
    </div>
  )
}

export default App
