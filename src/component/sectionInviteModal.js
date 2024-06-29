import React, { useState, useEffect, useRef } from 'react';
import closeB from './closeB.png'
import ReactDOM from "react-dom";
import API_BASE_URL from '../config/apiConfig';
import API_BASE_WEB_URL from '../config/apiConfigW';
import { Toaster, toast } from 'sonner'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'


export default function SectionInviteModal ({open, onClose})  {

      // State variables to manage dropdown behavior
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const [selectedOption, setSelectedOption] = useState('');
      const dropdownRef = useRef(null);
      const [linkD, setLink] = useState('');

    
      // Function to toggle dropdown visibility
      const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };
    
      // Function to handle option selection
      const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
        
      };



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



    const [isOpen, setIsOpen]= useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const onClickHandler = () => navigate(``)

    const projectId = localStorage.getItem('nProject');
    const token = localStorage.getItem('access_token'); 
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    
  
    const [formData, setFormData] = useState({
      email: '',
      projectId: projectId,
      link: ''
    });

 const createTeam = async (data) => {
  setLoading(true);
  
  try {

    
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 8);
    const uniqueCode = timestamp.toString() + randomString;
    const link = "/login/start/"+uniqueCode;
    
    console.log(link);
    const updatedFormData = {
      ...formData,
      link: link
    };
      const response = await fetch(API_BASE_URL + '/api/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.status === 200) {
        setLoading(false);
        console.log(response);
        setLink(API_BASE_WEB_URL+link);
      } else {
            const result = await response.json();
            setLoading(false);
            //toast.error(result['error']);
              console.error('Error:', result['error']);
      }
  } catch (error) {
    setLoading(false);
    console.error('An error occurred:', error);
  }
};
const handleSubmit = (e) => {
  e.preventDefault();
  
  createTeam(formData);

 
};


const copyToClipboard = () => {
  navigator.clipboard.writeText(linkD).then(() => {
    alert('Link copied to clipboard!');
  }).catch((error) => {
    console.error('Failed to copy the link: ', error);
  });
};

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.id]: e.target.value,
  });
};

const handleClose = () => {
  setLink('');
  onClose();
};
    if(!open) return null
    return ReactDOM.createPortal (
      <>
        <div className='modalOv' >
           <div className='modalSt1'>
               <img src={closeB} className='closeB' onClick={handleClose} type='button'></img>

               <div className='titleCenter'>
              <p className='txtA'>Invite</p>
              <p className='txtB'>Manage, assign and send invites</p></div>
             
              <hr></hr>
              {linkD && (
                <p className='copyPp'>{linkD}
                <button className='cop' onClick={copyToClipboard}>
                   Copy
                </button>
                </p>
                )}
              <form onSubmit={handleSubmit}>
              <div className='emailInvite1'>
                <div className='enterEmail'>
                <p className='email'>Email</p>
                <input 
                  type="text" 
                  className='enterE' 
                  placeholder="Email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                ></input>
                {/*<textarea className='enterE'></textarea>*/}
                </div>


               
               

                </div>

                

                {/*<button className="btn btn-primary dropdown-toggle buttonSelect" type="button" data-toggle="dropdown">Select Project</button>*/}
                <div className='shareButtonDiv'>
           <button className="btn btn-primary curveInviteA" type='submit'>
           { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
                { !loading && <span>Add</span>}
            </button>
            
           </div>
           </form>
         
           </div>          
        </div>

        </>,
        document.getElementById('portal')

     );
}

