import React, { Component, useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ReactDOM from "react-dom";
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import Header from './component/header';
import Menu from './component/menu';
import API_BASE_URL from './config/apiConfig';
import SideMenu2 from './component/sideMenu2';
import { useNavigate,Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function OperatingIncomeGraphView({projectId, graphType }) {

  
    

    const [graphData, setGraphData] = useState([]);
    const [selectedGraphData, setSelectedGraphData] = useState(null);
    const [graphName, setGraphName] = useState('');
    
    const [deviceType, setDeviceType] = useState('desktop');
    const { id } = useParams(); 

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
    const graphType = "Expenses";
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
                    const selectedData = data.find(item => item._id === id);
                    setSelectedGraphData(selectedData);
                    setGraphName(selectedGraphData.graphName)
                    console.log(selectedData);
                    
                }
            } catch (error) {
                console.error('Error fetching graph data:', error);
                // Handle error, e.g., show error message to user
            }
        };

        fetchData();
    }, [projectId, graphType]);

  

    const transformGraphData = (graphData) => {
      if (!graphData) return null;

      const series = graphData.years[0].months.map((monthData) => parseFloat(monthData.value));

      const options = {
          chart: {
              width: 380,
              type: 'pie',
          },
          labels: graphData.years[0].months.map((monthData) => monthData.month),
          responsive: [{
              breakpoint: 480,
              options: {
                  chart: {
                      width: 200
                  },
                  legend: {
                      position: 'bottom'
                  }
              }
          }]
      };

      return { series, options };
  };

    const chartData = transformGraphData(selectedGraphData);

  

 
      return (

        <div className='container2'>
        <SideMenu2 />    
        <div className="main-content">
       
        <Header />
        <div className="headGr">
            <p>{graphName}</p>
        </div>
        
        <div className="modG">
          <div className="graph1">
                <div className="graphC">
                  <div id="chart">
                  {selectedGraphData && (
               <ReactApexChart
               options={chartData.options}
               series={chartData.series}
               type="pie"
               height={deviceType === 'mobile' ? 250 : deviceType === 'tablet' ? 300 : 350}
               width={deviceType !== 'desktop' ? '100%' : 700}
           />
            )}
                  </div>
                  <div id="html-dist"></div>
                </div>

          </div>
        </div>

      
</div>
</div>
      );
    }




  export default OperatingIncomeGraphView;
