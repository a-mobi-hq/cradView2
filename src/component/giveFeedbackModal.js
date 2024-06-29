import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';




export default function GiveFeedbackModal ({open, onClose})  {
   const [isOpen, setIsOpen]= useState(false);
   const navigate = useNavigate()

   const onClickHandler = () => navigate(`/viewDocument`)
   if(!open) return null
   return (
      <>
      
      <div className='modalOv'>
              <div className='modalSt'>
              <div className='text-center give'>
              <p className='centerGive'>Give Feedback</p>
              <p className='centerHgive'>Your is valuable in helping us understand your needs and tailor our services accordingly</p>
              </div>
          {/*<p className= "buttonE">Save</p>
          <p className= "buttonS">Edit</p>*/}
          <div className='container-textBs'>
              <textarea className='textBk'></textarea>
              <div className='giveButton'> 
              <p className='TitleGive' type='button' onClick={onClose}>Share Feedback</p>
              </div>
             
          </div>
          
         
         
      </div> 
</div>
</>
     );
}
