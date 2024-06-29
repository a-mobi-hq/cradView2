import React from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';
import OperatingIncome from './operatingIncome';


function CustomerGrowthYoY ()  {
    
    const navigate = useNavigate()

     const onClickHandler = () => navigate(`/growthRateGraph`)
     const onClickHandler1 = () => navigate(`/financialPcomp`)
    return (

            <>
    
    <div className='container-fluid'>
        <Header />
        <div className='row'>
        <Menu /> 
            
            <div className='col-md-9'>
                    <p className='centerH'>Company Growth Rate</p>
                    <img src={bci} className='bcA' type='button' onClick={onClickHandler1}></img>

            <div className='centerM'>
             
            {/* <div className='inputYear'><input className='yearInput' placeholder='Input title of graph'></input></div>*/}

            <div className='container divMonth1'>
                <div className='month1'>
                    <div className='flexy'>
                    <input className='monthOn1'></input>
                <p className='monthOn1T'>Year 1</p>
                </div>            
                </div>
                <div className='flexy'>
                <input className='monthOn1'></input>
                <p className='monthOn1T'>Year 2</p>
                </div>
                <div className='flexy'>
                <input className='monthOn1'></input>
                <p className='monthOn1T'>Year 3</p>
                </div>
                <div className='flexy'>
                <input className='monthOn1'></input>
                <p className='monthOn1T'>Year 4</p>
                </div>
                </div>
            </div> 
            <button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>
      </div>
      
      </div>
      </div>
      </>
        );
}

export default CustomerGrowthYoY