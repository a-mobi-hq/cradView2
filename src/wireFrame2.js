import React, { useState, useEffect, useRef } from 'react';
import bci from './images/bc.png'; 
import Rect from './images/Rect.png'
import present from './images/present.png';
import Rectan from './images/Rectan.png';
import proto from './images/proto.png';
import wire from './images/wire.png'
import wire1 from './images/wire1.jpeg'
import wire2 from './images/wire2.jpeg'
import wire3 from './images/wire3.png'
import wire4 from './images/wire4.jpeg'
import wire5 from './images/wire5.jpeg'
import wire6 from './images/wire6.jpeg'
import wire7 from './images/wire7.jpeg'
import wire8 from './images/wire8.jpeg'
import EditModal from './component/editModal';
import Header from './component/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'; // Import the pen icon
import UploadLogoModal from './component/brandLogoModal'
import Menu from './component/menu';
import cloud from './images/cloud.png'
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './config/apiConfig';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { jwtDecode } from "jwt-decode";




function WireFrame ()  {
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/pageFrontView`)
    const [isOpen, setIsOpen]= useState(false);
    const [isOpen1, setIsOpen1]= useState(false);

    const [displayedImage, setDisplayedImage] = useState(null);
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


const prototypeType = "Wireframe";
const projectId = localStorage.getItem('nProject');
const fetchImageDetails = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/prototype/upload/type/${projectId}/${prototypeType}`, {
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
    

    
      const handleSubmit = (e) => {
        e.preventDefault();
      };
    


      const deletePrototypeById = async () => {
        setLoading(true);
        console.log("Deleting Images..")
        try {
          const response = await fetch(`${API_BASE_URL}/api/prototype/upload/${activeImageId}`, {
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
    
    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
        <img src={bci} className='bcA'></img>
                <p className='centerH'>WireFrame</p>
                <p className='centerHp'>Here you get the wireframe of your product</p>
        <div className='centerC'>
            <div className='text-center'>
                <div className='container-boxkk'>
                <div className="centered-div">
                <p className='uploadTxt'>Upload
                <img src={cloud} className='imgC' onClick={()=>setIsOpen(true)} type="button"></img>
                </p>
               </div>
               <div className= "galery-container">
                <div className="image-grid">
                {imageDetails.map((imageDetails, index) => (
                <img  src={API_BASE_URL+`/images/${imageDetails.hubFile}`}  alt="Image 1"
          className="gallery-image imgA"
          onClick={() => handleImageClick(API_BASE_URL+`/images/${imageDetails.hubFile}`, imageDetails._id, imageDetails.sequence, imageDetails.imageName)}></img>
        ))}
                  </div>
                </div> 
                {displayedImage && (
                <div className="diplayImage">
                <img src={displayedImage} alt="Displayed Image" className="displayed-image"></img>
                
                <div ref={dropdownRef} className="dropdown4 editPen">
                <div className={`select4 ${isDropdownOpen ? 'select-clicked8' : ''}`} onClick={toggleDropdown}>
                    <span classname="selected">{selectedOption ||<FontAwesomeIcon icon={faEdit} className="edit-icon"/>}</span>
                </div>
                <ul className={`menu7 ${isDropdownOpen ? 'menu-open7' : ''}`}>
                    <li type='button' className='imgItem' onClick={()=>setIsOpen1(true)}>Edit</li>
                    <hr className='listMar1'></hr>
                    <li type='button' className='imgItem' onClick={deletePrototypeById}>Delete</li>
                </ul>
            </div>
                </div>
                )}
            <UploadLogoModal open={isOpen} onClose={() => setIsOpen(false)}>

</UploadLogoModal>
<EditModal open={isOpen1} onClose={() => setIsOpen1(false)} id={activeImageId} imageName={activeImageName} sequence={activeImageSequence} type={prototypeType}>

</EditModal>
        </div>          
          
  </div>
</div>
<button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>

  </div>
  </div>
  </div>
  </>
    );
}

export default WireFrame
