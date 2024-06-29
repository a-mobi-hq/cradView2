import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import API_BASE_URL from './apiConfig';
import { jwtDecode } from "jwt-decode";
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';





export default function AddKpiModal ({open, onClose})  {
    const [isOpen, setIsOpen]= useState(false);
    const [kpiName, setKpiName] = useState('');
    const [graphType, setGraphType] = useState('');
    const [kpiDescription, setKpiDescription] = useState('');
    const [category, setCategory] = useState('');
    const [unit, setUnit] = useState('');
    const [xAxisLabel, setXAxisLabel] = useState('');
    const [yAxisLabel, setYAxisLabel] = useState('');
    const [xAxisData, setXAxisData] = useState('');
    const [yAxisData, setYAxisData] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

//first dropdown
    // State variables to manage dropdown behavior
    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // const [selectedOption, setSelectedOption] = useState('');
    // Function to handle changes in the input field
  const handleInputChangeName = (event) => {
    // Update the graphName state variable with the new value entered into the input field
    setKpiName(event.target.value);
  };

  const handleInputKpiDescription = (event) => {
    // Update the graphName state variable with the new value entered into the input field
    setKpiDescription(event.target.value);
  };
    const dropdownRef = useRef(null);
  
    // // Function to toggle dropdown visibility
    // const toggleDropdown = () => {
    //   setIsDropdownOpen(!isDropdownOpen);
    // };
  
    // // Function to handle option selection
    // const handleOptionSelect = (option) => {
    //   setSelectedOption(option);
    //   setIsDropdownOpen(false);
    // };

    //second dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState('');
    const dropdownRef1 = useRef(null);
  
    // Function to toggle dropdown visibility
    const toggleDropdown1 = () => {
      setIsDropdownOpen1(!isDropdownOpen1);
    };
  
    // Function to handle option selection
    const handleOptionSelect1 = (option) => {
      setSelectedOption1(option);
      setUnit(option);
      setIsDropdownOpen1(false);
    };

     //third dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
    const [selectedOption2, setSelectedOption2] = useState('');
    const dropdownRef2 = useRef(null);
  
    // Function to toggle dropdown visibility
    const toggleDropdown2 = () => {
      setIsDropdownOpen2(!isDropdownOpen2);
    };
  
    // Function to handle option selection
    const handleOptionSelect2 = (option) => {
      setSelectedOption2(option);
      setGraphType(option);
      setIsDropdownOpen2(false);
    };


      // Close dropdown when clicking outside of it 1
    useEffect(() => {
      const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
              setIsDropdownOpen(false);
          }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);

   // Close dropdown when clicking outside of it 2
   useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
            setIsDropdownOpen1(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);

 // Close dropdown when clicking outside of it 3
 useEffect(() => {
  const handleClickOutside = (event) => {
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
          setIsDropdownOpen2(false);
      }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
      document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

const token = localStorage.getItem('access_token'); 
const decodedToken = jwtDecode(token);
const userId = decodedToken.userId;
const navigate = useNavigate();

const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
};

const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
};

const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setCategory(option);
    setIsDropdownOpen(false);
};

const sendDataToAPI = async (data) => {
    console.log(data);
    try {
        data.userId = userId;
        data.projectId = localStorage.getItem('nProject');
        data.graphType = graphType;
        data.kpiName = kpiName;
        data.kpiDescription = kpiDescription;
        data.category = category;
        data.unit = unit;
        console.log(data);
        
        const response = await axios.post(API_BASE_URL + '/api/kpi', data);
        console.log('Graph saved successfully:', response.data);
        navigate('/trackPage');
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.error);
            console.log(error.response.data);
        }
        console.error('Error sending data to API:', error);
        console.log(error.response.data);
    }
};

