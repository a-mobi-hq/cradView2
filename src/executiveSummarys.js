import React from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';



function ExecutiveSummarys ()  {
    const navigate = useNavigate()

     const onClickHandler = () => navigate(`/introduction1`)
    return (

        <>
        <div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        <div className='col-md-9'>
            <img src={bci} className='bcA'></img>
        <div className='lenght'>
                    <div className='text-center'>
                <p className='centerH'>Executive Summary</p>
                <p className='centerHp'>Make sure you answer all questions</p>
                </div>
            {/*<button className="btn btn-primary edit">Edit</button>
            <button className="btn btn-primary save">Save</button>*/}
            <p className= "buttonE">Save</p>
            <p className= "buttonS">Edit</p>
            <div class = "break"></div>
            <div className='container-textBs'>
                <textarea className='textBs'></textarea>
            </div>
            
           
           
        </div> 

        <button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>
  </div>
  </div>
  </div>
  </>
    );
}

export default ExecutiveSummarys