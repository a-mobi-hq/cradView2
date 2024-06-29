import React from 'react';
import bci from './images/bc.png'; 
import dcf from './images/dcf.png'; 
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';





function Sectiondcf ()  {
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/SectionDiscount`)
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
                <p className='tittle'>Welcome to Discounted Cash Flow (DCF) </p>
                <div class = "dcfspace"></div>
                <img src={dcf} className='dcfbro'></img> 
                <div class = "dcfspace"></div>
                <button className="btn btn-primary curvedcf" onClick={onClickHandler}>Begin</button>
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

export default Sectiondcf