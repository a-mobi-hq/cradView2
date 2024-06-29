import React from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';


function Comparative ()  {
    
    const navigate = useNavigate()

     const onClickHandler = () => navigate(`/foreCast`)
    return (

            <>
    
    <div className='container-fluid'>
        <Header />
        <div className='row'>
        <Menu /> 
            
            <div className='col-md-9'>
                    <p className='centerH'>Company Variables</p>
                    <p className='centerHp'>Make sure you answer all question</p>
                    <img src={bci} className='bcA' type='button'></img>
            <div className='container-fluid centerM3'>
            <div className='container divMonth2'>
                <div className='month1'>
                <div className='flexy'>
                <div className='containTitle'>Company</div>
                </div> 
                    <div className='flexy'>
                <input className='monthOn2R'></input>
                </div>            
                </div>
                <div className='flexy'>
                <input className='monthOn2W'></input>
                </div>
                <div className='flexy'>
                <input className='monthOn2S'></input>
                </div>
                <div className='flexy'>
                <input className='monthOn2F'></input>
                </div>
                <div className='flexy'>
                <input className='monthOn2K'></input>
                </div>
                <div className='flexy'>
                <input className='monthOn2V'></input>
                </div>
                <div className='flexy'>
                <input className='monthOn2O'></input>
                </div>
                <div className='flexy'>
                <input className='monthOn2H'></input>
                </div>
                </div>

                <div className='container divMonth2'>
                <div className='month1'>
                <div className='flexy'>
                <div className='containTitle'>Variables</div>
                </div> 
                    <div className='flexy'>
                <input className='monthOn2T'></input>
                </div>            
                </div>
                <div className='flexy'>
                <input className='monthOn2Z'></input>
                </div>
                <div className='flexy'>
                <input className='monthOn2Q'></input>
                </div>
                <div className='flexy'>
                <input className='monthOn2D'></input>
                </div>
                <div className='flexy'>
                <input className='monthOn2B'></input>
                </div>
                <div className='flexy'>
                <input className='monthOn2I'></input>
                </div>
                <div className='flexy'>
                <input className='monthOn2M'></input>
                </div>
                <div className='flexy'>
                <input className='monthOn2N'></input>
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

export default Comparative