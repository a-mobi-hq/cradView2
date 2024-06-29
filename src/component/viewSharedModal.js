import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { useNavigate } from 'react-router-dom';





export default function ViewSharedModal ({open, onClose})  {
    const [isOpen, setIsOpen]= useState(false);
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/welcome`)
    const onClickHandler1 = () => navigate(`/pageLogin`)
    if(!open) return null
    return (
        <div className='modalOv' >
           <div className='modalStt'>
                <p type='button' className='closeIcon' onClick={onClose}>X</p>
              <p className='txt2'>View Shared File</p>
              <hr></hr>
              <div className='shareBox'>
                <p className='share'>View Shared File</p>
                <p className= 'share1'>Anyone with the link <a href='' className='anchor2'>can view</a></p>
                <div className='shareBox1'>
                <p className='shareA' type='button' onClick={onClickHandler1}>Already have an account on craddule</p>
                <p className= 'share1'><a href='' className='anchor2' onClick={onClickHandler}>Not on craddule</a></p></div>
           </div>
           </div>          
        </div>
     );
}

