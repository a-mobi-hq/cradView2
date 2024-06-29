import React, { useState, useEffect, useRef } from 'react';
import bci from './images/bc.png'; 
import fol from './images/fol.png'; 
import excel from './images/excel.png'; 
import Rect from './images/Rect.png'
import Header from './component/header';
import pdf from './images/pdf.png';
import Menu from './component/menu';
import cloud from './images/cloud.png'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from './config/apiConfig';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TopMenu from './component/topMenu';
import SideMenu2 from './component/sideMenu2';
import { useParams } from 'react-router-dom';

function AllFiles() {
  const navigate = useNavigate()

    const onClickHandler = () => navigate(`/pageBenefit`)
    const projectId = localStorage.getItem('nProject');
    const [imageDetails, setImageDetails] = useState([]);
    const access_token = localStorage.getItem('access_token');
   const decodedToken = jwtDecode(access_token);

   const [types, setTypes] = useState([]);
    const [subtypes, setSubtypes] = useState({});
    const [files, setFiles] = useState({});
    const [selectedType, setSelectedType] = useState(null);
    const [selectedSubtype, setSelectedSubtype] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { type, subtype } = useParams();

//    const fetchTypes = async () => {
//      try {
//          const response = await axios.get('http://localhost:3001/api/hub/types');
//          setTypes(response.data);
//          setLoading(false);
//      } catch (error) {
//          console.error('Error fetching types:', error);
//          setError('Failed to fetch types');
//          setLoading(false);
//      }
//  };

//  useEffect(() => {
//      // Simulating fetching user details from an API
 
//      fetchTypes();
//  }, []);


//  const handleTypeClick = async (type) => {
//      setSelectedType(type);
//      setSelectedSubtype(null);
//      setLoading(true);
//      try {
//          const response = await axios.get(`http://localhost:3001/api/hub/types/${type}`);
//          setSubtypes(response.data.subTypes);
//          setFiles({ [type]: response.data.files });
//          setLoading(false);
//      } catch (error) {
//          console.error('Error fetching subtypes and files:', error);
//          setError('Failed to fetch subtypes and files');
//          setLoading(false);
//      }
//  };

 const handleSubtypeClick = (subtype) => {
     setSelectedSubtype(subtype);
 };

 const [showScrollableDiv, setShowScrollableDiv] = useState(false);
    
 const handleToggle = () => {
   setShowScrollableDiv(!showScrollableDiv);
 };

 useEffect(() => {
    const fetchSubtypeFiles = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/hub/types/${type}/${subtype}`);
            setFiles(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching files:', error);
            setError('Failed to fetch files');
            setLoading(false);
        }
    };

    fetchSubtypeFiles();
}, [type, subtype]);
      return (

       
       <>
      
        <TopMenu />
    <div className='container2'>
         <SideMenu2 />    
         <div className="main-content">
         <div className='headermm'>
            <p>AllFiles</p>
          </div> 
        
         <div className={`main-content2 ${showScrollableDiv ? 'shrink' : ''}`} style={{paddingTop:0}}>

          <div className='surroundd'>

          
          <div className='grid-container'>
          {files.map((file, index) => (
                   <div key={index} className='grid-item'>
                    <img src={API_BASE_URL+`/images/${file.hubFile}`}  alt="Image 1"
                            className="gallery-image imgA dd"></img>
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




  export default AllFiles;
