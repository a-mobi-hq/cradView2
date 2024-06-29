import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { text } from '@fortawesome/fontawesome-svg-core';
import { Toaster, toast } from 'sonner'
import API_BASE_URL from './config/apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
function SignUp() {

  const location = useLocation();

  // Construct the full URL
  const link = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;
  console.log(link);
 
    const [showPassword, setShowPassword] = useState(false);

    const [showCPassword, setShowCPassword] = useState(false);
    
  
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    const handleToggleCPassword = () => {
      setShowCPassword(!showCPassword);
    };
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const onClickHandler = () => navigate(`/login`)


    //Register

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [formData, setFormData] = useState({
        link : link,
        firstName: '',
        email: '',
        phoneNumber: '',
        speciality: '',
        experience: '',
      });
    
      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        
        createUser(formData);
    
       
      };

      
    
      const createUser = async (data) => {
        setLoading(true);
        try {

        
          
        console.log(data);
       
          const response = await fetch(API_BASE_URL+'/api/share/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

         // const data = response.json();
    
          if (response.status === 200) {
            console.log(response.status);
            console.log(response);

            const responseData = await response.json(); // Parse JSON response
      
      // Access the access_token from the response data
      const { access_token } = responseData.data;

      // Do something with the access_token
      console.log('Access Token:', access_token);
      localStorage.setItem('access_token', access_token);
      setLoading(false);      
      navigate(`/home`);      
            console.log('User created successfully');
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

  return (

<div className='container'>
   <div className='wholeP'>
    <div className='row'>
        <div className='col-md-6'>
          <div className='loginH'>
            <p className='lgT'>Sign Up</p>
            <p className='lgT2'>Become a Reviewer</p>

            <form onSubmit={handleSubmit}>
            <div className="inputs-container">
                <label htmlFor="email" className='lab'>First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="custom-input"
                />

                

                <label htmlFor="email" className='lab'>Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="custom-input"
                />


                <label htmlFor="phone" className='lab'>Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="custom-input"
                />

               
              <label htmlFor="speciality">Select Expertise:</label>
                    <select
                      id="speciality"
                      value={formData.speciality}
                      onChange={handleChange}
                      className="custom-input"
                    >
                      <option value="">Select Expertise</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Engineer">Engineer</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Lawyer">Lawyer</option>
                      <option value="Artist">Artist</option>
                      {/* Add more professions as needed */}
                    </select>

                <label htmlFor="phone" className='lab'>Years of Experience</label>
                <input
                  type="number"
                  id="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="custom-input"
                />


                
                </div>
               

              <button className='btn loginBtn' type="submit" disabled={loading}>
              { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
                { !loading && <span>Proceed</span>}
                
              </button>
              </form>
             
              <p className='lab'>Already on Craddule? <a href=''onClick={onClickHandler}>Login</a> now!</p>
          </div>
          
        </div>

        <div className='col-md-6'>
          <div className='halfWhS'>
            <div className='blurry'>
              <p>You will never do anything in this world without courage. It is the greatest quality of the mind next to honor</p>

              
            </div>
          </div>
        </div>
    </div>
    
      
   </div>
   <Toaster  position="top-right" />
</div>
  );
}

export default SignUp;
