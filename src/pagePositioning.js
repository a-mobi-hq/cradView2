import React, { useState, useEffect, useRef } from 'react';
import bci from './images/bc.png'; 
import success from './images/success.png'; 
import cloud from './images/cloud.png';
import Header from './component/header';
import { SketchPicker } from 'react-color'; // Importing SketchPicker from react-color
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';
import SelectFont from './component/selectFonts';
import LogoModal from './component/logoModal';
import { Toaster, toast } from 'sonner'
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from './config/apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'



function PagePositioning ()  {
    const navigate = useNavigate()

     const onClickHandler = () => navigate(``)
     const [loading, setLoading] = useState(false);
     const [font, setFont] = useState(null);

  const [isOpen, setIsOpen]= useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ffffff'); // Initial color value

  const [showFontPicker, setShowFontPicker] = useState(false);
  const [selectedFont, setSelectedFont] = useState('');
  const fonts = ['Select', 'Arial', 'Verdana', 'Times New Roman', 'Helvetica', 'Courier New']; // Example list of fonts

  const handleAddFontClick = () => {
    setShowFontPicker(true);
  };

  const handleChange = (e) => {
    setFont({
      [e.target.id]: e.target.value,
    });

  };  

  const handleFontSelect = (font) => {
    setSelectedFont(font);
    setShowFontPicker(false); // Hide the font picker after font selection
  };


  const handleButtonClick = () => {
    setShowPicker(!showPicker); // Toggle color picker visibility
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex); // Update selected color
  };


  

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
        <p className='centerH'>Positioning and Messaging</p>
        <p className='centerHp'>Here we create a brand</p>
    </div>

    <div className = "titleBrand">
    <label htmlFor="brandName" className='headBrand'>Brand Name</label>
        <input className='longInput'
        type="text"
        id="brandName"
        placeholder='Enter Brand Name'
        />
        </div>


    <div className = "titleBrand3">
    <p className="headBrand">Brand Logo</p>
    <div className=''>
        <div className='brandlogoA'>
        <img src={cloud} className='brandlogo'></img>
        </div>
        <button className="btn btn-primary buttonF" onClick={()=>setIsOpen(true)}>Upload your Brand Logo</button>
       </div>
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
          onChange={handleChange}
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
        />
        </div>


        <div className = "titleBrand2">
    <label htmlFor="vision" className='headBrand'>Vision</label>
        <input className='longInput'
        type="text"
        id="vision"
        placeholder='Enter Vision'
        />
        </div>


        <div className = "titleBrand2">
    <label htmlFor="mission" className='headBrand'>Mission</label>
        <input className='longInput'
        type="text"
        id="mission"
        placeholder='Enter Mssion'
        />
        </div>


        <div className = "titleBrand2">
    <label htmlFor="philosophy" className='headBrand'>Philosophy</label>
        <input className='longInput'
        type="text"
        id="philosophy"
        placeholder='Enter Philosophy'
        />
        </div>


</div> 

{/* <button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button> */}
<button type="submit" className="btn btn-primary curveNext" disabled={loading}>
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