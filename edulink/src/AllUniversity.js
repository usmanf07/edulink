import React from 'react'
import AllUniversityPage from './All_UniversitiesPage/MainPage'
import { useNavigate } from 'react-router-dom';

export default function AllUniversity(props) {

  const navigate = useNavigate();


  return (
    <div>
      <AllUniversityPage navigate={navigate}/>
    </div>
  )


}
