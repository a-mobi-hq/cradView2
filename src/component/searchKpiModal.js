import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";




export default function SearchKpiModal ({open, onClose})  {
    const [isOpen, setIsOpen]= useState(false);
    if(!open) return null

    return ReactDOM.createPortal(
        <>
        <div className='modalOv' >
           <div className='modalSt'>
                <p className='closeIcon' onClick={onClose} type='button'>X</p>
              <p className='txt2'>Add KPI</p>
              <div className='whiteKpi1'>
              <input className='inptT1' type="text" placeholder="Type to search.."></input>
              
            
             <div className='searchKpiBox'>

               <div className="">
             <p className='selectKpi'>Or select from the list below</p>
            <div className='divButton'>
            <div><button className="btn-primary dropdown-toggle divBut" type="button" data-toggle="dropdown">Fintech</button></div>
            <div><button className="btn-primary dropdown-toggle divBut" type="button" data-toggle="dropdown">Construction Company</button></div>
            <div><button className="btn-primary dropdown-toggle divBut" type="button" data-toggle="dropdown">Health Care</button></div>
            <div><button className="btn-primary dropdown-toggle divBut" type="button" data-toggle="dropdown">Call Center</button></div>
            <div><button className="btn-primary dropdown-toggle divBut" type="button" data-toggle="dropdown">Rental Service</button></div>
            <div><button className="btn-primary dropdown-toggle divBut" type="button" data-toggle="dropdown">Charity Profit</button></div>
            <div><button className="btn-primary dropdown-toggle divBut" type="button" data-toggle="dropdown">Operations</button></div>
            <div><button className="btn-primary dropdown-toggle divBut" type="button" data-toggle="dropdown">Agriculture</button></div>
            <div><button className="btn-primary dropdown-toggle divBut" type="button" data-toggle="dropdown">Finance</button></div>
            </div>
            </div>
            <div className='sideDiv'>
               <p className='sideDivN'>Selected KPIs</p>
               <input className='sideDivD'></input>
            </div>
            </div>  
    
             <button className="btn btn-primary kpib">Cancel</button>
              <button className="btn btn-primary kpibA">Add to my account</button>
              </div>          
           </div>
        </div>
        </>,
         document.getElementById('portal')
     );
}
