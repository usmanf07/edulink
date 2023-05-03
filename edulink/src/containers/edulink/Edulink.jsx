import React from 'react'
import './edulink.css'
import { Feature } from '../../components'
const Edulink = () => {
  return (
    <div className="edulink__info">
    <div className="edulink__infoedulink section__margin" id="wedulink">
    <div className="edulink__infoedulink-feature">
      <Feature title="What is eduLink?" text="EduLink is your ultimate academic companion, helping you find the best institutions, connect with potential employers, and achieve your educational goals." />
    </div>
    <div className="edulink__infoedulink-heading">
      <h1>Discover the Best Institutions with the Easy 3-Step Process</h1>
      <p>Explore eduLink for Institutions</p>
    </div>
    <div className="edulink__infoedulink-container">
      <div className='edulink__infoedulink-container-card'>
      <Feature title="1. Search" text="Enter your preferences and browse our recommendations to find the best institutions for you." />
      </div>
      <div className='edulink__infoedulink-container-card'>
      <Feature title="2. Upload Your Details" text="Upload and make your application once securely through our streamlined platform." />
      </div>
      <div className='edulink__infoedulink-container-card'>
      <Feature title="3. Apply in One Click" text="Take the First Step Towards Your Future & quickly apply to your favourite institute in a single click with real time application tracking" />
      </div>
    </div>
    </div>
  </div>
  )
}

export default Edulink