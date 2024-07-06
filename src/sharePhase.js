import React, { useState, useEffect } from 'react';
import ShareModal from './component/shareModal';
import { useDropzone } from 'react-dropzone';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from './config/apiConfig';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideMenu2P from './component/sideMenu2P';

const ImageUpload = () => {
  const navigate = useNavigate()
  const [images, setImages] = useState([]);
  const projectId = localStorage.getItem('nProject');
  const prototypeType = localStorage.getItem('selectedPrototype');

 const access_token = localStorage.getItem('access_token');
   const decodedToken = jwtDecode(access_token);
   const userId = decodedToken.userId;

   const [isOpen, setIsOpen] = useState(false);
   const [circles, setCircles] = useState(new Array(6).fill(false));
 
   const phaseNames = [
    'Ideation',
    'Product Definition',
    'Prototyping',
    'Initial Design',
    'Validating and Testing',
    'Commercialization'
  ];
  
   // Clear localStorage on initial load
   useEffect(() => {
     localStorage.removeItem('filledCircles');
   }, []);
 
   useEffect(() => {
     const filledCircles = circles
       .map((isFilled, index) => (isFilled ? phaseNames[index] : null))
       .filter(phase => phase !== null);
     localStorage.setItem('filledCircles', JSON.stringify(filledCircles));
     console.log('Filled circles:', filledCircles); // Log the filled circles
   }, [circles]);
 
   const toggleStyle = (index) => {
     setCircles(prevCircles => {
       const newCircles = [...prevCircles];
       newCircles[index] = !newCircles[index];
       return newCircles;
     });
   };



   const onClickHandler21 = () => navigate(`/feedback`);

  return (
    <>
    <div className='container'>
   
    <div className="const">
    <div className=''>
              <div className='text-center'>
                <p className='centerH'>Share</p>
                <p className='centerHp'>Here you can share your work</p>
              </div>
              <div className='BoxPhase1'>
              <button className="btn btn-primary curveP" onClick={onClickHandler21}>Feedback</button>
                <p className='centerH1v'>Phase</p>
               
                {phaseNames.map((phase, index) => (
                  <div className='BoxPhase' key={index}>
                    <div className='boxView'><p className='heading'>{phase}</p></div>
                    <div className='boxView'>
                      <div 
                        className={`circle ${circles[index] ? 'filled' : 'borderC'}`} 
                        onClick={() => toggleStyle(index)}
                      ></div>
                    </div>
                  </div>
                ))}
                <div className='boxView'>
                  <button className="btn btn-primary curveP" onClick={() => setIsOpen(true)}>Share</button>
                </div>
                <ShareModal 
                    open={isOpen} 
                    onClose={() => setIsOpen(false)} 
                    circles={circles}
                    phaseNames={phaseNames}
                />
              </div>
            </div>
    </div>
    </div>
    </>
  );
};

export default ImageUpload;
