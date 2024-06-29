import React from 'react';
import bci from './images/bc.png'; 
import dcf1 from './images/dcf1.png'; 
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';




function SectiondcfTwo ()  {
    const navigate = useNavigate()

    const onClickHandler = () => navigate(``)
    return (
        <>
 <div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
             <img src={bci} className='bcA'></img>
        <div className='centerC'>
            <div className='text-center'>
                <p className='tittle'>Welcome Back to Discounted Cash Flow (DCF) </p>
                <div class = "dcfspace"></div>
                <img src={dcf1} className='dcfbro'></img> 
                <div class = "dcfspace"></div>
                <button className="btn btn-primary curvedcf" onClick={onClickHandler}>Continue</button>
            </div>
            {/*<div class = "dcfspacebottom"></div>
            <div class = "dcfspacebottom"></div>*/}
        </div> 
  </div>
  </div>
  </div>
  </>
    );
}

export default SectiondcfTwo