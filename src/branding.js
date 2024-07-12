import React, { useState, useEffect, useRef } from 'react';
import bci from './images/bc.png'; 
import success from './images/success.png'; 
import cloud from './images/cloud.png';
import Header from './component/header';
import { SketchPicker } from 'react-color'; // Importing SketchPicker from react-color
import SideMenu2P from './component/sideMenu2P';
import { useNavigate } from 'react-router-dom';
import SelectFont from './component/selectFonts';
import LogoModal from './component/logoModal';
import { Toaster, toast } from 'sonner'
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from './config/apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';



function PagePositioning ()  {
    const navigate = useNavigate()

     const onClickHandler = () => navigate(``)
     const [loading, setLoading] = useState(false);
     const [font, setFont] = useState(null);
     const [selectedImage, setSelectedImage] = useState(null);

     const access_token = localStorage.getItem('access_token');
   const decodedToken = jwtDecode(access_token);
   const userId = decodedToken.userId;
   const [types, setTypes] = useState([]);
  const [isOpen, setIsOpen]= useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ffffff'); // Initial color value

  const [showFontPicker, setShowFontPicker] = useState(false);
  const [selectedFont, setSelectedFont] = useState('');
  const fonts = ['Select', 'Arial', 'Verdana', 'Times New Roman', 'Helvetica', 'Courier New']; // Example list of fonts

  const projectId = localStorage.getItem('nProject');

  const handleAddFontClick = () => {
    setShowFontPicker(true);
  };

  const handleChangeF = (e) => {
    setFont({
      [e.target.id]: e.target.value,
    });

  };  
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFontSelect = (font) => {
    setSelectedFont(font);
    setShowFontPicker(false); // Hide the font picker after font selection
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file');
    }
  };


  const handleButtonClick = () => {
    setShowPicker(!showPicker); // Toggle color picker visibility
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex); // Update selected color
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBrand(formData);
  };

  const [formData, setFormData] = useState({
    brandName: '',
    vision: '',
    philosophy: '',
    mission: '',
    slogan: '',
    });

    const updateBrand = async () => {
        setLoading(true);
        console.log(formData);
        try {
          formData.image= selectedImage;
          formData.projectId= projectId;
          formData.font= selectedFont;
          formData.color= selectedColor;

          console.log(formData);
      
          const response = await axios.post(`${API_BASE_URL}/api/brand/${projectId}`, formData, {
            headers: {
              'Authorization': `Bearer ${access_token}`,
              'Content-Type': 'application/json',
            }
          });
      
          if (response.status === 200) {
            const responseData = response.data;
            console.log(responseData);
            toast.success(responseData.message);
          } else {
            const result = response.data;
            toast.error(result.error);
            console.error('Error:', result.error);
          }
        } catch (error) {
          console.error('An error occurred:', error);
          toast.error('An error occurred while updating the brand');
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        // Simulating fetching user details from an API
        const fetchBrandDetails = async () => {
            try {
              const response = await fetch(API_BASE_URL+'/api/brand/'+projectId, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${access_token}`,
                },
              });
                if (response.status === 200) {
                    const data = await response.json();
                    console.log(data);
                    // Update user details state with fetched data
                    const { brandName, vision, philosophy, mission,slogan,font,color } = data;
                    setFormData({ brandName, vision, philosophy, mission,slogan });
                    setSelectedColor(color);
                    setSelectedFont(font);
                } else {
                    const data = await response.json();
                    console.log(data);
                    console.error('Failed to fetch  details');
                }
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };
    
        fetchBrandDetails();
    }, []);
      

    useEffect(() => {
      const fetchTypes = async () => {
          try {
              const response = await axios.get(`${API_BASE_URL}/api/hub/types/project/Brand/${projectId}`);
              console.log(response.data);
              setTypes(response.data.hubs);
             
          } catch (error) {
              console.error('Error fetching types:', error);
              
             
          }
      };
   
      fetchTypes();
   }, []);
    const handleB = () => {
      navigate('/brandingUpload');
    };

    return (
        <>
  <div className='container2'>
         <SideMenu2P />    
         <div className="main-content">
        
         <Header />



 
<div className='centerC'>

    <div className='text-center'>
        <p className='centerH'>Positioning and Messaging</p>
        <p className='centerHp'>Here we create a brand</p>
    </div>

      <span className='selQ' onClick={handleB}>Upload Brand Pictures and Logo</span>
      <div className='row' style={{paddingTop:20}}>
      {types.map((imageDetail, index) => {
         return (
         
                <div className='col-md-2'>
                  <div className='brandlogoA'>
                      <img  src={API_BASE_URL+`/images/${imageDetail.hubFile}`} alt='Selected' className='brandlogo' />
                  </div>
              </div>
           
            ); 
          
       })}
       </div>
        <div>
    <div className = "titleBrand">
    <label htmlFor="brandName" className='headBrand'>Brand Name</label>
        <input className='longInput'
        type="text"
        id="brandName"
        placeholder='Enter Brand Name'
        value={formData.brandName}
        onChange={handleChange}
        />
        </div>


    <div className = "color-picker-container">
    <div className='divBrand'>
    <label htmlFor="color" className='headBrand'>Brand Color</label>
        <input
          id="color"
          className='colorInput'
          placeholder='Select Color'
          readOnly
          value={selectedColor} // Display selected color in the input field
        />
        <button
          className="btn btn-primary forColor"
          onClick={handleButtonClick}
        >
          {showPicker ? 'Add Color' : 'Select Color'}
        </button>
      </div>
      {showPicker && (
        <div className="pickerStyles">
          <SketchPicker
            color={selectedColor}
            onChange={handleColorChange}
            presetColors={[]}
            disableAlpha
          />
        </div>
      )}
       </div>


    <div className = "color-picker-container">
    <div className='divBrand'>
    <label htmlFor="font" className='headBrand'>Writing Font/ Style</label>
        <input
          id="font"
          className="colorInput"
          placeholder="Add fonts"
          readOnly // Ensure that the input field is read-only to prevent manual editing
          value={selectedFont}
          onChange={handleChangeF}
        />
        {showFontPicker && (
          <SelectFont fonts={fonts} onSelect={handleFontSelect} />
        )}
        {!showFontPicker && (
          <button className="btn btn-primary forColor" onClick={handleAddFontClick}>Add Font</button>
        )}
      </div>
    </div>

    
        
    <div className = "titleBrand2">
    <label htmlFor="slogan" className='headBrand'>Slogan</label>
        <input className='longInput'
        type="text"
        id="slogan"
        placeholder='Enter slogan'
        value={formData.slogan}
        onChange={handleChange}
        />
        </div>


        <div className = "titleBrand2">
    <label htmlFor="vision" className='headBrand'>Vision</label>
        <input className='longInput'
        type="text"
        id="vision"
        placeholder='Enter Vision'
        value={formData.vision}
        onChange={handleChange}
        />
        </div>


        <div className = "titleBrand2">
    <label htmlFor="mission" className='headBrand'>Mission</label>
        <input className='longInput'
        type="text"
        id="mission"
        placeholder='Enter Mssion'
        value={formData.mission}
        onChange={handleChange}
        />
        </div>


        <div className = "titleBrand2">
    <label htmlFor="philosophy" className='headBrand'>Philosophy</label>
        <input className='longInput'
        type="text"
        id="philosophy"
        placeholder='Enter Philosophy'
        value={formData.philosophy}
        onChange={handleChange}
        />
        </div>


</div> 

{/* <button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button> */}
<button type="submit" className="btn btn-primary curveNext" disabled={loading} onClick={updateBrand} style={{marginTop: 20}}>
              { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
              { !loading && <span>Save</span>}
              
            </button>
            
           
            
</div>

<LogoModal open={isOpen} onClose={() => setIsOpen(false)}>

          </LogoModal>
</div>
</div>
  </>
    );
}

export default PagePositioning