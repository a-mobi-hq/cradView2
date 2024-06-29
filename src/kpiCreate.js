import React, { useState, useEffect } from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from './config/apiConfig';
import { jwtDecode } from "jwt-decode";
import { Toaster, toast } from 'sonner'
import SideMenu2P from './component/sideMenu2P';

function CreateKpi ()  {
    
    const navigate = useNavigate()

     const onClickHandler = () => navigate(`/inflationRateGraph`)
     const onClickHandler1 = () => navigate(`/financialPintegrate`)
     const [selectedType, setSelectedType] = useState('');

    const [visibleYears, setVisibleYears] = useState(1);
    const [monthInputs, setMonthInputs] = useState({});
    const [graphName, setGraphName] = useState('');

    const token = localStorage.getItem('access_token'); 
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const [inputPairs, setInputPairs] = useState([{ x: '', y: '' }]);

    const handleInputChange = (index, field, value) => {
      const newPairs = [...inputPairs];
      newPairs[index][field] = value;
      setInputPairs(newPairs);
    };
  
    const addNewPair = () => {
      setInputPairs([...inputPairs, { x: '', y: '' }]);
    };

    


  // Function to handle changes in the input field
  const handleInputChangeName = (event) => {
    // Update the graphName state variable with the new value entered into the input field
    setGraphName(event.target.value);
  };

    useEffect(() => {
        // Function to generate months for a given year
        const generateMonthsForYear = (year) => {
            const months = {};
            for (let i = 0; i < 12; i++) {
                months[`month${i + 1}`] = ''; // Initialize each month with an empty string
            }
            return months;
        };

        // Initialize monthInputs with months for the first year
        setMonthInputs({ ...monthInputs, [`year${visibleYears}`]: generateMonthsForYear(visibleYears) });
    }, [visibleYears]);
     

    const addYear = () => {
        setVisibleYears(visibleYears + 1);
    };

    const removeYear = () => {
        if (visibleYears > 1) {
            setVisibleYears(visibleYears - 1);
        }
    };

    const sendDataToAPI = async (data) => {
        console.log(data);
        try {
            data.userId = userId;
            data.projectId = localStorage.getItem('nProject');
            data.kpiGraphType = selectedType;
            data.kpiGraphName = graphName;
            console.log(data);
            
                const response = await axios.post(API_BASE_URL + '/api/kpi', data)
                console.log('Graph saved successfully:', response.data);
                navigate('/kpi');
             
        } catch (error) {
            if(error.response){
                toast.error(error.response.data.error);
                console.log(error.response.data);
                console.log(error.response.data);
            }
            console.error('Error sending data to API:', error);
        }
    };

    const handleInputChange2 = (year, month, value) => {
        setMonthInputs(prevInputs => {
            const updatedYear = {
                ...prevInputs[year],
                [month]: value
            };
    
            // Check if any month in the year has a non-empty value
            const hasNonEmptyMonth = Object.values(updatedYear).some(monthValue => monthValue.trim() !== '');
    
            // If no month has a non-empty value, remove the year from the state
            if (!hasNonEmptyMonth) {
                const updatedInputs = { ...prevInputs };
                delete updatedInputs[year];
                return updatedInputs;
            }
    
            // If the month value is empty, remove it from the year
            if (value.trim() === '') {
                const { [month]: _, ...updatedYearWithoutEmptyMonth } = updatedYear;
                return {
                    ...prevInputs,
                    [year]: updatedYearWithoutEmptyMonth
                };
            }
    
            return {
                ...prevInputs,
                [year]: updatedYear
            };
        });
    };
    
    
    const handleSubmit = async () => {
        // const formattedData = {
        //     Axix: inputPairs
        //       .filter(pair => pair.x.trim() !== '') // Filter out pairs with empty x values
        //       .map((pair, index) => ({
        //         [`x${index + 1}`]: pair.x,
        //         [`Y${index + 1}`]: pair.y,
        //       })),
        //   };

          const formattedData = {
            Axix: inputPairs
              .filter(pair => pair.x.trim() !== '') // Filter out pairs with empty x values
              .map(pair => ({
                x: pair.x,
                y: pair.y,
              })),
          };
      

        console.log(formattedData);
        sendDataToAPI(formattedData);
    
        // try {
        //   const response = await fetch('https://your-api-endpoint.com/submit', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formattedData),
        //   });
    
        //   if (!response.ok) {
        //     throw new Error('Network response was not ok');
        //   }
    
        //   const result = await response.json();
        //   console.log('Success:', result);
        //   // Handle success (e.g., show a success message or redirect)
        // } catch (error) {
        //   console.error('Error:', error);
        //   // Handle error (e.g., show an error message)
        // }
      };
    
    const handleSubmit2 = () => {
        // Prepare the data to be sent to the API
        const dataToSend = {
            years: [...Array(visibleYears)].map((_, index) => ({
                year: index + 1,
                months: Object.entries(monthInputs[index + 1] || {}).map(([month, value]) => ({
                    month,
                    value
                }))
            })),
        };
        sendDataToAPI(dataToSend);
    };
    return (
        <div className='container2'>
        <SideMenu2P />
        <div className="main-content">
        <Header />
        <div className="main-content2">
        <div className='bacWHI'>
                     <p className='text-center'>Kpi</p>   
                     <p className='gname'>Kpi Name</p>   
                    <input
                        className='monthOn1 mmj'
                        value={graphName} // Bind the value of the input field to the state variable
                        onChange={handleInputChangeName} // Call the handleInputChange function when the input value changes
                    />  

            <select
                    style={{marginBottom: 20}}
                    id="dropdown"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <option value="">--Select Kpi Type--</option>
                    <option value="Histogram">Histogram</option>
                    <option value="Area">Spline Area</option>
                    <option value="Donut">Donut</option>
                    <option value="Pie">Pie</option>
                    <option value="Radar">Radar</option>
                    <option value="Polar">Polar</option>
                    <option value="Treemap">Treemap</option>
                </select>

                    {inputPairs.map((pair, index) => (
                       
            <div className='columnChart' key={index} >
                <div className='row' style={{paddingBottom:10}}>
                 <div className='col-md-6'>   
                    <input
                    className='monthOn1'
                    onChange={(e) => handleInputChange(index, 'x', e.target.value)}
                    type="text"
                    placeholder="Enter X value"
                    value={pair.x}
                    style={{width:" -webkit-fill-available"}}
                    />
                </div>

                <div className='col-md-6'>   
                <input
                className='monthOn1'
                onChange={(e) => handleInputChange(index, 'y', e.target.value)}
                type="number"
                placeholder="Enter Y value"
                value={pair.y}
                style={{width: "-webkit-fill-available"}}
                />
                </div>
            </div>
          </div>
        ))}
                <span className='addy' onClick={addNewPair}>+</span>
                {visibleYears > 1 &&<span className='addy mmr' onClick={removeYear}>-</span>}
                        {/* Add Year button */}
                       

                       
                        
                        <button onClick={handleSubmit} className='subm'>Submit Data</button>
                    </div>
                </div>
            </div>
            <Toaster  position="top-right" />
        </div>
        );

}

export default CreateKpi