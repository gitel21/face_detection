import React from 'react';
import './FaceDetection.css'

const FaceDetection = ({imageUrl, boxes}) => {
   return (
      <div className='center ma'>
         <div className='absolute mt2'>
            <img id='inputimage' alt='face' src={imageUrl} width='500px' height='auto' />
            {boxes.map(box => 
               <div key={`box_${box.leftCol}_${box.topRow}`}
                  className='bounding-box'
                  style={{left: box.leftCol, top: box.topRow, right: box.rightCol, bottom: box.bottomRow}}>
               </div>
               )
            }
         </div>
      </div>
   )
}

export default FaceDetection;