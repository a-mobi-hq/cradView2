import React, { useEffect, useState } from 'react';
import bci from './images/bc.png'; 
import bob from './images/bob.png'; 
import Header from './component/header';
import Menu from './component/menu';
import { Toaster, toast } from 'sonner'
import WOW from 'wowjs';
import 'animate.css/animate.css'; // Import Animate.css
import 'wowjs/css/libs/animate.css';
import API_BASE_URL from './config/apiConfig';
import { jwtDecode } from "jwt-decode";
import SideMenu2 from './component/sideMenu2';

function GoPage ()  {
    useEffect(() => {
        const wow = new WOW.WOW();
        wow.init();
      }, []);

        const [loading, setLoading] = useState(false);
        const [gates, setGates] = useState([]);
        const [totalCount, setTotalCount] = useState(null);
        const [totalCountQ, setTotalCountQ] = useState(null);
        const [percentage, setPercentage] = useState('');

        const projectId = localStorage.getItem('nProject');
        console.log("pro "+projectId);

        const access_token = localStorage.getItem('access_token');
        const decodedToken = jwtDecode(access_token);
        const userId = decodedToken.userId;
        const questionType = "BusinessCaseBuilder";
       

        const [projectGoGates, setProjectGoGates] = useState([]);
        const stage = 'Ideation';

        const fetchProjectGoGates = async () => {
          try {
              const response = await fetch(API_BASE_URL+`/api/project/go/${projectId}/${stage}`);
              if (!response != 200) {
                console.log(response);
                //toast.error("This Account as been Deactivated");
              }
              const data = await response.json();
              console.log(data);
              setProjectGoGates(data.data);
          } catch (error) {
              console.error('Error fetching projectGoGates:', error);
          }
      };
    useEffect(() => {
       

        fetchProjectGoGates();
    }, [projectId, stage]);

    const handleAcceptClick = (id,goStatus) => {
      // Pass the _id of the ProjectGoGate entry to the updateStatus function
      updateStatus(id,goStatus);
  };

  const updateStatus = async (id, goStatus) => {
    setLoading(true);
    console.log("at change");
    try {
      
    
      const requestBody = { newStatus: goStatus,  gateId:id};
      const response = await fetch(API_BASE_URL+'/api/project/go/status/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify(requestBody),
      });

     // const data = response.json();

      if (response.status === 200) {
        console.log(response.status);
        console.log(response);
        const responseData = await response.json(); // Parse JSON response
        console.log(responseData);
        fetchProjectGoGates();
        //navigate('/login')
        //const { token } = responseData; // Access token directly from response
        setLoading(false);
        // Save access token to local storage

     
      } else {
        const result = await response.json();
        setLoading(false);
        toast.error(result['error']);
          console.error('Error:', result['error']);
        //console.error('Failed to create User');
      }
    } catch (error) {
      setLoading(false);
      console.error('An error occurred:', error);
    }
  };

        const calculatePercentage = () => {
            if (!totalCount || !totalCountQ) {
               // alert('Please enter both values.');
                return;
            }
            
            const calculatedPercentage = (totalCount / totalCountQ) * 100;
            setPercentage(calculatedPercentage.toFixed(2) + '%');
            console.log(calculatedPercentage.toFixed(2) + '%');
        };

    return (
       <>
       
       <div className='container2'>
         <SideMenu2 />    
         <div className="main-content">
        
         <Header />
       
         <div className='main-content2'>
            
            <div className='bacWHI'>

            <div className='text-center'>
                <p className='centerH pa wow fadeInLeft'>Go/ No-Go Gate</p>
               
            </div>

            <div className='wrapper'>

                <div className='columns'>
                    {/* <div className='columnG gogo wow fadeInUp'>
                        <p className='goP'>Phase 1</p>
                        <p className='goP2'>Business Case Builder</p>

                        <div className='goH'>
                            <h1 className='goTitle'> Select Action</h1>
                            <h1 className='goSub'>This Phase as been accomplished, you can still go back to see what was done</h1>
                            <span className='goBtnP'>Revisit</span>
                        </div>
                    </div> */}

                {projectGoGates.map((projectGoGate, index) => (
                    <div className={`columnG gogo wow fadeInUp ${
                      projectGoGate.goStatus === 'not started' || projectGoGate.goStatus === 'denied' 
                          ? 'gogoN' 
                          : projectGoGate.goStatus === 'Approved' 
                              ? 'gogoA' 
                              : projectGoGate.goStatus === 'Denied' 
                              ? 'gogoD' 
                                : projectGoGate.goStatus === 'ongoing' 
                                    ? 'gogoO' 
                                    : ''
                    }`}>
                        <p className='goP'>{projectGoGate.phase}</p>
                        <p className='goP2'>{projectGoGate.goGate}</p>

                        {projectGoGate.goStatus === 'not started' && (
                            
                      
                        <div className='goH'>
                            <h1 className='goTitle'> Select Action</h1>
                            <h1 className='goSub'>Lets begin this phase</h1>
                            <span className='goBtnP' onClick={() => handleAcceptClick(projectGoGate._id,"Ongoing")}>Begin</span>
                           
                        </div>

                          )}

                        {projectGoGate.goStatus === 'Ongoing' && (
                            
                      
                            <div className='goH'>
                                <h1 className='goTitle'> Select Action</h1>
                                <h1 className='goSub'>You will have to accept or deny that this phase meets the require standard</h1>
                                <span className='goBtnP' onClick={() => handleAcceptClick(projectGoGate._id,"Approved")}>Accept</span>
                                <span className='goBtnPD' onClick={() => handleAcceptClick(projectGoGate._id,"Denied")}>Deny</span>
                            </div>
    
                              )}


                       

                            {projectGoGate.goStatus === 'Denied' && (
                            
                      
                            <div className='goH'>
                                <h1 className='goTitle'> Select Action</h1>
                                <h1 className='goSub'>You will have to accept that this phase meets the require standard</h1>
                                <span className='goBtnP' onClick={() => handleAcceptClick(projectGoGate._id,"Approved")}>Accept</span>
                            </div>
    
                              )}
                    </div>

                  ))}

                    {/* <div className='columnG gogoG wow fadeInUp'>
                        <p className='goP'>Phase 2</p>
                        <p className='goP2'>Custom Financial Projection</p>

                        <div className='goH'>
                            <h1 className='goTitle'>No Action</h1>
                            <h1 className='goSub'>Can only Movge forward when you have passed previous stages</h1>
                           
                        </div>
                    </div>

                    <div className='columnG gogoG wow fadeInDown'>
                        <p className='goP'>Phase 3</p>
                        <p className='goP2'>Discounted Cash Flow</p>

                        <div className='goH'>
                            <h1 className='goTitle'>No Action</h1>
                            <h1 className='goSub'>Can only Movge forward when you have passed previous stages</h1>
                            
                        </div>
                    </div>

                    <div className='columnG gogoG wow fadeInDown'>
                        <p className='goP'>Phase 4</p>
                        <p className='goP2'>Comparable Companies</p>

                        <div className='goH'>
                            <h1 className='goTitle'>No Action</h1>
                            <h1 className='goSub'>Can only Movge forward when you have passed previous stages</h1>
                            
                        </div>
                    </div> */}

                    
                    
                </div>
            </div>
            </div>

           


        </div>
        </div>
        </div>
        </>
    );
}

export default GoPage
