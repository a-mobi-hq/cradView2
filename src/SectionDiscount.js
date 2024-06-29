import React from 'react';
import bci from './images/bc.png'; 
import graph from './images/graph.png'; 
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';





function Sectiondcf3 ()  {
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/SectiondcfTwo`)
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
                <p className='tittle'>Discounted Cash Flow</p>
                {/*<div class = "dcfspacebottom"></div>
                <p className='titledcf'>Make sure you answer all questions</p>*/}
                <div class = "dcfspace"></div>
                <img src={graph} className='graph'></img> 
            </div>
            <div class = "dcfspacebottom"></div>
        </div> 
        <button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>
  </div>
  </div>
  </div>
  </>
    );
}

export default Sectiondcf3