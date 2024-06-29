import React, { useEffect, useState } from 'react';
import bci from './images/bc.png'; 
import Header from './component/header';
import Menu from './component/menu';
import pdf from './images/pdf.png';
import uber from './images/uber.png';
import weWork from './images/weWork.png';
import gusto from './images/gusto.png';
import excel from './images/excel.png'; 
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from './config/apiConfig';
import { Toaster, toast } from 'sonner';
import PitchDocumentModal from './component/pitchDocumentModal';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'; // Import the pen icon
import { CiCirclePlus } from 'react-icons/ci';




function PitchDeck ()  {

    const navigate = useNavigate()
    const [isOpen, setIsOpen]= useState(false);
    const [imageDetails, setImageDetails] = useState([]);
    const [imagePath, setImagePath] = useState('');

    const [activeTab, setActiveTab] = useState('tab1');
    const [linkVisible, setLinkVisible] = useState(false);
    const access_token = localStorage.getItem('access_token');
    const decodedToken = jwtDecode(access_token);
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (!event.target.closest('.columnP')) {
            setLinkVisible(false);
          }
        };
    
        document.body.addEventListener('click', handleClickOutside);
    
        return () => {
          document.body.removeEventListener('click', handleClickOutside);
        };
      }, []);
    
    const toggleLinkVisibility = () => {
      setLinkVisible(!linkVisible);
    };
    
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

    const onClickHandler = () => navigate(``)


    const projectId = localStorage.getItem('nProject');
    console.log ('projectId '+projectId)
    const fetchImageDetails = async () => {
            try {
                const deck = "PicthDeck";
                const response = await fetch(`${API_BASE_URL}/api/pitchDeck/upload/${projectId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
    
                    setImageDetails(data)
                    
                    if (data.image) {
                        let img = API_BASE_URL+'/images/'+data.image;
                        console.log(data.image);
                        console.log(img);
                        setImagePath(img);
                    }
                    console.log(data.image);
                    // Handle the fetched data here
                } else {
                    const errorData = await response.json();
                    console.error('Failed to fetch image details:', errorData);
                }
            } catch (error) {
                console.error('Error fetching image details:', error);
                console.log(error.response);

            }
        };

          useEffect(() => {
           
            
           
        
            fetchImageDetails();
        }, []);
    
    return (
        <>
 <div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
        <div className='centerC'>
            <img src={bci} className='bcI'></img>

            <div className='text-center'>
            <p className='centerH'>Pitch Deck</p>
                <p className='centerHp'>Make sure you answer all questions</p>
            <div class = "spaceB"></div>

           
            <div className="tab-navigation">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className={`nav-link ${activeTab === 'tab1' ? 'active' : ''}`} onClick={() => handleTabClick('tab1')} href="#tab1">Introduction Video</a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${activeTab === 'tab2' ? 'active' : ''}`} onClick={() => handleTabClick('tab2')} href="#tab2">Pitch Deck Slides</a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${activeTab === 'tab3' ? 'active' : ''}`} onClick={() => handleTabClick('tab3')} href="#tab3">Resources</a>
                </li>
                {/* Add more tabs as needed */}
              </ul>
            </div>
            <div className="tab-content">
            <div className={`tab-pane fade ${activeTab === 'tab1' ? 'show active' : ''}`} id="tab1">
            <div className='container-frame'>
            <iframe className='pitchIframe' src="https://www.youtube.com/embed/NBd6yJBzyis?si=QTR7Qu_dLDkhRFmR" title="Iframe Example"></iframe>
            <iframe className='pitchIframe' src="https://www.youtube.com/embed/NBd6yJBzyis?si=QTR7Qu_dLDkhRFmR" title="Iframe Example"></iframe>
            <iframe className='pitchIframe'  src="https://www.youtube.com/embed/NBd6yJBzyis?si=QTR7Qu_dLDkhRFmR" title="Iframe Example"></iframe>
            </div>
            </div>

            <div className={`tab-pane fade ${activeTab === 'tab2' ? 'show active' : ''}`} id="tab2">
            <div className='deckSlides'>
                <FontAwesomeIcon icon={faCirclePlus} className="addDeck" type='button' onClick={()=>setIsOpen(true)}/>
                </div>
                <div className='wrapper4'>
            <div className='columns1'>
               <div className='columnP'>
               {imageDetails.map((imageDetails, index) => (

                    <img src={API_BASE_URL+`/images/${imageDetails.hubFile}`} 
                    className='imgX' ></img>
                  ))}
               </div> 
{/* 
               <div className='columnP'>
                    <img src={excel} className='imgX' ></img>
               </div> 

               <div className='columnP'>
                    <img src={pdf} className='imgX' ></img>
               </div> 
               <div className='columnP'>
                    <img src={pdf} className='imgX' ></img>
               </div> */}
               </div>
               </div>
              </div>
              <div className={`tab-pane fade ${activeTab === 'tab3' ? 'show active' : ''}`} id="tab3">
              <div className='wrapper4'>
            <div className='columns1'>
               <div className='columnP' onClick={toggleLinkVisibility}>
                    <img src={uber} className='imgPitch' ></img>
                    {linkVisible && (
            <a href="https://www.uber.com/ng/en/" target="_blank" rel="noopener noreferrer" className='deckLink'>Uber</a>
          )}
               </div> 

               <div className='columnP' onClick={toggleLinkVisibility}>
                    <img src={weWork} className='imgPitch' ></img>
                    {linkVisible && (
            <a href="https://www.wework.com" target="_blank" rel="noopener noreferrer" className='deckLink'>We Work</a>
          )}
               </div> 

               <div className='columnP' onClick={toggleLinkVisibility}>
                    <img src={gusto} className='imgPitch' ></img>
                    {linkVisible && (
            <a href="https://gusto.com" target="_blank" rel="noopener noreferrer" className='deckLink'>Gusto</a>
          )}
               </div> 
               </div>
               </div>              
               </div>
            </div>
            <PitchDocumentModal open={isOpen} onClose={() => setIsOpen(false)}>

          </PitchDocumentModal>
          </div>
            </div>
            </div>
        </div> 

  </div>

  </>
    );
}

export default PitchDeck
