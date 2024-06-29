import React, { Component, useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ReactDOM from "react-dom";
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import Header from './component/header';
import Menu from './component/menu';
import API_BASE_URL from './config/apiConfig';





function GrowthRateGraph({projectId, graphType }) {

  
    

      const [graphData, setGraphData] = useState([]);
    const [selectedGraphData, setSelectedGraphData] = useState(null);
    
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
    const graphType = "CustomerGrowth";
        const fetchData = async () => {
            try {
                // Fetch graph data based on projectId and graphType
                const response = await fetch(API_BASE_URL + `/api/graph?projectId=${projectId}&graphType=${graphType}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch graph data');
                }
                
                const data = await response.json();
                console.log(data);
                setGraphData(data);

                // Set the first graph name's data as selectedGraphData initially
                if (data.length > 0) {
                    setSelectedGraphData(data[0]);
                }
            } catch (error) {
                console.error('Error fetching graph data:', error);
                // Handle error, e.g., show error message to user
            }
        };

        fetchData();
    }, [projectId, graphType]);

    const handleGraphNameClick = (graphName) => {
        const selectedGraph = graphData.find(entry => entry.graphName === graphName);
        setSelectedGraphData(selectedGraph);
    };

      const transformGraphData = (graphData) => {
        if (!graphData) return null;

        const series = graphData.years.map((yearData) => ({
            name: `Year ${yearData.year}`,
            data: yearData.months.map((monthData) => parseFloat(monthData.value))
        }));

        const options = {
            chart: {
                height: 150,
                type: 'line',
                zoom: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: '',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: graphData.years[0].months.map((monthData) => monthData.month),
            }
        };

        return { series, options };
    };

    const chartData = transformGraphData(selectedGraphData);

      
  

  

 
      return (

        <div className="container-fluid">
        <Header />
       <div className="row">
       <Menu />    

       <div className='col-md-9'>
       <div className='centerG'>
        <div className="grP">
       {graphData.map((entry, index) => (
                    <li key={index} onClick={() => handleGraphNameClick(entry.graphName)} className="graphNameT">
                        {entry.graphName}
                    </li>
                ))}
        </div>
        <div className="modG">
          <div className="graph1">
                <div>
                  <div id="chart">
                  {selectedGraphData && (
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="line"
                    height={deviceType === 'mobile' ? 250 : deviceType === 'tablet' ? 300 : 350}
                    width={deviceType !== 'desktop' ? '100%' : 700}
                />
            )}
                  </div>
                  <div id="html-dist"></div>
                </div>

          </div>
        </div>
        <p className="graphtxtt">Company Growth Rate</p>
        </div>
</div> 
</div>
</div>
      );
    }




  export default GrowthRateGraph;