import React from 'react';
import bci from './images/bc.png'; 
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';



function SectionPrototype ()  {
    const navigate = useNavigate()

     const onClickHandler = () => navigate(`/wireFrame`)
    return (
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
            <img src={bci} className='bcA'></img>
                <p className='centerH'>Prototype</p>
                <p className='centerHp'>Watch the video to know what to do in this phase</p>
        <div className='centerC'>
            <div className='text-center'>
            <div class = "spaceA"></div>
            <iframe className='protoIframe' src="https://www.youtube.com/embed/NBd6yJBzyis?si=QTR7Qu_dLDkhRFmR" title="Iframe Example"></iframe>
            <div class = "spaceA"></div>
            </div>
        </div> 

        <button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>
  </div>
  </div>
  </div>
  </>
    );
}

export default SectionPrototype


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