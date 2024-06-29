import React, { useState } from 'react';
import cloud from './cloud.png'; 
import ReactDOM from "react-dom";
import API_BASE_URL from './apiConfig';
import { Toaster, toast } from 'sonner'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { jwtDecode } from "jwt-decode";




export default function ImageModal ( {open, onClose})  {

  
   const [isOpen, setIsOpen]= useState(false);
   const [selectedImage, setSelectedImage] = useState(null);
   const [errorMessage, setErrorMessage] = useState('');



    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    

      const navigate = useNavigate()
      const onClickHandler = () => navigate(`/pageFrontView`)
      if(!open) return null
   
      const access_token = localStorage.getItem('access_token');
       const decodedToken = jwtDecode(access_token);
       const userId = decodedToken.userId;  


       const handleFileChange = (e) => {
         setSelectedFile(e.target.files[0]);
       };
     
       const handleUpload = async () => {
         if (!selectedFile) {
           console.error('No file selected');
           return;
         }
         
     console.log(selectedFile);
         const formData = new FormData();
         formData.append('image', selectedFile);
         console.log(formData);

         try {
           const response = await axios.post(API_BASE_URL+'/api/user/upload', formData, {
             headers: {
               'Content-Type': 'multipart/form-data'
             }
           });
           console.log(response.data);
           // Handle successful upload
         } catch (error) {
           console.error('Error uploading image:', error);
           // Handle error
         }
       };
 

   return ReactDOM.createPortal (
      <>
        <div className='modalOv'>
           <div className='modalSt2'>
                <p className='closeIcon' type='button' onClick={onClose} >X</p>
              <p className='txt2a'>Drag and Drop or Choose from Files</p>
              <hr></hr>
              <div className='uploadImage1'>
              <input 
              className='txtCa'
              type="file" 
              name='image'
              onChange={handleFileChange} 
              />
              <img src={cloud} className='logoIcon1'></img>
               {/* <p className='txtC'>Drag and drop </p>*/}
               {/* <p className='txt1'>Maximum 50MB file size <br></br>JPG, PNG, or GIF format</p>  */}           
           </div>
          
           <div className='shareImageDiv'><button type="submit" className="btn btn-primary curveImage" disabled={loading} onClick={handleUpload}>{ loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
                { !loading && <span>Upload Image</span>}
                
              </button>
                    </div>

           </div> 
           
             <Toaster  position="top-right" />
        </div>
        </>,
        document.getElementById('portal')
     );
}