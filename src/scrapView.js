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
import SideMenu2 from './component/sideMenu2';

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
  const [scraps, setScraps] = useState([]);

  const handleDelete = (id) => {
  
    console.log(id);
  };

  useEffect(() => {
    const fetchScrap = async () => {
      try {
        const scrapResponse = await fetch(API_BASE_URL + `/api/scrap/project/${projectId}`, {
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
        setScraps(dataS.data);
       
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

    fetchScrap();
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
    deleteScrap(id); // Navigate to the view page with the ID as a parameter
  };

  const deleteScrap = async (id) => {
    try {
        const response = await fetch(API_BASE_URL + `/api/scrap/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Failed to delete graph');
        }

        console.log("deleted");
        setScraps(scraps.filter(scrap => scrap._id !== id));
        
    } catch (error) {
        console.error('Error deleting all graphs:', error);
        // Handle error, e.g., show an error message
    }
};

    return (
        <>

<div className='container2'>
         <SideMenu2 />    
         <div className="main-content">
        
         <Header />
        
         <div className='main-content2'>
            
        <div className='bacWHI'>

        <div className="row">
            <div className="col-md-6">
                <p style={{fontWeight:700}}>ScrapBook</p>
            </div>

            <div className="col-md-6">
                <button className="btn mainBtn" onClick={onClickHandler27}>Create</button>
            </div>
                </div>

                   

                <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            {scraps.map((scrap, index) => (
                <tr key={scrap._id}>
                    <td>{index + 1}</td>
                    <td>{scrap.scrapName}</td>
                    <td>{formatDate(scrap.timeSent)}</td>
                    <td>{formatTime(scrap.timeSent)}</td>
                    <td>
                        <button className="btn mainBtnView" onClick={() => handleViewClick(scrap._id)}>View</button>
                        <button className="btn mainBtnDelete" onClick={() => handleDeleteClick(scrap._id)}>Delete</button>
                        
                    </td>
                </tr>
                ))}
            </tbody>

           
            </table>
               
        
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
