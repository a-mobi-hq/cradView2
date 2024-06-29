import React from 'react';
import amico from './images/amico.png'; 
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';




function SectionExecute ()  {
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/executiveSummarys`)
    return (
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
        <div className='centerC'>
            <div className='text-center'>
                <p className='textHp'>Executive Summary</p>
                <p className='textH'>Make sure you answer all questions</p>
                <img src={amico} className='bro'></img>
               
            </div>
            <p className='question'>Why do you want to start a Company?</p>
            <div className='container-textAs'>
                <textarea className='textAs'></textarea>
            </div>
            <p className='suggest'>Your answer shouldn't be about money, It should be about solving a problem</p>
        </div> 
  
        <button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>
           
          
  </div>
  </div>
  </div>
  </>
    );
}

export default SectionExecute