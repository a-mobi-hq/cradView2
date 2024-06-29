import React from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import { useNavigate } from 'react-router-dom';


function ViewSheetModal ()  {
    
    const navigate = useNavigate()

     const onClickHandler = () => navigate(`/viewDocument`)
    return (
        <>
                <div className='container-fluid'>
    <Header />
        
        <div className='container col-md-7'>
        
                    <div className='text-center'>
                <h1 className='centerHh'>View Document</h1>
                <p className='centerHp'>Here you can view shared document</p>
                </div>
                <img src={bci} className='bcA1'type='button' onClick={onClickHandler}></img>
                <div className='lenghtV'>
            {/*<p className= "buttonE">Save</p>
            <p className= "buttonS">Edit</p>*/}
            <div class = "break"></div>
            <div className='container-textBs'>
                <textarea className='textBv'></textarea>

                <p className='TitleB'>Page 1 of 12</p>
            </div>
            
           
           
        </div> 
  </div>
  </div>
  </>
    );
}

export default ViewSheetModal