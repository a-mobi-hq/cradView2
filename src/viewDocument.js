import React, { useState } from 'react'; 
import bci from './images/bc.png';
import Header from './component/header';
import { useNavigate } from 'react-router-dom';
import GiveFeedbackModal from './component/giveFeedbackModal';




function ViewDocument ({open, onClose})  {
    const [isOpen, setIsOpen]= useState(false);
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/viewSheetModal`)
    const onClickHandler1 = () => navigate(`/pageShare`)
    return (        
        <>
         <div className='container-fluid'>
    <Header />
        
        <div className='container col-sm-7'>
        <div className='centerC'>
            
            <div className='text-center'>
            <img src={bci} className='bcI' onClick={onClickHandler1}></img>  
                <p className='centerH'>View Document</p>
                <p className='centerHp'>Here you can view shared document</p>             
            </div>
            <div className='BoxPhase1'>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Ideation</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                    <p className='textView' type='button'onClick={()=>setIsOpen(true)}>Give Feedback</p>
                <button className="btn btn-primary curveP" onClick={onClickHandler}>View</button>
                </div>
                
            </div>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Product Definition</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                    <p className='textView' type='button'onClick={()=>setIsOpen(true)}>Give Feedback</p>
                <button className="btn btn-primary curveP" onClick={onClickHandler}>View</button>
                </div>
                
            </div>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Prototype</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                    <p className='textView' type='button'onClick={()=>setIsOpen(true)}>Give Feedback</p>
                <button className="btn btn-primary curveP" onClick={onClickHandler}>View</button>
                </div>
                
            </div>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Initial Design</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                    <p className='textView' type='button'onClick={()=>setIsOpen(true)}>Give Feedback</p>
                <button className="btn btn-primary curveP" onClick={onClickHandler}>View</button>
                </div>
                
            </div>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Validating and Testing</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                    <p className='textView' type='button'onClick={()=>setIsOpen(true)}>Give Feedback</p>
                <button className="btn btn-primary curveP" onClick={onClickHandler}>View</button>
                </div>
                
            </div>
            <div className='BoxPhase'>
                <div className='boxView'><p className='heading'>Commercialization</p>
                <p className='subHeading'>12pages</p></div>
                
                <div className='boxView'>
                    <p className='textView' type='button'onClick={()=>setIsOpen(true)}>Give Feedback</p>
                <button className="btn btn-primary curveP" onClick={onClickHandler}>View</button>
                </div>
                
            </div>
            <GiveFeedbackModal open={isOpen} onClose={() => setIsOpen(false)}>

      </GiveFeedbackModal>

            </div>
        </div> 
  
        
           
          
  </div>
    </div>
  </>
    );
}

export default ViewDocument
