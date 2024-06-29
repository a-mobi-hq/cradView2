import React, { useCallback, useState, useRef,useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from './config/apiConfig';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import SideMenu2P from './component/sideMenu2P';
import DatePicker from 'react-datepicker';
import { SketchPicker } from 'react-color'; // Importing SketchPicker from react-color
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import fol from './images/fol.png'; 
import { faEdit } from '@fortawesome/free-solid-svg-icons'; // Import the pen icon
import Modal from 'react-modal'; // Import the modal library

const Craddule = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const projectId = localStorage.getItem('nProject');
  const prototypeType = localStorage.getItem('selectedPrototype');

 const access_token = localStorage.getItem('access_token');
   const decodedToken = jwtDecode(access_token);
   const userId = decodedToken.userId;
   const [selectedUsers, setSelectedUsers] = useState([]);

   const [showPicker, setShowPicker] = useState(false);
   const [selectedColor, setSelectedColor] = useState(''); // Initial color value
 
      // State variables to manage dropdown behavior
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const [selectedOption, setSelectedOption] = useState('');
      const [selectedDate, setSelectedDate] = useState(null);
      const [selectedDate1, setSelectedDate1] = useState(null);
      const dropdownRef = useRef(null);
      const [types, setTypes] = useState([]);
      const [setError, error] = useState('');
      const [selectedImage, setSelectedImage] = useState(null);

      const [users, setUsers] = useState([]);
      
      
 
   const [loading, setLoading] = useState(false);
   const onClickHandler = () => navigate(`/pageFrontView`)
 
    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
     setIsDropdownOpen(!isDropdownOpen);
   };
 
   // Function to handle option selection
   const handleOptionSelect = (option) => {
     setSelectedOption(option);
     setIsDropdownOpen(false);
     
   };
 
      // Function to handle date selection
      const handleDateSelect = (date) => {
       setSelectedDate(date);
       setIsDropdownOpen(false);
   };
 
 
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
  
   //Second Dropdown
 
         // State variables to manage dropdown behavior
         const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
         const [selectedOption1, setSelectedOption1] = useState('');
         const [selectStage, setSelectStage] = useState('');
         const dropdownRef1 = useRef(null);
 
         useEffect(() => {
          const fetchTypes = async () => {
              try {
                  const response = await axios.get(`${API_BASE_URL}/api/hub/files/${id}`);
                  console.log(response.data);
                  setTypes(response.data);
                 
              } catch (error) {
                  console.error('Error fetching types:', error);
                  
                 
              }
          };
       
          fetchTypes();
       }, []);


 


  return (

   
    <div className="">
    
    <div className='const'>
      <div className='row'>
      
        <div className='text-center'>
              <p className='taskHeader'>Craddule Hub</p>
              {/* <p>Here you can create and assign task</p> */}
        </div>
          
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

      </div>
 

   
  );
};
Modal.setAppElement('#root');
export default Craddule;
