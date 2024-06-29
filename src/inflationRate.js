import React, { useEffect, useState } from 'react';
import bci from './images/bc.png'; 
import bro from './images/bro.png'; 
import Header from './component/header';
import Menu from './component/menu';
import SideMenu2 from './component/sideMenu2';
import API_BASE_URL from './config/apiConfig';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import graph6 from './images/graph6.png'
import graph1 from './images/graph1.png'
import graph2 from './images/graph2.png'
import graph3 from './images/graph3.png'
import graph4 from './images/graph4.png'
import graph5 from './images/graph5.png'

function InflationRate() {

    const navigate = useNavigate();
    const access_token = localStorage.getItem('access_token');
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId;

    const projectId = localStorage.getItem('nProject');
    console.log(userId);

    const [graphData, setGraphData] = useState([]);
    const [selectedGraphData, setSelectedGraphData] = useState(null);
    const [selectedGraphId, setSelectedGraphId] = useState('');
    const graphType = "Inflation";

    const handleViewClick = (id) => {
        navigate(`/inflationGraphView/${id}`); // Navigate to the view page with the ID as a parameter
      };


      const handleEditClick = (id) => {
        navigate(`/inflationEdit/${id}`); // Navigate to the view page with the ID as a parameter
      };

      const handleDeleteClick = (id) => {
        deleteGraph(id); // Navigate to the view page with the ID as a parameter
      };

      const deleteGraph = async (id) => {
        try {
            const response = await fetch(API_BASE_URL + `/api/graph/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete graph');
            }

            console.log("deleted");
            setGraphData(graphData.filter(entry => entry._id !== id));
            
        } catch (error) {
            console.error('Error deleting all graphs:', error);
            // Handle error, e.g., show an error message
        }
    };
   
    useEffect(() => {
        const projectId = localStorage.getItem('nProject');
    
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
      const onClickHandler = () => navigate(`/inflationCreate`);
      return (

       
       
      

    <div className='container2'>
         <SideMenu2 />    
         <div className="main-content">
        
         <Header />
         <div className='main-content2' style={{paddingLeft:40, paddingRight:40}}>

         <div className='text-center'>
                    <p className='textHp'>Inflation</p>
                    <p className='textH'>You will need a Profesional</p>
                </div>
            
          <div className='bacWHI'>
       
                <div className="row">
            <div className="col-md-6">
                <p style={{fontWeight:700}}>Inflation</p>
            </div>

            <div className="col-md-6">
                <button className="btn mainBtn" onClick={onClickHandler}>Create</button>
            </div>
                </div>
            <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">BY</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            {graphData.map((entry, index) => (
                <tr key={entry._id}>
                    <td>{index + 1}</td>
                    <td>{entry.graphName}</td>
                    <td>{entry.userId.firstName}</td>
                    <td>{formatDate(entry.timeSent)}</td>
                    <td>{formatTime(entry.timeSent)}</td>
                    <td>
                        <button className="btn mainBtnView" onClick={() => handleViewClick(entry._id)}>View</button>
                        <button className="btn mainBtnEdit" onClick={() => handleEditClick(entry._id)}>Edit</button>
                        <button className="btn mainBtnDelete" onClick={() => handleDeleteClick(entry._id)}>Delete</button>
                        
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
    }




  export default InflationRate;
