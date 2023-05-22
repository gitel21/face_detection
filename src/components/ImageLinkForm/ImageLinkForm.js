import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onBtnSubmit}) => {
   return (
      <div>
         <div className='f3 white pa3 b mb2'>
            {'This Magic Brain will detect faces in your pictures.'}
         </div>
         <div className='center'>
            <div className='form center pa4 br3 shadow-5'>
               <input className='f4 pa2 w-70 center' type='text' 
               onChange={onInputChange} />
               <button className='w-30 grow f4 b link ph3 pv2 dib with bg-gold' 
               onClick={onBtnSubmit}>Detect</button>
            </div>
         </div>
      </div>
   )
}

export default ImageLinkForm;