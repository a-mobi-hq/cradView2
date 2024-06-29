import React, { useState, useEffect } from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from './config/apiConfig';
import { jwtDecode } from "jwt-decode";
import { Toaster, toast } from 'sonner';
import { useParams } from 'react-router-dom';

function EditKpi ()  {
    
    const navigate = useNavigate()

     const onClickHandler = () => navigate(`/inflationRateGraph`)
     const onClickHandler1 = () => navigate(`/financialPintegrate`)

    const [visibleYears, setVisibleYears] = useState(1);
    const [monthInputs, setMonthInputs] = useState({});
    const [graphName, setGraphName] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const token = localStorage.getItem('access_token'); 
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const [inputPairs, setInputPairs] = useState([{ x: '', y: '' }]);

  const [kpiGraphType, setKpiGraphType] = useState('');
  const [kpiGraphName, setKpiGraphName] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // Fetch existing KPI data when the component mounts
    const fetchKpiData = async () => {
      try {
        const response = await axios.get(API_BASE_URL + `/api/kpi/${id}`);
        console.log(response);
        if (response.status === 200) {
            const kpiData = response.data;
            console.log(kpiData.kpi);
            setKpiGraphType(kpiData.kpi.kpiGraphType);
            setKpiGraphName(kpiData.kpi.kpiGraphName);
            setInputPairs(kpiData.kpi.axis);
            setSelectedType(kpiData.kpi.kpiGraphType);
        }else{
            throw new Error('Failed to fetch graph data');
        }
      } catch (error) {
        console.error('Error fetching KPI data:', error);
      }
    };

    fetchKpiData();
  }, [id]);

  const handleInputChange = (index, field, value) => {
    const newPairs = [...inputPairs];
    newPairs[index][field] = value;
    setInputPairs(newPairs);
  };

  const addNewPair = () => {
    setInputPairs([...inputPairs, { x: '', y: '' }]);
  };

  const removePair = (index) => {
    const newPairs = inputPairs.filter((_, i) => i !== index);
    setInputPairs(newPairs);
  };

 



  const sendDataToAPI = async (data) => {
    console.log(data);
    try {
        data.userId = userId;
        data.projectId = localStorage.getItem('nProject');
        data.kpiGraphType = selectedType;
        data.kpiGraphName = kpiGraphName;
        data.id = id;
        console.log(data);

            const response = await axios.post(API_BASE_URL + '/api/kpi/update', data)
            if(response.status === 200){
                console.log('Graph saved successfully:', response.data);
                 //navigate('/netGraph');
            }else{

            }
           
           
         
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
  };

  const handleInputChangeName = (event) => {
    // Update the graphName state variable with the new value entered into the input field
    setGraphName(event.target.value);
  };
    return (
        <div className='container-fluid'>
            <Header />
        
            <div className='row'>
            <Menu /> 
                <div className='col-md-9'>
                    <div className='centerC'>
                     <p className='text-center'>Kpi</p>   
                     <div className='grid-container-2'>
                        <div  className='grid-item'>
                            <p className='gname'>Kpi Name</p>   
                            <input
                                className='monthOn1 mmj'
                                value={kpiGraphName} // Bind the value of the input field to the state variable
                                onChange={(e) => setKpiGraphName(e.target.value)}// Call the handleInputChange function when the input value changes
                            />  
                        </div>
                
                        <div  className='grid-item'>
                            <p className='gname'>Kpi Graph Type</p>   
                            <select
                                style={{marginBottom: 20}}
                                id="dropdown"
                                value={selectedType}
                                className='selc'
                                onChange={(e) => setSelectedType(e.target.value)}
                            >
                                <option value="">--Select Kpi Type--</option>
                                <option value="Histogram">Histogram</option>
                                <option value="Pola">Pola</option>
                                <option value="Linear">Linear</option>
                            </select>

                         </div>

                </div>



                   {inputPairs.map((pair, index) => (
          <div className='columnChart' key={index}>
            <div className='grid-container-2'>
            <div  className='grid-item'>
            <input
              className='monthOn1 mmc'
              onChange={(e) => handleInputChange(index, 'x', e.target.value)}
              type="text"
              placeholder="Enter X value"
              value={pair.x}
            />
            </div>
            
            <div  className='grid-item'>
                <input
                className='monthOn1 mmc'
                onChange={(e) => handleInputChange(index, 'y', e.target.value)}
                type="number"
                placeholder="Enter Y value"
                value={pair.y}
                />
               
             </div>
             <button onClick={() => removePair(index)} className='mMi'>-</button>
            </div>
            
          </div>
        ))}
                <span className='addy' onClick={addNewPair}>+</span>
                {/* {visibleYears > 1 &&<span className='addy mmr' onClick={removeYear}>-</span>} */}
                        {/* Add Year button */}
                       

                       
                        
                        <button onClick={handleSubmit} className='subm'>Submit Data</button>
                    </div>
                </div>
            </div>
            <Toaster  position="top-right" />
        </div>
        );

}

export default EditKpi