const handleSubmit = () => {
    const xAxisArray = xAxisData.split(',').map(item => item.trim());
    const yAxisArray = yAxisData.split(',').map(item => parseFloat(item.trim()));

    if (xAxisArray.length !== yAxisArray.length) {
        toast.error('X and Y axis data must have the same number of values');
        return;
    }

    const dataToSend = {
        xAxisLabel: xAxisLabel,
        yAxisLabel: yAxisLabel,
        data: xAxisArray.map((x, index) => ({
            x: x,
            y: yAxisArray[index]
        })),
    };
    sendDataToAPI(dataToSend);
};



    if(!open) return null

    return ReactDOM.createPortal (
        <>
        <div className='modalOv' >
           <div className='modalSt1'>
                <p className='closeIcon' onClick={onClose} type='button'>X</p>
              <p className='txt2'>Add KPI</p>
              <div className='whiteKpi'>
              <p className='details'>Details of the KPI</p>
             <div className='addKpiBox'>
                <div className='kpiname'><p>KPI Name</p>
                <input 
                className='inpt' 
                type="text" 
                value={kpiName}
                placeholder="Search.."
                onChange={handleInputChangeName}
                />
                </div> 
                <div className='kpiname'><p>KPI Description</p>
                <input 
                className='inpt' 
                type="text" 
                placeholder="Search.."
                value={kpiDescription}
                onChange={handleInputKpiDescription} 
                />
                </div> 

                <div className='kpiname'><p>Category</p>
                {/* <button className="btn-primary dropdown-toggle bttn1" type="button" data-toggle="dropdown">KPI Category</button> */}
                <div ref={dropdownRef} className="dropdown3 bttn1">
                <div className={`select6 ${isDropdownOpen ? 'select-clicked' : ''}`} onClick={toggleDropdown}>
                    <span classname="selected">{selectedOption|| "KPI Category"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu9 ${isDropdownOpen ? 'menu-open9' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("KPI Category 1")} className='kpiCat'>KPI Category 1</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("KPI Category 2")} className='kpiCat'>KPI Category 2</li>
                </ul>
            </div>
                </div> 







                <div className='kpiname'><p>Unit</p>
                {/* <button className="btn-primary dropdown-toggle bttn1" type="button" data-toggle="dropdown">Select</button> */}
                <div ref={dropdownRef1} className="dropdown3 bttn1">
                <div className={`select6 ${isDropdownOpen1 ? 'select-clicked' : ''}`} onClick={toggleDropdown1}>
                    <span classname="selected">{selectedOption1|| "Select"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu9 ${isDropdownOpen1 ? 'menu-open9' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect1("12%")} className='kpiCat'>12%</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect1("#12,000")} className='kpiCat'>#12,000</li>
                </ul>
            </div>
                </div> 




                <div className='kpiname'><p>Type of Graph</p>
                {/* <button className="btn-primary dropdown-toggle bttn1" type="button" data-toggle="dropdown">Select</button> */}
                <div ref={dropdownRef2} className="dropdown3 bttn1">
                <div className={`select6 ${isDropdownOpen2 ? 'select-clicked' : ''}`} onClick={toggleDropdown2}>
                    <span classname="selected">{selectedOption2|| "Select"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu9 ${isDropdownOpen2 ? 'menu-open9' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect2("Bar Chart")} className='kpiCat'>Bar Chart</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect2("Pie Chart")} className='kpiCat'>Pie Chart</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect2("Histogram")} className='kpiCat'>Histogram</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect2("Radar Graph")} className='kpiCat'>Radar Graph</li>
                </ul>
            </div>
                </div> 
                <div className='kpiname'><p>Add Axis(x)</p>
                <input 
                className='inpt' 
                type="text" 
                placeholder="Search.."
                value={xAxisData}
                onChange={handleInputChange(setXAxisData)}
                />
                </div>
                <div className='kpiname'><p>Add Axis(y)</p>
                <input className='inpt' 
                type="text" 
                placeholder="Search.."
                value={yAxisData}
                onChange={handleInputChange(setYAxisData)}
                />
                </div>  
                </div>         
             <button className="btn btn-primary kpib">Cancel</button>
              <button className="btn btn-primary kpibA" onClick={handleSubmit}>Save</button>
              </div>          
           </div>
           <Toaster  position="top-right" />
        </div>
        </>,
        document.getElementById('portal')
     );
}
