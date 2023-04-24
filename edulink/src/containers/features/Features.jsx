import React from 'react'
import './features.css'

const Features = () => {
  return (
    <div>
      <div className="edulink__features">
        <div className="edulink__features-container">
          <div className='edulink__features-container-header'>
            <h2>Quick Apply to Our Premium Institutes</h2>
            <div className="edulink__features-container-cards">
              <p><a>Universities</a></p>
              <p><a>Colleges</a></p>
              <p><a>Schools</a></p>
            </div>
          </div>
          <div className="edulink__features-container-institutes">
            <div className="edulink__features-container-institute-card">
              <img src='logo192.png' alt='logo' />
              <h5>Colombia University</h5>
              <p>location</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features