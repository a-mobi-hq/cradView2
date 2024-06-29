import React, { useState } from 'react';
import ReactDOM from "react-dom";
import {CiFaceSmile} from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';


 function NiceWork({open, onClose})  {

   const navigate = useNavigate()

    const onClickHandler = () => navigate(`/introduction1`)
    return (
        <div className='modalOv' >
           <div className='okNice'>
             <div className='okDiv'>
                <p className='niceWork'> Nice Work!</p>
                <span className='niceImg' onClick={onClickHandler} type='button'><CiFaceSmile /></span>
                <p className='niceWork1'>You've provide all the essentials.</p>
             </div>
           </div>          
        </div>
     );
}

export default NiceWork