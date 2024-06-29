import React, { useCallback, useState, useRef,useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from './config/apiConfig';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import SideMenu2P from './component/sideMenu2P';
import DatePicker from 'react-datepicker';
import { SketchPicker } from 'react-color'; // Importing SketchPicker from react-color
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import Header from './component/header';
import ReactApexChart from 'react-apexcharts';
import { CiBoxes,CiCalculator1 ,CiDiscount1,CiGrid2V,CiViewTimeline,CiServer,CiTextAlignJustify,CiVideoOn,CiExport,CiDatabase,CiSettings,CiMicrochip,CiUser} from 'react-icons/ci';

const KPI = () => {
  const navigate = useNavigate()
 
  //const projectId = localStorage.getItem('nProject');
  const prototypeType = localStorage.getItem('selectedPrototype');

  const [graphData, setGraphData] = useState([]);
  const [selectedGraphData, setSelectedGraphData] = useState(null);
  const [graphName, setGraphName] = useState('');
  
  const [deviceType, setDeviceType] = useState('desktop');
  


 const access_token = localStorage.getItem('access_token');
   const decodedToken = jwtDecode(access_token);
   const userId = decodedToken.userId;
   const [selectedUsers, setSelectedUsers] = useState([]);

   const [showPicker, setShowPicker] = useState(false);
   const [selectedColor, setSelectedColor] = useState(''); // Initial color value
 
      // State variables to manage dropdown behavior
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const [selectedOption, setSelectedOption] = useState('');
      const [selectedDate, setSelectedDate] = useState(null);
      const [selectedDate1, setSelectedDate1] = useState(null);
      const dropdownRef = useRef(null);
      const [teamMembers, setTeamMembers] = useState([]);
      const [setError, error] = useState('');

      const [users, setUsers] = useState([]);
      
      
 
   const [loading, setLoading] = useState(true);
   const onClickHandler = () => navigate(`/pageFrontView`)
 
    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
     setIsDropdownOpen(!isDropdownOpen);
   };
 
   // Function to handle option selection
   const handleOptionSelect = (option) => {
     setSelectedOption(option);
     setIsDropdownOpen(false);
     
   };
 
      // Function to handle date selection
      const handleDateSelect = (date) => {
       setSelectedDate(date);
       setIsDropdownOpen(false);
   };
   const [kpi, setKpi] = useState([]);
 
   //Second Dropdown
 
         // State variables to manage dropdown behavior
         const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
         const [selectedOption1, setSelectedOption1] = useState('');
         const [selectStage, setSelectStage] = useState('');
         const dropdownRef1 = useRef(null);
 
       
         // Function to toggle dropdown visibility
         const toggleDropdown1 = () => {
           setIsDropdownOpen1(!isDropdownOpen1);
         };
       
         // Function to handle option selection
         const handleOptionSelect1 = (option) => {
           setSelectedOption1(option);
           setIsDropdownOpen1(false);
           
         };
 
                 // Function to handle date selection
      const handleDateSelect1 = (date) => {
         setSelectedDate1(date);
         setIsDropdownOpen1(false);
     };
   
 

    const onClickHandler27 = () => navigate(`/createKpi`);

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

    useEffect(() => {
        const projectId = localStorage.getItem('nProject');
        const fetchKpi = async () => {
            
          try {
            const kpiResponse = await fetch(API_BASE_URL + `/api/kpi/project/${projectId}`, {
                headers: {
                  'Content-Type': 'application/json', 
                  'Authorization': `Bearer ${access_token}` // Include the token in the request headers
                }
              });
            
          if(kpiResponse.status === 200) {
            // If summary exists, fetch the summary data
            const dataS = await kpiResponse.json();
            console.log(dataS);
            console.log("scrap "+dataS.data.scrap);
            setKpi(dataS.data);
           
         } else {
            
            const data = await kpiResponse.json();
            console.log(data);
            setLoading(false);
        }
          } catch (error) {
            setError(error.message);
            setLoading(false);
          }
        };
    
        fetchKpi();
      }, []);

      const formatDate = (dateString) => {
        const date = new Date(dateString);
    
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
    
        // Get the correct suffix for the day
        const getDaySuffix = (day) => {
          if (day > 3 && day < 21) return 'th';
          switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
          }
        };
    
        const dayWithSuffix = day + getDaySuffix(day);
    
        return `${dayWithSuffix} ${month} ${year}`;
      };
    
      const formatTime = (dateString) => {
        const date = new Date(dateString);
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
        // Get the correct suffix for the day
      
        return `${time}`;
      };
    

  const handleViewClick = (id) => {
    navigate(`/kpiView/${id}`); // Navigate to the view page with the ID as a parameter
  };

  const handleDeleteClick = (id) => {
    deleteGraph(id);
  };

  const deleteGraph = async (id) => {
    try {
        const response = await fetch(API_BASE_URL + `/api/kpi/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Failed to delete graph');
        }

        console.log("deleted");
        setKpi(kpi.filter(kpi => kpi._id !== id));
        
    } catch (error) {
        console.error('Error deleting all graphs:', error);
        // Handle error, e.g., show an error message
    }
};


  return (

    <div className='container2'>
    <SideMenu2P />
    <div className="main-content">
    <Header />
    <div className="main-content2">
    
    <div className='row'>
    <div className="col-md-6">
               
            </div>

    <div className="col-md-6">
                <button className="btn mainBtn" onClick={onClickHandler27} style={{marginTop:50,marginBottom:20}}>Create KPI</button>
            </div>
    </div>
    <div className='row'>
        <div className='col-md-3'>
            <div className='kpiB2' style={{backgroundColor: "#b1e6ff"}}>
                <div className='row'>
                    <div className='col-md-3'>
                        <div className='thC'>
                            <CiGrid2V />
                        </div>
                        
                    </div>

                    <div className='col-md-9'>
                        <p className='kbP'>Total Task</p>
                        <p style={{marginBottom:0}}>39</p>
                    </div>
                </div>
               
            </div>
        </div>


        <div className='col-md-3'>
            <div className='kpiB2' style={{backgroundColor: "#ffeb97"}}>
                <div className='row'>
                    <div className='col-md-3'>
                        <div className='thC'>
                            <CiServer />
                        </div>
                        
                    </div>

                    <div className='col-md-9'>
                        <p className='kbP'>Total KPI's</p>
                        <p style={{marginBottom:0}}>39</p>
                    </div>
                </div>
               
            </div>
        </div>


        <div className='col-md-3'>
            <div className='kpiB2' style={{backgroundColor: "#b6c8ff"}}>
                <div className='row'>
                    <div className='col-md-3'>
                        <div className='thC'>
                            <CiUser />
                        </div>
                        
                    </div>

                    <div className='col-md-9'>
                        <p className='kbP'>Total Members</p>
                        <p style={{marginBottom:0}}>39</p>
                    </div>
                </div>
               
            </div>
        </div>

        <div className='col-md-3'>
            <div className='kpiB2' style={{backgroundColor: "#ffbfb9"}}>
                <div className='row'>
                    <div className='col-md-3'>
                        <div className='thC'>
                            <CiMicrochip />
                        </div>
                        
                    </div>

                    <div className='col-md-9'>
                        <p className='kbP'>Total Feedback</p>
                        <p style={{marginBottom:0}}>39</p>
                    </div>
                </div>
               
            </div>
        </div>

       
    </div>
    
                 
      <div className='row'>
            {/* <div className='col-md-6'>
                <div className='kpiB'>
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="line"
                   
                />
                </div>
            </div>


            <div className='col-md-6'>
                <div className='kpiB'>
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="line"
                   
                />
                </div>
            </div> */}
    

          
      </div>

      <div className='bacWHI'>      
      <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            {kpi.map((kpi, index) => (
                <tr key={kpi._id}>
                    <td>{index + 1}</td>
                    <td>{kpi.kpiGraphName}</td>
                    <td>{kpi.kpiGraphType}</td>
                    <td>{formatDate(kpi.timeSent)}</td>
                    <td>{formatTime(kpi.timeSent)}</td>
                    <td>
                        <button className="btn mainBtnView" onClick={() => handleViewClick(kpi._id)}>View</button>
                        <button className="btn mainBtnDelete" onClick={() => handleDeleteClick(kpi._id)}>Delete</button>
                        
                    </td>
                </tr>
                ))}
            </tbody>

           
            </table>
            </div>
     
    </div>
    </div>
    </div>
   
  );
};

export default KPI;
