import React, { useState } from 'react';
import closeB from './closeB.png'
import ReactDOM from "react-dom";
import API_BASE_URL from './apiConfig';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner'
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'




export default function DeleteModal ({open, onClose})  {
  
  const navigate = useNavigate()
    const [isOpen, setIsOpen]= useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [userId, setUserId] = useState('');
    
   

    
    //Register
    
    const [loading, setLoading] = useState(false);
      
      const onClickHandler = () => navigate(``)
      if(!open) return null
      const access_token = localStorage.getItem('access_token');
      const decodedToken = jwtDecode(access_token);
      const loggedInUserId = decodedToken.userId;
    
      
      const handleDelete = (e) => {
        setUserId(e.target.value);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
      };
    
      const deleteUser = async () => {
        setLoading(true);
        console.log("Deleting User..")
        try {
          const response = await fetch(API_BASE_URL+'/api/user/'+loggedInUserId, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`,
            },
          });
      
          if (response.status === 200) {
            console.log(response.status);
            console.log(response);
            const responseData = await response.json(); 
            console.log(responseData);
            // Additional handling if needed

            const { token } = responseData; // Access token directly from response
            setLoading(false);
            // Save access token to local storage
            localStorage.removeItem('access_token', token);
            console.log('Access Token:', token);
            localStorage.removeItem('access_token', token);
                  console.log('Logged successfully');
                    navigate(`/signUp`)
        

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
      

    return ReactDOM.createPortal (
      <>
        <div className='modalOv' >
           <div className='modalSt'>
              <div className='aboutDelete'>              
                <p className='inviteTi'>Delete Account</p>
              <p className='subInvite'>Are you sure you want to permanently Delete your Account?</p></div>
                <div className='deleteOption'>
                <form onSubmit={handleSubmit}> 

               {/* <button  className="btn btn-primary deleteButton1" onClick={onClickHandler}>Delete Account</button>*/}
                <button  className="btn btn-primary deleteButton1" disabled={loading} onClick={deleteUser}>
              { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
              { !loading && <span>Delete Account</span>}
              
            </button>
            
                <button className="btn btn-primary deleteNoButton" onClick={onClose}>No</button>
            </form>
                </div>
               
           </div>
           
           </div> 

          </>,   
            document.getElementById('portal')      
     );
}
