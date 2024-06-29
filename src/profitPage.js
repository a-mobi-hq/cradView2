import React from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';


function ProfitPage ()  {
    
    const navigate = useNavigate()

     const onClickHandler = () => navigate(`/cutomerinflux`)
     const onClickHandler1 = () => navigate(``)
    return (

            <>
    
    <div className='container-fluid'>
        <Header />
        <div className='row'>
        <Menu /> 
            
            <div className='col-md-9'>
                <img src={bci} className='bcA' type='button' onClick={onClickHandler1}></img>
                    <p className='centerH'>Net Profit</p>
                    <p className='centerHp'>Make sure you answer all question</p>
            <div className='container-fluid centerM3'>
            <div className='container divMonth2'>
                <div className='month1'>
                <div className='flexy'>
                <div className='containTitle'>Months</div>
                </div> 
                    <div className='flexy'>
                <div className='monthOn2' type='button'></div>
                </div>            
                </div>
                <div className='flexy'>
                <div className='monthOn2' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2' type='button'></div>
                </div>
                </div>

                <div className='container divMonth2'>
                <div className='month1'>
                <div className='flexy'>
                <div className='containTitle'>Sales (Net Profit)</div>
                </div> 
                    <div className='flexy'>
                <div className='monthOn2' type='button'></div>
                </div>            
                </div>
                <div className='flexy'>
                <div className='monthOn2' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2' type='button'></div>
                </div>
                <div className='flexy'>
                <div className='monthOn2' type='button'></div>
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

export default ProfitPage