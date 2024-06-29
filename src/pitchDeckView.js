import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from './config/apiConfig';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideMenu2P from './component/sideMenu2P';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-modal'; // Import the modal library
import { faCircleNotch, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

const PitchDeck = () => {
  const navigate = useNavigate()
 


   const [images, setImages] = useState([]);
   const [selectedImage, setSelectedImage] = useState(null);
   const projectId = localStorage.getItem('nProject');
   const type = "PitchDeck";
   const prototypeType = 'PitchDeck';
   const [loading, setLoading] = useState(false);
 
  const access_token = localStorage.getItem('access_token');
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId;
 
    const [types, setTypes] = useState([]);

    useEffect(() => {
      const fetchTypes = async () => {
          try {
              const response = await axios.get(`${API_BASE_URL}/api/hub/types/project/${type}/${projectId}`);
              console.log(response.data);
              setTypes(response.data.hubs);
             
          } catch (error) {
              console.error('Error fetching types:', error);
              
             
          }
      };
   
      fetchTypes();
   }, []);

   const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = date.toLocaleDateString();
    return { time, formattedDate };
  };

  const openModal = (imageDetail) => {
    setSelectedImage(API_BASE_URL + `/images/${imageDetail.hubFile}`);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };
  return (
    <>
    <div className='container'>
    
    <div className='text-center' style={{marginTop:50}}>
              <p className='taskHeader'>Pitch Deck</p>
             
        </div>
        <div className='coverPit'>

       

            <div className='row'>
            {types.map((imageDetail, index) => {
              const { time, formattedDate } = formatDateAndTime(imageDetail.timeSent);
              return (
                    
                    <div className="col-md-4">
                      <div className='imgCo'>
                          <div className="image-card">
                            <img src={API_BASE_URL+`/images/${imageDetail.hubFile}`} alt="pror" className="image-card-img" onClick={() => openModal(imageDetail)}/>
                              
                              <FontAwesomeIcon icon={faDeleteLeft} className="edit-icon" />

                              
                          </div>

                          <p className='fileName'>{imageDetail.hubFileName}</p>
                          <p>{imageDetail.userId.firstName} {imageDetail.userId.lastName}</p>
                          <p>{formattedDate}</p>
                          <p>{time}</p>

                        
                        </div>
                      </div>

                      );
                      })}

            </div>
        </div>
            

        <Modal isOpen={!!selectedImage} onRequestClose={closeModal} contentLabel="Image Modal" className="image-modal" overlayClassName="image-modal-overlay">
              <div className="modal-content2">
                <img src={selectedImage} alt="Full Size" className="full-size-image" />
                <button onClick={closeModal} className="close-button2">Close</button>
              </div>
          </Modal>
          
       
        <Toaster  position="top-right" />
  
    
    </div>
    </>
  );
};

const ImagePreview = ({ image, index, moveImage, removeImage }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'image',
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'image',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  
  drag(drop(ref));

  return (
    <div ref={ref} className="image-preview" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <img src={image.preview} alt={`preview-${index}`} />
      <button className="remove-button" onClick={() => removeImage(index)}>
        x
      </button>
    </div>
  );
};


export default PitchDeck;
