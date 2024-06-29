import React, { Component, useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ReactDOM from "react-dom";
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import Header from './component/header';
import Menu from './component/menu';
import API_BASE_URL from './config/apiConfig';
import proto from './images/proto.webp'
import { useNavigate,Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import SideMenu from "./component/sideMenu";
import SideMenu2 from './component/sideMenu2';


function InflationRateGraph({projectId, graphType }) {

  
    

    const [graphData, setGraphData] = useState([]);
    const [selectedGraphData, setSelectedGraphData] = useState(null);
    const [selectedGraphId, setSelectedGraphId] = useState('');
    
    const [deviceType, setDeviceType] = useState('desktop');

// Function to update deviceType state based on window width
const updateDeviceType = () => {
    if (window.innerWidth < 768) {
        setDeviceType('mobile');
    } else if (window.innerWidth < 1024) {
        setDeviceType('tablet');
    } else {
        setDeviceType('desktop');
    }
};
// Effect to update isMobile state on window resize
useEffect(() => {
  updateDeviceType();
  window.addEventListener('resize', updateDeviceType);
  return () => window.removeEventListener('resize', updateDeviceType);
}, []);


    useEffect(() => {
        const projectId = localStorage.getItem('nProject');
    const graphType = "Inflation";
        const fetchData = async () => {
            try {
                // Fetch graph data based on projectId and graphType
                const response = await fetch(API_BASE_URL + `/api/graph?projectId=${projectId}&graphType=${graphType}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch graph data');
                }
                
                const data = await response.json();
                console.log(data);
                console.log(data._id);
                setGraphData(data);

                // Set the first graph name's data as selectedGraphData initially
                if (data.length > 0) {
                    setSelectedGraphData(data[0]);
                    setSelectedGraphId(data[0]._id);
                }
            } catch (error) {
                console.error('Error fetching graph data:', error);
                // Handle error, e.g., show error message to user
            }
        };

        fetchData();
    }, [projectId, graphType]);

  

  

  

 
      return (

       
       
      

       <div className='container2'>
         <SideMenu2 />    
         <div className="main-content">
        
         <Header />
         <div className="main-content2">
            <div className="row">
                <div className="col-md-4">
                    <div className="image-card">
                        <img src={proto} alt="pror" className="image-card-img" />
                        <div className="image-card-overlay">
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="image-name">Prototype</p>
                                    <p className="image-uploader">Mark James</p>
                                </div>

                                <div className="col-md-6">
                                    <p className="image-time">10:00pm</p>
                                    
                                </div>
                            </div>
                        
                        
                        </div>
                        <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                    </div>
                </div>


                <div className="col-md-4">
                    <div className="image-card">
                        <img src={proto} alt="pror" className="image-card-img" />
                        <div className="image-card-overlay">
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="image-name">Prototype</p>
                                    <p className="image-uploader">Mark James</p>
                                </div>

                                <div className="col-md-6">
                                    <p className="image-time">10:00pm</p>
                                    
                                </div>
                            </div>
                        
                        
                        </div>
                        <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                    </div>
                </div>


                <div className="col-md-4">
                    <div className="image-card">
                        <img src={proto} alt="pror" className="image-card-img" />
                        <div className="image-card-overlay">
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="image-name">Prototype</p>
                                    <p className="image-uploader">Mark James</p>
                                </div>

                                <div className="col-md-6">
                                    <p className="image-time">10:00pm</p>
                                    
                                </div>
                            </div>
                        
                        
                        </div>
                        <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="image-card">
                        <img src={proto} alt="pror" className="image-card-img" />
                        <div className="image-card-overlay">
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="image-name">Prototype</p>
                                    <p className="image-uploader">Mark James</p>
                                </div>

                                <div className="col-md-6">
                                    <p className="image-time">10:00pm</p>
                                    
                                </div>
                            </div>
                        
                        
                        </div>
                        <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                    </div>
                </div>

            </div>
        </div>
        </div>
</div> 

      );
    }




  export default InflationRateGraph;
