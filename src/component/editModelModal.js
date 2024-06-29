import React, { Component, useState, useEffect } from "react";
import cloud from './cloud.png'; 
import ReactDOM from "react-dom";
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './apiConfig';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { jwtDecode } from "jwt-decode";




export default function EditModelModal ( {open, onClose, imageName, sequence, id, type, subtype})  {
  const [isOpen, setIsOpen]= useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageCounter, setImageCounter] = useState(0); // 
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');  

  const access_token = localStorage.getItem('access_token');

  const [formData, setFormData] = useState({
    imageName: '',
   sequence: ''
 });

 
 const prototypeType = "3D Design";
 const prototypeSubtype = "frontview";
const projectId = localStorage.getItem('nProject');
 useEffect(() => {
    // Simulating fetching user details from an API
    const fetchImageDetails = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/prototype/upload/type/subtype/${projectId}/${prototypeType}/${prototypeSubtype}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`,

            },
          });
            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                // Update user details state with fetched data
                // const { imageName, sequence} = data;
                setFormData({ imageName, sequence, id, type, subtype});
                console.log(imageName)
                console.log(sequence)
              
            } else {
                const data = await response.json();
                console.log(data);
                console.error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    fetchImageDetails();
}, [imageName, sequence]);
 

const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    updatePrototypeById(formData);

   
  };

  const updatePrototypeById = async (data) => {
    setLoading(true);
    console.log("data");
    console.log(data);

    console.log("at change")
    try {
        console.log(id);
      const response = await fetch(API_BASE_URL+`/api/prototype/upload/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify(data),
      });

     // const data = response.json();
      
      if (response.status === 200) {
        console.log(response.status);
        console.log(response);
        setSuccessMessage("message")
        const responseData = await response.json(); // Parse JSON response
        console.log(responseData)
  
  setLoading(false);      

      } else {
        const result = await response.json();
        setLoading(false);
        toast.error(result['error']);
          console.error('Error:', result['error']);
        
      }
    } catch (error) {
      setLoading(false);
      console.error('An error occurred:', error);
    }
  };

  if(!open) return null

   return ReactDOM.createPortal (
      <>
        <div className='modalOv' >
           <div className='modalSt'>
                <p className='closeIcon' type='button' onClick={onClose} >X</p>
              <p className='txt2'>Edit Images</p>
              <hr></hr>

              { successMessage &&  <p className="createER">Image updated successfully</p>}

              <form onSubmit={handleSubmit}>

              <div className='uploadLogo'>
              <div className='ProtoImage'>
              <input 
              className='typeInput'
              type="text" 
              id='imageName'
              value= {formData.imageName}
              placeholder="Enter image name"
               onChange={handleChange} // Update imageName state on input change
              />
               <input 
              className='typeInput'
              type="number" 
              id='sequence'
              inputMode="numeric"
              value= {formData.sequence}
              placeholder="Enter the image number"
              onChange={handleChange} // Update imageName state on input change
              />
               </div>
              {/* <input 
              className='txtCa'
              type="file" 
              name='image'
              onChange={handleFileChange} 
              /> */}

                <button className="btn btn-primary curveLogo" type="submit">Submit</button>
           </div>
           </form>
           </div>  
           
           <Toaster  position="top-right" />        
        </div>
        
        </>,
        document.getElementById('portal')
     );
}