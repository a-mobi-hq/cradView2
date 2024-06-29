import React, { useState }from  "react";
import ReactDOM from "react-dom";
import { jwtDecode } from "jwt-decode";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

export default function Modal({ open, onClose}){

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');  
    const [formData, setFormData] = useState({
        projectName: '',
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        createProject(formData);
      };
    
      const createProject = async (data) => {
        setLoading(true);
        try {

       const access_token = localStorage.getItem('access_token');
       const decodedToken = jwtDecode(access_token);
       const userId = decodedToken.userId;
  
       console.log(userId);
       // Include user ID in the data object
       data.userId = userId;  
        console.log(data);
        console.log(JSON.stringify(data));
          const response = await fetch(API_BASE_URL+'/api/project', {
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
            setLoading(false);
            const projectId = responseData.data._id;
            localStorage.setItem("nProject",projectId);
            navigate(`/loading`);
            console.log(responseData); // Parse JSON response
            console.log('Project created successfully');

          } else {

            const result = await response.json();
            setLoading(false);
            setErrorMessage(result['error']);
            setTimeout(() => {
                setErrorMessage('');
              }, 5000);
           
              console.error('Error:', result['error']);
          }
        } catch (error) {
            setLoading(false);
            setErrorMessage(error);
            setTimeout(() => {
                setErrorMessage('');
              }, 5000);
          console.error('An error occurred:', error);
        }
      };
    if(!open) return null
    return ReactDOM.createPortal(
        <>
            <div className="modalOv"></div>
            <div className="modalSt">
             <p onClick={onClose} className="">X</p>   
             <form onSubmit={handleSubmit}>
            <div className="input-containerC">
                {/* <label htmlFor="projectName" className="creT">Create Project</label> */}
                <input
                    type="text"
                    id="projectName"
                    className="bottom-border-input"
                    placeholder="Project Name"
                    value={formData.projectName}
                    onChange={handleChange}
  
                />
                </div>
                
                <button type="submit" className="createBT" disabled={loading}>
                { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin colw'/>}
                { !loading &&  <span className='iconSB'><span className="iconh"><HiOutlineArrowSmallRight /></span></span>}

                </button>
                
                </form>
                {/* <button onClick={onClose}>Close</button> */}

            </div>
        </>,
        document.getElementById('portal')
    )

}