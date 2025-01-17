import React, { useState } from 'react';
import ReactDOM from "react-dom";
import ViewSharedModal from './viewSharedModal';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faCopy } from '@fortawesome/free-solid-svg-icons'
import API_BASE_URL from '../config/apiConfig';
import API_BASE_WEB_URL from '../config/apiConfigW';
import { Toaster, toast } from 'sonner'
import { jwtDecode } from "jwt-decode";

export default function ShareModal ({open, onClose, circles, phaseNames})  {
  const [isOpen, setIsOpen]= useState(false);
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState('');
  const navigate = useNavigate()
  const projectId = localStorage.getItem('nProject');
  const [formData, setFormData] = useState({
    email: '',
    projectId: projectId,
    link: ''
  });

  const onClickHandler = () => navigate(`/shareFile`)
 if(!open) return null

 
    const token = localStorage.getItem('access_token'); 
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    
    
    

    
 const share = async () => {
  setLoading(true);
  try {
      const phases = circles
        .map((isFilled, index) => (isFilled ? phaseNames[index] : null))
        .filter(phase => phase !== null);

        console.log(userId);

        const timestamp = new Date().getTime();
        const randomString = Math.random().toString(36).substring(2, 8);
        const uniqueCode = timestamp.toString() + randomString;
        const link = "/share/start/"+uniqueCode;

      const response = await fetch(API_BASE_URL + '/api/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ projectId, phases,userId,link }),
      });

      if (response.status === 200) {
        setLoading(false);
        console.log(response);
        setLink('http://159.223.7.210:3000' + link);
        //setLink(API_BASE_WEB_URL+link);
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


const copyToClipboard = () => {
  navigator.clipboard.writeText(link).then(() => {
    alert('Link copied to clipboard!');
  }).catch((error) => {
    console.error('Failed to copy the link: ', error);
  });
};

const createReview = async (data) => {
  setLoading(true);

  try {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 8);
    const uniqueCode = timestamp.toString() + randomString;
    const link = "/share/start/" + uniqueCode;

    console.log(link);

    const phases = circles
    .map((isFilled, index) => (isFilled ? phaseNames[index] : null))
    .filter(phase => phase !== null);


    const updatedFormData = {
      ...data,
      link: link,
      uniqueCode: uniqueCode,
      projectId: projectId,
      email: data.email,
      phases:phases,
    };

    const response = await fetch(API_BASE_URL + '/api/share/review', {
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
      setLink(API_BASE_WEB_URL + link);
    } else {
      const result = await response.json();
      setLoading(false);
      console.error('Error:', result['error']);
    }
  } catch (error) {
    setLoading(false);
    console.error('An error occurred:', error);
  }
};

const handleSubmit = (e) => {
e.preventDefault();

createReview(formData);

};

const handleClose = () => {
  setLink('');
  onClose();
};

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.id]: e.target.value,
  });
};

 return ReactDOM.createPortal (
  <>
        <div className='modalOv' >
           <div className='modalSt'>
                <p type='button' onClick={handleClose} className='closeIcon'>X</p>
              <p className='txt2'>Send/ Share File</p>
              <hr></hr>
              <div className='sendBox'>
                <p className='share'>Share this file</p>
                <p className= 'share1'>Anyone with the link can view</p>
                {link && (
                <p className='copyP'>{link}
                <button className='cop' onClick={copyToClipboard}>
                   Copy
                </button>
                </p>
                )}
               <div className='text-center'>

               <form onSubmit={handleSubmit}>
              <div className='emailInvite1'>
                <div className='enterEmail'>
                <p className='email2'>Email</p>
                <input 
                  type="text" 
                  className='enterE2' 
                  placeholder="Email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                ></input>
                {/*<textarea className='enterE'></textarea>*/}
                </div>


               
               

                </div>

                

               
           
               
            <button className="btn btn-primary curveSb shreB" onClick={share}>
             
              { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
                { !loading && <span> Create Link</span>}
              </button>

              <button className="btn btn-primary curveSb shreB" typeof='submit' style={{marginLeft:5}}>
             
              { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
                { !loading && <span> Send To Email</span>}
              </button>
              </form>
           </div>
           {/* <ViewSharedModal open={isOpen} onClose={() => setIsOpen(false)}>

          </ViewSharedModal> */}
           </div>
           </div>          
        </div>
        </>,
         document.getElementById('portal')

     );
}

