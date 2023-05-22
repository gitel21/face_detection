import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import faceid from './faceid.png';

const Logo = () => {
   return (
      <div className='ma4 mt0'>
         <Tilt className="Tilt br2 shadow2" style={{width: '100px', height: '100px'}}>
            <div className="Tilt-inner pa3"><img style={{paddingTop: '5px'}} alt='face-id' src={faceid}/></div>
         </Tilt>
      </div>

   )
}

export default Logo;