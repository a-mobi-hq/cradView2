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


function AllFiles ()  {
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



 useEffect(() => {
     const fetchTypes = async () => {
         try {
             const response = await axios.get(`${API_BASE_URL}/api/hub/types`);
             setTypes(response.data);
             setLoading(false);
         } catch (error) {
             console.error('Error fetching types:', error);
             setError('Failed to fetch types');
             setLoading(false);
         }
     };

     fetchTypes();
 }, []);

 if (loading) return <div>Loading...</div>;
 if (error) return <div>{error}</div>;

    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
        <img src={bci} className='bcA'></img>
        <div className='centerC'>
            <div className='text-center'>
            <p className='centerH'>All Files</p>
            <div class="flex-container boxRA">
                    <div type='button' className='hdds'>Recent</div>
                    <div type='button'className='hdds'>Started</div>
                    <div type='button'className='hdds'>Shared</div>
                </div> 
               
          <div className='grid-container'>
                {types.map((type) => (
                    <div key={type} className='grid-item'>
                        <Link to={`/types/${type}`} className='dd'>
                        <img src={fol} className='fol' ></img>
                          <p className='folP'>{type}</p>
                        </Link>
                    </div>
                ))}
           </div>

                <div>

            
        </div>

        
            
            </div>
           
        </div> 
  
       
           
          
  </div>
  </div>
  </div>
  </>
    );
}

export default AllFiles
