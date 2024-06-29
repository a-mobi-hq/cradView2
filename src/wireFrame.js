import React, { useState, useEffect, useRef } from 'react';
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 
import Rect from './images/Rect.png'
import Header from './component/header';
import SideMenu2 from './component/sideMenu2';
import Rectan from './images/Rectan.png';
import plan from './images/plan.png';
import model from './images/model.png'; 
import proto from './images/proto.png';
import present from './images/present.png';
import cloud from './images/cloud.png'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from './config/apiConfig';
import { Toaster, toast } from 'sonner';
import EditModal from './component/editModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'; // Import the pen icon
import TopMenu from './component/topMenu';



function Wireframe() {

  const navigate = useNavigate()

  const onClickHandler = () => navigate(``)
  const [isOpen, setIsOpen]= useState(false);
  const [displayedImage, setDisplayedImage] = useState(null);
  const [isOpen1, setIsOpen1]= useState(false);
  const [imageDetails, setImageDetails] = useState([]);
  const [imagePath, setImagePath] = useState('');
  const [loading, setLoading] = useState(false);




 // State variables to manage dropdown behavior
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 const [selectedOption, setSelectedOption] = useState('');
 const dropdownRef = useRef(null);
 const access_token = localStorage.getItem('access_token');
 const decodedToken = jwtDecode(access_token);
 const [ activeImageId, setActiveImageId ] = useState('');
 const [ activeImageSequence, setActiveImageSequence ] = useState('');
 const [ activeImageName, setActiveImageName] = useState('');


 const userId = decodedToken.userId;

  // Close dropdown when clicking outside of it 1
useEffect(() => {
const handleClickOutside = (event) => {
  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
  }
};

document.addEventListener('mousedown', handleClickOutside);
return () => {
  document.removeEventListener('mousedown', handleClickOutside);
};
}, []);

const [showScrollableDiv, setShowScrollableDiv] = useState(false);

const handleToggle = () => {
  setShowScrollableDiv(!showScrollableDiv);
};

const WireframeType = "Wireframe";
const projectId = localStorage.getItem('nProject');
const fetchImageDetails = async () => {
      try {
          const response = await fetch(`${API_BASE_URL}/api/prototype/upload/type/${projectId}/${WireframeType}`, {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${access_token}`,
              },
          });

          if (response.ok) {
              const data = await response.json();
              console.log(data);

              setImageDetails(data)
              
              if (data.image) {
                  let img = API_BASE_URL+'/images/'+data.image;
                  console.log(data.image);
                  console.log(img);
                  setImagePath(img);
              }
              console.log(data.image);
              // Handle the fetched data here
          } else {
              const errorData = await response.json();
              console.error('Failed to fetch image details:', errorData);
          }
      } catch (error) {
          console.error('Error fetching image details:', error);
      }
  };
useEffect(() => {
     
      
     
  
      fetchImageDetails();
  }, []);

  

 // Function to toggle dropdown visibility
 const toggleDropdown = () => {
   setIsDropdownOpen(!isDropdownOpen);
 };

 // Function to handle option selection
 const handleOptionSelect = (option) => {
   setSelectedOption(option);
   setIsDropdownOpen(false);
 };

  const handleImageClick = (image, id, sequence, imageName) => {
    setDisplayedImage(image);
    setActiveImageId( id );
    setActiveImageSequence( sequence);
    setActiveImageName( imageName )
    console.log(activeImageName)
    console.log(activeImageSequence)
    console.log(activeImageId)
    console.log( id )
  };
  
  const handleAdd = () => {
    localStorage.setItem('selectedPrototype', 'Wireframe');
    navigate('/upload');
  };
  
    const handleSubmit = (e) => {
      e.preventDefault();
    };
  


    const deleteWireframeById = async () => {
      setLoading(true);
      console.log("Deleting Images..")
      try {
        const response = await fetch(`${API_BASE_URL}/api/Wireframe/upload/${activeImageId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
          },
        });
    
        if (response.status === 200) {
          console.log(response.status);
          console.log(response);
          window.location.reload();

          const responseData = await response.json(); 
          console.log(responseData);
          // Additional handling if needed
                console.log('Your image has been deleted successfully');
                fetchImageDetails();
      

        } else {
          const result = await response.json();
          setLoading(false);
          toast.error(result['error']);
          console.error('Error:', result['error']);
        }
        console.log(response)
      } catch (error) {
        setLoading(false);
        console.error('An error occurred:', error);
      }
    };


    const formatDateAndTime = (dateString) => {
      const date = new Date(dateString);
      const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const formattedDate = date.toLocaleDateString();
      return { time, formattedDate };
    };

   

      return (

       
       <>
      
        <TopMenu />
    <div className='container2'>
         <SideMenu2 />    
         <div className="main-content">
         <div className='headermm'>
            <p>Wireframe</p>
          </div> 
        
         <div className={`main-content2 ${showScrollableDiv ? 'shrink' : ''}`} style={{paddingTop:0}}>

          <div className='surroundd'>

          
            <button className='addrt' onClick={handleAdd} type='button'>Add</button>

            <div className="row">
               
            {imageDetails.map((imageDetail, index) => {
        const { time, formattedDate } = formatDateAndTime(imageDetail.timeSent);
        return (

          <div className="col-md-3">
              <div className="image-card">
                  <img src={API_BASE_URL+`/images/${imageDetail.hubFile}`} alt="pror" className="image-card-img" />
                  <div className="image-card-overlay">
                      <div className="row">
                          <div className="col-md-9">
                              <p className="image-name">{imageDetail.hubFileName}</p>
                              <p className="image-uploader">{imageDetail.userId.firstName}</p>
                          </div>

                          <div className="col-md-3">
                              <p className="image-time">{time}</p>
                          </div>
                      </div>
                  
                  
                  </div>
                  <FontAwesomeIcon icon={faEdit} className="edit-icon" />
              </div>
          </div>

              
              // <div className="col-md-3">
              //       <div className="image-card2">
              //           <img src={API_BASE_URL+`/images/${imageDetail.hubFile}`} alt="pror" className="image-card-img" />

              //           <p>{imageDetail.hubFileName}</p>
                       
              //           {/* <FontAwesomeIcon icon={faEdit} className="edit-icon" /> */}
              //       </div>
              //   </div>

                );
                })}

             

                

            </div>
        
      
            </div>
         </div>

         <div className={`scrollable-div ${showScrollableDiv ? 'show' : ''}`}>
            <button className="close-button" onClick={handleToggle}>X</button>
            <div className='qulis'>
                <p style={{marginBottom:7}}>What existing solutions or competitors are in this space, and how does your idea differentiate?</p>
            </div>
            <div className='qulis'>
                <p style={{marginBottom:7}}>What existing solutions or competitors are in this space, and how does your idea differentiate?</p>
            </div>
            <div className='qulis'>
                <p style={{marginBottom:7}}>What existing solutions or competitors are in this space, and how does your idea differentiate?</p>
            </div>
            <div className='qulis'>
                <p style={{marginBottom:7}}>What existing solutions or competitors are in this space, and how does your idea differentiate?</p>
            </div>
            <div className='qulis'>
                <p style={{marginBottom:7}}>What existing solutions or competitors are in this space, and how does your idea differentiate?</p>
            </div>
            <div className='qulis'>
                <p style={{marginBottom:7}}>What existing solutions or competitors are in this space, and how does your idea differentiate?</p>
            </div>
            
            
            {/* Add more content as needed */}
        </div>
    </div>
</div> 
</>
      );
    }




  export default Wireframe;
