import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { text } from '@fortawesome/fontawesome-svg-core';
import { Toaster, toast } from 'sonner';
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from './config/apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

function CreateGo() {



    const navigate = useNavigate()
    const onClickHandler = () => navigate(`/laodingPage`)


    //Register

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const access_token = localStorage.getItem('access_token');
      const decodedToken = jwtDecode(access_token);
      const loggedInUserId = decodedToken.userId;

    const [formData, setFormData] = useState({
        goGate: '',
        phase: '',
        stage: '',
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        CreateGo(formData);
      };
    
      const CreateGo = async (data) => {
        setLoading(true);
        try {

        console.log(data);
        console.log(JSON.stringify(data));
          const response = await fetch(API_BASE_URL+'/api/gates', {
            method: 'POST',
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

            const responseData = await response.json();
            const projectId = responseData.data._id;
            setLoading(false);
            console.log(responseData); // Parse JSON response
            toast.success("go created successfully");
            console.log('go created successfully');

          } else {
            const result = await response.json();
            setLoading(false);
            toast.error(result['error']);
              console.error('Error:', result['error']);
          }
        } catch (error) {
          setLoading(false);
          toast.error(error);
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
            <p className='lgT2'>Start your journey with Craddule</p>

            <form onSubmit={handleSubmit}>
            <div className="inputs-container">
                <label htmlFor="email" className='lab'>Gate</label>
                <input
                  type="text"
                  id="goGate"
                  value={formData.goGate}
                  onChange={handleChange}
                  className="custom-input"
                />

                
              </div>

              <div className="inputs-container">
                <label htmlFor="email" className='lab'>phase</label>
                <input
                  type="text"
                  id="phase"
                  value={formData.phase}
                  onChange={handleChange}
                  className="custom-input"
                />

                
              </div>


              <div className="inputs-container">
                <label htmlFor="email" className='lab'>Stage</label>
                <input
                  type="text"
                  id="stage"
                  value={formData.stage}
                  onChange={handleChange}
                  className="custom-input"
                />
                
              </div>

              
              <button type="submit" className='btn loginBtn' disabled={loading}>
              
                { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
                { !loading && <span>Proceed</span>}
              
              </button>
              </form>
             
             
          </div>
          
        </div>

        <div className='col-md-6'>
          <div className='halfWh'>
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

export default CreateGo;
