import React, { useState, useEffect, useRef } from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import Time from './time';
import Progress from './progress';
import WorkLoad from './workLoad';
import Task from './task';
import Cost from './cost';
import API_BASE_URL from './config/apiConfig';
import ReactApexChart from 'react-apexcharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';



function TrackPage ( {projectId, graphType, xAxisData, yAxisData })  {
    const navigate = useNavigate()

    const onClickHandler = (event) => {
        // Your existing logic here
        navigate(`/kpiPage`)
        // New logic to handle active class
        const buttons = document.querySelectorAll('.tFeem');
        buttons.forEach(btn => btn.classList.remove('active'));
        event.currentTarget.classList.add('active');
    };
      //first dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [isNestedDropdownOpen, setIsNestedDropdownOpen] = useState(false);
    const [isNestedDropdownOpen1, setIsNestedDropdownOpen1] = useState(false);


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


    const dropdownRef = useRef(null);
  
    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const toggleNestedDropdown = () => {
        setIsNestedDropdownOpen(!isNestedDropdownOpen);
    }; 
    
    const toggleNestedDropdown1 = () => {
        setIsNestedDropdownOpen1(!isNestedDropdownOpen1);
    };

    // Function to handle option selection
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
      setIsDropdownOpen(false);
      setIsNestedDropdownOpen(false);
      setIsNestedDropdownOpen1(false);

    };

     // Close dropdown when clicking outside of it 1
     useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
                setIsNestedDropdownOpen(false);
                setIsNestedDropdownOpen1(false);

            }
        };
  
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const projectId = localStorage.getItem('nProject');
    const graphType = "Pie Chart";
        const fetchData = async () => {
            try {
                // Fetch graph data based on projectId and graphType
                const response = await fetch(API_BASE_URL + `/api/kpi?projectId=${projectId}&graphType=${graphType}`);
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

    const handleGraphTypeClick = (graphType) => {
        const selectedGraph = graphData.find(entry => entry.graphType === graphType);
        setSelectedGraphData(selectedGraph);
    };


   


    return (

        <>

        <div className='container-fluid'>
            <Header />
            <div className='row'>
            <Menu /> 
                <div className='col-md-9'>
                    <img src={bci} className='bcA'></img>
                       <div className='div-kpi1'><p>KPI</p></div>
                <div className='centerKpi1'>
                <div  className='topButtonKpi'>
                <button className="btn btn-primary tFeem" type="button"  onClick={onClickHandler}>Create KPI</button>
                <button className="btn btn-primary tFeem" type="button">Track KPI</button>
                {/* <button className="btn btn-primary dropdown-toggle tFeem" type="button" data-toggle="dropdown">Select Project</button> */}
                <div ref={dropdownRef} className="dropdown3 tFeem">
                <div className={`select8 ${isDropdownOpen ? 'select-clicked' : ''}`} onClick={toggleDropdown}>
                    <span classname="selected">{selectedOption|| "Select Project"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu8 ${isDropdownOpen ? 'menu-open8' : ''}`}>
                    <li type='button' className='liProject' onClick={toggleNestedDropdown}>My Project
                    <div className="caret8" ></div>
                    {isNestedDropdownOpen && (
                        <ul className="nested-menu8">
                            <li type='button' onClick={() => handleOptionSelect("Project 1")}>Project 1</li>
                            <hr className='listMar'></hr>
                            <li type='button' onClick={() => handleOptionSelect("Project 2")}>Project 2</li>
                        </ul>
                    )}
                    </li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={toggleNestedDropdown1} className='liProject'>Team Project
                    <div className="caret8" ></div>
                    {isNestedDropdownOpen1 && (
                        <ul className="nested-menu8">
                            <li type='button' onClick={() => handleOptionSelect("Project TA")}>Project TA</li>
                            <hr className='listMar'></hr>
                            <li type='button' onClick={() => handleOptionSelect("Project TB")}>Project TB</li>
                        </ul>
                    )}
                    </li>                  
                </ul>
            </div>
                </div>

                {/* <div  className='bottomButtonKpi'>
                <button className="btn btn-primary  tFeems" type="button">Add a KPI<br></br><p className='txtc'>Add a KPI manually</p></button>
                <button className="btn btn-primary  tFeems1" type="button">Search for a KPI <br></br><p className='txtc'>Browse and add KPI's from the library</p></button>
                <button className="btn btn-primary  tFeems2" type="button">Add a KPI Template<p className='txtc'>Browse and add KPI's from the library</p></button>
                </div> */}

                        <div className='trackHeader'>
                <div className='progressKpi'>

                <div className='streakBar'>
                        <FontAwesomeIcon icon={faBoltLightning} className='boltBig'/>
                        </div>


                    <div>
                        <p className='Ustreak1'>Time spent on page</p>
                    <div>
                        <div className='kpiStreak'>
                        <p className='Ustreak'>You</p>
                        </div>
                    <div className='streak'>
                        <div className='streakBar'>
                        <FontAwesomeIcon icon={faBoltLightning} className='bolt'/>
                        </div>
                        <div>
                        <p className='streakP'>Time spent today: 1:30hr on design</p>
                        <progress value="40" max="100"></progress>
                        <p className='streakP'>7 days streak</p>
                        </div>
                    </div>
                    </div>
                    </div>
                    

                    <div>
                        <p className='Ustreak1'>Team Member</p>
                    <div>
                        <div className='kpiStreak'>
                        <p className='Ustreak'>Mike Odubekun</p>
                        </div>
                    <div className='streak'>
                        <div className='streakBar'>
                        <FontAwesomeIcon icon={faBoltLightning} className='bolt'/>
                        </div>
                        <div>
                        <p className='streakP'>Time spent today: 1:30hr on design</p>
                        <progress value="40" max="100"></progress>
                        <p className='streakP'>7 days streak</p>
                        </div>
                    </div>
                    </div>
                    </div>

                    <div>
                    <div className='vivian'>
                        <div className='kpiStreak'>
                        <p className='Ustreak'>Vivian London</p>
                        </div>
                    <div className='streak'>
                        <div className='streakBar'>
                        <FontAwesomeIcon icon={faBoltLightning} className='bolt'/>
                        </div>
                        <div>
                        <p className='streakP'>Time spent today: 1:30hr on design</p>
                        <progress value="40" max="100"></progress>
                        <p className='streakP'>7 days streak</p>
                        </div>
                    </div>
                    </div>
                    </div>

                    <div>
                    <div className='vivian'>
                        <div className='kpiStreak'>
                        <p className='Ustreak'>Mark Anthony</p>
                        </div>
                    <div className='streak'>
                        <div className='streakBar'>
                        <FontAwesomeIcon icon={faBoltLightning} className='bolt'/>
                        </div>
                        <div>
                        <p className='streakP'>Time spent today: 1:30hr on design</p>
                        <progress value="40" max="100"></progress>
                        <p className='streakP'>7 days streak</p>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
                        </div>

                <div className='containerGraph'>
                <Progress/>
                <Task/>
                
             </div>
         
             <div className='containerGraph'>
                <Time/>
                <div className='healthGraph'>
                   <div className="graphNam">Health</div>
                   <table className='trackTable'> 

  <tr className=''>
    <td>Time</td>
    <td>14% ahead of schedule</td>
  </tr>
  <hr className='healthRule'></hr>

  <tr className=''>
  <td>Task</td>
    <td>12 tasks to be completed</td>
  </tr>
  <hr className='healthRule'></hr>

  {/* <br className='brkKpi'></br> */}
  <tr className=''>
  <td>WorkLoad</td>
  <td>0 task overdue</td>
  </tr>
  <hr className='healthRule'></hr>

  <tr className=''>
  <td>Progress</td>
  <td>14% complete</td>
  </tr>
  <hr className='healthRule'></hr>

  <tr className=''>
  <td>Cost</td>
  <td>42% under budget</td>
  </tr>
</table>

                  </div>
                
             </div>
             <div className='containerGraph'>
                <Cost/>
                <WorkLoad/>
                
             </div>
          
            
                </div> 
                <button className="btn btn-primary curveNext">Next</button>
          </div>
          </div>
          </div>
          </>
    );
}

export default TrackPage