import React, { useCallback, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from './config/apiConfig';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideMenu2P from './component/sideMenu2P';

const PitchDeck = () => {
  const navigate = useNavigate()
 
  const projectId = localStorage.getItem('nProject');
  const prototypeType = localStorage.getItem('selectedPrototype');

 const access_token = localStorage.getItem('access_token');
   const decodedToken = jwtDecode(access_token);
   const userId = decodedToken.userId;

   const handleClickUp = () => {
    navigate('/pitchDeckUpload');
  };

  const handleClickVi = () => {
    navigate('/pitchDeckView');
  };

  return (
    <>
    <div className='container'>
    
    
        <div className='coverPit'>
          <div className='row'>
            <div className='col-md-6'>
              <p className='ppit'>Pitch Deck</p>
              <p className='ppit2'>A pitch deck is a concise presentation used to communicate your business plan, product, vision, and growth potential to investors or stakeholders. It highlights key aspects of your company, including the market opportunity, solution, business model, financial projections, and team. The goal is to persuade investors to support your venture by showcasing your value proposition and strategic approach.</p>
            </div>

            <div className='col-md-6'>
             <div className='row'>

              <div className='col-md-6'>
                <div className='caseBAVie' style={{color:"#101010"}} onClick={handleClickVi}>
                  <p className='conCa'>View PitchDeck</p>
                  <p className='conCa2'>View previously Uploaded Files for Pitch deck</p>
                </div>
               </div> 

               <div className='col-md-6'>
                <div className='caseBAVie' style={{backgroundColor:"#101010"}} onClick={handleClickUp}>
                  <p className='conCa'>Upload File</p>
                  <p className='conCa2'>Upload pitch deck files for view later on</p>
                </div>
               </div> 

               <div className='col-md-6'>
                <div className='caseBAVie' style={{backgroundColor:"#1b45bf"}}>
                  <p className='conCa'>Resources</p>
                  <p className='conCa2'>View previously Uploaded Files for Pitch deck</p>
                </div>
               </div> 

               <div className='col-md-6'>
                <div className='caseBAVie' style={{backgroundColor:"#101010"}}>
                  <p className='conCa'>Pitch Deck Offers</p>
                  <p className='conCa2'>Upload pitch deck files for view later on</p>
                </div>
               </div> 

             </div>
            </div>
          </div>
        
        </div>

       
         
  
    
    </div>
    </>
  );
};

export default PitchDeck;
