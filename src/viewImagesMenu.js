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
import SideMenu2 from './component/sideMenu2';


function InflationRateGraph({projectId, graphType }) {

  
    

    const [graphData, setGraphData] = useState([]);
    const [selectedGraphData, setSelectedGraphData] = useState(null);
    const [selectedGraphId, setSelectedGraphId] = useState('');

    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleMenu = () => {
        setIsCollapsed(!isCollapsed);
    };


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

        <div className="container">
      <SideMenu2 />
      <div className="main-content">
        <h1>Main Content Area</h1>
        <p>This content area expands when the side menu collapses and retracts when it expands.</p>
      </div>
    </div>
      );
    }




  export default InflationRateGraph;
