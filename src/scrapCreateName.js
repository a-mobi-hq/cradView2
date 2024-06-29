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

function ScrapCreateName ({ htmlContent })  {
    
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
  
  const [formData, setFormData] = useState({
    scrapName: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    scrapCreate(formData);

   
  };

  const scrapCreate = async (data) => {
    setLoading(true);
    try {
      data.userId = userId;
      data.projectId = localStorage.getItem('nProject');
    console.log(data);
    console.log(JSON.stringify(data));
      const response = await fetch(API_BASE_URL+'/api/scrap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${access_token}` // Include the token in the Authorization header
        },
        body: JSON.stringify(data),
      });

     // const data = response.json();

      if (response.status === 200) {
        setLoading(false);
      
        const responseData = await response.json(); // Parse JSON response
        console.log(responseData);
        console.log(responseData.status);
        console.log(responseData.id);
  
 
  
  // Save access token to local storage

        console.log('successful');
     
       
          navigate(`/createScrap/${responseData.id}`)
      } else {
        const result = await response.json();
        setLoading(false);
        toast.error(result['error']);
          console.error('Error:', result['error']);
        //console.error('Failed to create User');
      }
    } catch (error) {
      setLoading(false);
      console.error('An error occurred:', error);
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
                    <div className='text-center'>
                <p className='centerHp'>Scrapbook Name</p>
                </div>
               
                <form onSubmit={handleSubmit}>    
            <button className="btn btn-primary buttonE" type='submit'>
                { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
                { !loading && <span>Save</span>}
            </button>
          
            <div class = "break"></div>
           
           <div className='row'>
              <div className='col-md-12'>
                <div className='container-textBs'>
                  <p  style={{width: '100%', marginTop:30, fontSize: 15, fontWeight:700}}>Fill in ScrapBook Name</p>
                  <input
                          type="text"
                          id="scrapName"
                          value={formData.cpassword}
                          onChange={handleChange}
                          className="custom-input"
                          style={{width: '100%'}}
                        />


                </div>
              </div>
           </div>
           

                
            </form>
            
           
           
        </div> 

       
        
  </div>
  </div>
  <Toaster  position="top-right" />
  </div>
  </>
    );
}

export default ScrapCreateName
