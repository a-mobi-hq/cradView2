import React from 'react';
import bci from './images/bc.png'; 
import business from './images/business.png'; 
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';





function SectionExe ()  {  const navigate = useNavigate()

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
                <p className='centerH'>Execute RTM</p>
                <p className='centerHp'>Make sure you answer all questions</p>
                <img src={business} className='bro'></img>
               
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

export default SectionExe