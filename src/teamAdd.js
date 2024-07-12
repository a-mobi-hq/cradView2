import React, { useState,useEffect,useRef } from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from './config/apiConfig';
import { Toaster, toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch,faChevronDown,faBold, faItalic, faUnderline, faStrikethrough, faQuoteRight, faCode, faLink, faImage, faTextHeight, faListOl, faListUl, faSubscript, faSuperscript, faOutdent, faIndent, faAlignRight, faHeading } from '@fortawesome/free-solid-svg-icons';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { jwtDecode } from "jwt-decode";
import ImageResize from 'quill-image-resize-vue';
import Tooltip from './component/tooltip';
import ImagePopup from './component/cradduleModal';
import axios from 'axios';
import nspell from 'nspell';
import API_BASE_WEB_URL from './config/apiConfigW';
import SideMenu2P from './component/sideMenu2P';

function ScrapView ({ htmlContent })  {
    
    const navigate = useNavigate()

     const onClickHandler = () => navigate(`/video`);
     const [images, setImages] = useState([]);
     const [types, setTypes] = useState([]);
  const [showImagePopup, setShowImagePopup] = useState(false);
     const [answers, setAnswers] = useState([]);
     const [answersV, setAnswersV] = useState([]);
     const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const projectId = localStorage.getItem('nProject');
  const [scrap, setScrap] = useState('');

   const access_token = localStorage.getItem('access_token');
  console.log(access_token);
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId;
    console.log(userId);

  const questionType ="BusinessCaseBuilder";
  const questionSubType ="Introduction";
  const [value, setValue] = useState('');
  const [misspelledWords, setMisspelledWords] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionBoxPosition, setSuggestionBoxPosition] = useState({ top: 0, left: 0 });
  const [selectedWord, setSelectedWord] = useState(null); 
  const [team, setteam] = useState([]);
  const [linkD, setLink] = useState('');

  const handleDelete = (id) => {
  
    console.log(id);
  };

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
      const link = "/login/start/" + uniqueCode;
  
      console.log(link);
  
      const updatedFormData = {
        ...data,
        link: link,
        uniqueCode: uniqueCode,
        projectId: projectId,
        email: data.email
      };
  
      const response = await fetch(API_BASE_URL + '/api/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify(updatedFormData),
      });
  
      if (response.status === 200) {
        setLoading(false);
        console.log(response);
        setLink('http://159.223.7.210:3000' + link);
        //setLink(API_BASE_WEB_URL + link);
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
  

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const scrapResponse = await fetch(API_BASE_URL + `/api/team/${projectId}`, {
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${access_token}` // Include the token in the request headers
            }
          });
        
      if(scrapResponse.status === 200) {
        // If summary exists, fetch the summary data
        const dataS = await scrapResponse.json();
        console.log(dataS);
        console.log("scrap "+dataS.data.scrap);
        setteam(dataS.data);
       
     } else {
        
        const data = await scrapResponse.json();
        console.log(data);
        setLoading(false);
    }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeam();
  }, [projectId]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Get the correct suffix for the day
    const getDaySuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    const dayWithSuffix = day + getDaySuffix(day);

    return `${dayWithSuffix} ${month} ${year}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Get the correct suffix for the day
  
    return `${time}`;
  };

  const onClickHandler27 = () => navigate(`/createScrapName`);

  const handleViewClick = (id) => {
    navigate(`/createScrap/${id}`); // Navigate to the view page with the ID as a parameter
  };



  const handleDeleteClick = (id) => {
    deleteTeam(id); // Navigate to the view page with the ID as a parameter
  };

  const deleteTeam = async (id) => {
    try {
        const response = await fetch(API_BASE_URL + `/api/team/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Failed to delete graph');
        }

        console.log("deleted");
        setteam(team.filter(scrap => scrap._id !== id));
        
    } catch (error) {
        console.error('Error deleting all graphs:', error);
        // Handle error, e.g., show an error message
    }
};

    return (
        <>

<div className='container2'>
         <SideMenu2P />    
         <div className="main-content">
        
         <Header />
        
         <div className='main-content2'>
            
        <div className='bacWHI'>

        <div className="row">
            <div className="col-md-6">
                <p style={{fontWeight:700}}>Add Team Member</p>
            </div>

            <div className="col-md-6">
               
            </div>
                </div>

                   

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
        
            <div class = "break"></div>
           
           
            
           
           
        </div> 

        
        
  </div>
  </div>
  <Toaster  position="top-right" />
  </div>
  </>
    );
}

export default ScrapView
