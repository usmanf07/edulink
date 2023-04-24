import React from 'react'
import './possiblity.css'
import Feature from '../../components/feature/Feature';
const featuresData = [
  {
    title: 'Personalized Institution Recommendations',
    text: 'Get tailored institution recommendations based on your location, preferences and academic background.',
  },
  {
    title: 'Institution Reviews and Ratings',
    text: 'Read reviews and ratings of institutions to help make informed decisions about your education.',
  },
  {
    title: 'Real-Time Application Tracking',
    text: 'Get up-to-date information on the status of your application, including when it has been received, reviewed, and accepted.',
  },
  {
    title: 'Sample Entry Test',
    text: 'Take a sample entry test to assess your academic strengths and weaknesses and get a better idea of what to expect on the actual exam.',
  },
];

const Possiblity = () => {
  return (
    <div className="edulink__possibility-container" id="features">
    <div className="edulink__possibility">
    <div className="edulink__possibility-heading">
      <h1>Discover eduLink: Your One-Stop Solution for Personalized Institution Recommendations, Easy Applications, and More!</h1>
    </div>
    <div className="edulink__possibility-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
    </div>
  </div>
  )
}

export default Possiblity