import React from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';


function FinancialProject ()  {
    
    const navigate = useNavigate()

     const onClickHandler = () => navigate(``)
     const onClickHandler1 = () => navigate(``)
     const onClickHandler2 = () => navigate(``)
    return (

            <>
    
    <div className='container-fluid'>
        <Header />
        <div className='row'>
        <Menu /> 
            
            <div className='col-md-9'>
                    <p className='centerH'>Financial Projection</p>
                    <p className='centerHp'>Make sure you answer all question</p>
                    <img src={bci} className='bcA' type='button' onClick={onClickHandler2}></img>
            <div className='centerM'>
            <div className='container divMonth'>
                <div className='month'>
                <div className='monthOn' type='button' onClick={onClickHandler1}>Month on Month</div>
                <div className='monthOn' type='button' onClick={onClickHandler}>Year on Year</div>
                </div>
                </div>
            </div> 
      </div>
      </div>
      </div>
      </>
        );
}

export default FinancialProject