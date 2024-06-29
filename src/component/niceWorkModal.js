import React, { useState } from 'react';
import ReactDOM from "react-dom";
import ViewSharedModal from './viewSharedModal';
import { useNavigate } from 'react-router-dom';


export default function NiceWorkModal({open, onClose})  {
  const [isOpen, setIsOpen]= useState(false);
  const navigate = useNavigate()

  const onClickHandler = () => navigate(`/shareFile`)
 if(!open) return null

 return ReactDOM.createPortal (
  <>
        <div className='modalOv' >
           <div className='modalSt'>
                <p type='button' onClick={onClose} className='closeIcon'>X</p>
              <p className='txt2'>Send/ Share File</p>
              <hr></hr>
              <div className='sendBox'>
                <p className='share'>Share this file</p>
                <p className= 'share1'>Anyone with the link <a href='' className='anchor2'>can view</a></p>
                <input type="text" className='input3' placeholder="Search.."></input>
                <p className='copy'><a href='' className='anchor2'>copy link</a></p>
               <div className='text-center'>
                <div className='container-textAl'>
                <textarea className='textAb'></textarea>
            </div>                
            <button className="btn btn-primary curveSb" onClick={()=>setIsOpen(true)}>Share File</button>
           </div>
           <ViewSharedModal open={isOpen} onClose={() => setIsOpen(false)}>

          </ViewSharedModal>
           </div>
           </div>          
        </div>
        </>,
         document.getElementById('portal')

     );
}

