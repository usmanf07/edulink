import React from 'react'
import './sectors.css'
const Sectors = () => {
  return (
    <div className='edulink__sectors'>
        <div className='text2'>
      <p>Find Your Perfect Institution</p>
      <p>Anywhere in the World!</p>
      </div>

      <div className='allSectors'>

        <div className='sectors'>
          <div className='group1'>
            <img src="frame.svg" />
          </div>
          <div className='info'>
              <h1>
              Private Sector
              </h1>
              <div className='pa'>
                  <p>Choose from the best private sector institutions for your future in Pakistan</p>
              </div>

          </div>
          <div className='mycenbutton'>
            <button className='buttons'>Go!</button>
          </div>
        </div>

        <div className='sectors'>
        <div className='group2'>
            <img src="frame1.svg" />
          </div>

          <div className='info'>
              <h1>
              Public Sector
              </h1>
              <div className='pa'>
                  <p>Take the first step towards your dream career with our public sector institute recommendations</p>
              </div>

          </div>
          <div className='mycenbutton'>
            <button className='buttons1'>Go!</button>
          </div>


        </div>
        <div className='sectors'>
        <div className='group3'>
            <img src="aeroplane.png" />
          </div>


          <div className='info'>
              <h1>
              Over Seas
              </h1>
              <div className='pa'>
                  <p>Expand your horizons with our recommended international institutions</p>
              </div>
          </div>
          <div className='mycenbutton'>
            <button className='buttons2'>Go!</button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Sectors
