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

function InflationMonthOnMonth() {
    const navigate = useNavigate();
    const onClickHandler = () => navigate(`/inflationRateGraph`);
    const onClickHandler1 = () => navigate(`/financialPintegrate`);

    const [monthInputs, setMonthInputs] = useState({});
    const [yearsData, setYearsData] = useState([]);
    const [graphName, setGraphName] = useState('');

    const token = localStorage.getItem('access_token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    const { id } = useParams();

    const projectId = localStorage.getItem('nProject');
    const graphType = "Inflation";

    // Function to handle changes in the input field
    const handleInputChangeName = (event) => {
        setGraphName(event.target.value);
    };

    const handleInputChange = (year, month, value) => {
        setMonthInputs(prevInputs => {
            const updatedYear = {
                ...prevInputs[`year${year}`],
                [month]: value
            };

            return {
                ...prevInputs,
                [`year${year}`]: updatedYear
            };
        });

        setYearsData(prevYearsData => {
            const updatedYearsData = [...prevYearsData];
            const yearIndex = updatedYearsData.findIndex(y => y.year === year);
            if (yearIndex !== -1) {
                updatedYearsData[yearIndex].months = updatedYearsData[yearIndex].months.map(m =>
                    m.month === month ? { ...m, value } : m
                );
            }
            return updatedYearsData;
        });
    };

    const addYear = () => {
        const newYear = {
            year: yearsData.length + 1,
            months: [
                { month: "JAN", value: "" },
                { month: "FEB", value: "" },
                { month: "MAR", value: "" },
                { month: "APR", value: "" },
                { month: "MAY", value: "" },
                { month: "JUN", value: "" },
                { month: "JULY", value: "" },
                { month: "AUG", value: "" },
                { month: "SEP", value: "" },
                { month: "OCT", value: "" },
                { month: "NOV", value: "" },
                { month: "DEC", value: "" }
            ]
        };
        setYearsData([...yearsData, newYear]);
        setMonthInputs(prev => ({
            ...prev,
            [`year${newYear.year}`]: newYear.months.reduce((acc, month) => {
                acc[month.month] = month.value;
                return acc;
            }, {})
        }));
    };

    const removeYear = () => {
        if (yearsData.length > 1) {
            setYearsData(yearsData.slice(0, -1));
            const newMonthInputs = { ...monthInputs };
            delete newMonthInputs[`year${yearsData.length}`];
            setMonthInputs(newMonthInputs);
        }
    };

    const sendDataToAPI = async (data) => {
        try {
            data.id = id;
            data.userId = userId;
            data.projectId = localStorage.getItem('nProject');
            data.graphType = "Inflation";
            data.graphName = graphName;

            console.log(data);
            
            const response = await axios.post(API_BASE_URL + '/api/graph/update', data);
            console.log('Graph saved successfully:', response.data);
            navigate('/inflationRateGraph');
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.error);
                console.error(error.response.data);
            }
            console.error('Error sending data to API:', error);
        }
    };

    const handleSubmit = () => {
        const dataToSend = {
            years: yearsData.map((yearData, index) => ({
                year: yearData.year,
                months: Object.entries(monthInputs[`year${yearData.year}`] || {}).map(([month, value]) => ({
                    month,
                    value
                }))
            })),
        };
        sendDataToAPI(dataToSend);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_BASE_URL + `/api/graph/single/${id}`);
                if (response.status === 200) {
                    const data = await response.json();
                    setYearsData(data.years);
                    setGraphName(data.graphName);

                    const initialMonthInputs = {};
                    data.years.forEach(year => {
                        initialMonthInputs[`year${year.year}`] = year.months.reduce((acc, month) => {
                            acc[month.month] = month.value;
                            return acc;
                        }, {});
                    });

                    setMonthInputs(initialMonthInputs);
                    console.log(data);
                } else {
                    throw new Error('Failed to fetch graph data');
                }
            } catch (error) {
                console.error('Error fetching graph data:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className='container-fluid'>
            <Header />
            <div className='row'>
                <Menu />
                <div className='col-md-9'>
                    <div className='centerC'>
                        <p className='text-center'>Inflation</p>
                        <p className='gname'>Graph Name</p>
                        <input
                            className='monthOn1 mmj'
                            value={graphName}
                            onChange={handleInputChangeName}
                        />
                        <div>
                            {yearsData.map((yearData, yearIndex) => (
                                <div key={yearIndex + 1}>
                                    <div className='year'>Year {yearIndex + 1}</div>
                                    <div className='wrapperChart'>
                                        <div className='columnsChart'>
                                            {yearData.months.map(monthData => (
                                                <div className='columnChart' key={monthData.month}>
                                                    <input
                                                        className='monthOn1'
                                                        onChange={(e) => handleInputChange(yearData.year, monthData.month, e.target.value)}
                                                        type="number"
                                                        value={monthInputs[`year${yearData.year}`]?.[monthData.month] || ""}
                                                    />
                                                    <p className='monthOn1T'>{monthData.month}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <span className='addy' onClick={addYear}>+</span>
                        {yearsData.length > 1 && <span className='addy mmr' onClick={removeYear}>-</span>}
                        <button onClick={handleSubmit} className='subm'>Submit Data</button>
                    </div>
                </div>
            </div>
            <Toaster position="top-right" />
        </div>
    );
}

export default InflationMonthOnMonth;
