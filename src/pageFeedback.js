import React, { useState, useEffect } from 'react';
import Header from './component/header';
import Menu from './component/menu';
import ShareModal from './component/shareModal';
import API_BASE_URL from './config/apiConfig';

import { useNavigate } from 'react-router-dom';
import ImageModal from './component/imageModal';
import { Toaster, toast } from 'sonner'
import { jwtDecode } from "jwt-decode";


function PageFeedback() {

  const access_token = localStorage.getItem('access_token');
  const decodedToken = jwtDecode(access_token);
  const userId = decodedToken.userId;
  const projectId = localStorage.getItem('nProject');

  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    // Simulating fetching user details from an API
    const fetchFeedback = async () => {
        try {
          const response = await fetch(API_BASE_URL+'/api/feedback/'+projectId, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`,
            },
          });
            if (response.status === 200) {
                const data = await response.json();
                console.log(data.data);

                setFeedback(data.data);
               
               
            } else {
                const data = await response.json();
                console.log(data);
                console.error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    fetchFeedback();
}, []);

  return (
    <>
      <div className='container-fluid'>
        <Header />
        <div className='row'>
          <Menu />

          <div className='col-md-9'>
            <div className='centerC'>
              <div className='text-center'>
                <p className='centerH'>Feedback</p>
                
              </div>
              <div className='BoxPhase1'>
             
              {feedback.map((feedback) => (
              <div className='feedS'>
                <p className='feedP'>{feedback.phase} </p>
                <p>{feedback.feedback} </p>
                <p className='feedP2'>{feedback.userId.firstName} </p>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageFeedback;