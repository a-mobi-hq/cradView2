import React from 'react';
import bci from './images/bc.png'; 
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';




function HomeStarter ()  {

    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/problemstatement`)
    return (
        <>
 <div className='container-fluid'>
    <Header />
        
        <div className='col-lg-12'>
        <div className=''>
            <div className='container-fluid'>
            <div class = "spaceB"></div>
            <iframe src="https://www.youtube.com/embed/NBd6yJBzyis?si=QTR7Qu_dLDkhRFmR" title="Iframe Example" className='demo'></iframe>
            <div class = "spaceB"></div>
            </div>
        </div> 

  </div>
  </div>
<div className='flex-container footer'>
        <div className='text1'>Do you want to start a project with us?</div>
        <div className='text2'>Get Started</div>
    </div>
  </>
    );
}

export default HomeStarter


{/*    <div className='col-md-10 align'>
        <div className='centerC'>
            <img src={bci} className='bcI'></img>

            <div className='text-center'>
            <div class = "spaceA"></div>
            <iframe src="https://www.youtube.com/embed/NBd6yJBzyis?si=QTR7Qu_dLDkhRFmR" title="Iframe Example"></iframe>
            <div class = "spaceB"></div>
            </div>
            <p className='question'>Why do you want to start a Company?</p>
            <div className='container-textAs'>
                <textarea className='textAs'></textarea>
            </div>
            <p className='suggest'>Your answer shouldn't be about money, It should be about solving a problem</p>
        </div> 

        <button className="btn btn-primary curveNext">Next</button>
  </div> */}