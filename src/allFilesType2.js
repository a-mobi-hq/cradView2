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
import { Link, useParams } from 'react-router-dom';


function AllFiles ()  {
    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/pageBenefit`)
    const projectId = localStorage.getItem('nProject');
    const [imageDetails, setImageDetails] = useState([]);
    const access_token = localStorage.getItem('access_token');
   const decodedToken = jwtDecode(access_token);

   const { type } = useParams();
    const [subtypes, setSubtypes] = useState({});
    const [files, setFiles] = useState([]);
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





 useEffect(() => {
    const fetchTypeDetails = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/hub/types/${type}`);
            setSubtypes(response.data.subTypes);
            setFiles(response.data.files);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching subtypes and files:', error);
            setError('Failed to fetch subtypes and files');
            setLoading(false);
        }
    };

    fetchTypeDetails();
}, [type]);


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

        <div>
            <h1 className='typeH'>{type}</h1>
            
            <div className='grid-container'>
                {files.map((file, index) => (
                    <div key={index} className='grid-item'>
                        <img src={API_BASE_URL+`/images/${file.hubFile}`}  alt="Image 1"
                            className="gallery-image imgA dd"></img>
                       
                       </div>
                ))}
                </div>
                
                <div className='grid-container'>
                    {Object.entries(subtypes).map(([subtype, subFiles]) => (
                        <div key={subtype} className='grid-item'>
                        
                            <Link to={`/subtypes/${type}/${subtype}`} className='dd'>
                                <img src={fol} className='fol' ></img>
                                <p className='folP'>{subtype}</p>
                            </Link>
                        
                        </div>
                    ))}
                </div>
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
