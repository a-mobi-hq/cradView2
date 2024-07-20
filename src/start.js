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
import { CiLock,CiMemoPad,CiGrid2V,CiViewTimeline,CiServer,CiTextAlignJustify,CiVideoOn,CiExport,CiDatabase,CiSettings,CiMicrochip,CiUser} from 'react-icons/ci';
import bolt from './images/bolt.png';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";


function InflationRateGraph({projectId, graphType }) {

  
    

    const [streak, setStreak] = useState('');
    const [timelineCount, setTimelineCount] = useState('');
    const [selectedGraphData, setSelectedGraphData] = useState(null);
    const [selectedGraphId, setSelectedGraphId] = useState('');
    
    const [deviceType, setDeviceType] = useState('desktop');

    const [timelines, setTimelines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const navigate = useNavigate();

    const token = localStorage.getItem('access_token'); 
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

  const handleClickB = () => {
    localStorage.setItem('selectedCase', 'BusinessCaseBuilder');
    navigate('/questionBusMain/Ideation/BusinessCaseBuilder');
  };

  const handleClickTi = () => {
   
    navigate('/TimelineView');
  };

  const handleClickPi = () => {
    navigate('/pitchDeckStart');
  };

  const handleClickP = () => {
    localStorage.setItem('selectedCase', 'Kpi');
    navigate('/kpi');
  };

  const handleClickI = () => {
    navigate('/questionBusMain/ProductDefinition/BusinessAnalysisPack');
  };

  const handleClickID = () => {
    navigate('/questionBusMain/InitialDesign/DomainName');
  };
  const handleClickCO = () => {
    navigate('/questionBusMain/Commercialization/BringTheMVPToFullScale');
  };

  const handleClickCh = () => {
    navigate('/generalSetting');
  };

  const handleClickC = () => {
    navigate('/craddule');
  };

  const handleClickSP = () => {
    navigate('/sharePhase');
  };

  const handleClickUp = () => {
    navigate('/uploadTask');
  };

  const handleClickCr = () => {
    navigate('/createTask');
  };

  const handleClickPr = () => {
    navigate('/profile');
  };

  const handleClickT = () => {
    navigate('/termAgreement');
  };

  const handleClickPri = () => {
    navigate('/privacy');
  };

  const handleClickS = () => {
    navigate('/scrapView');
  };
  
  const updateStreak = async () => {
    try {
     const projectId = localStorage.getItem('nProject');
      const token = localStorage.getItem('access_token'); 
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

      const response = await axios.post(API_BASE_URL+'/api/streak/', { userId,projectId });
      console.log(response);
      console.log(response.data.streak);
      setStreak(response.data.streak);

      // setStreak(response.data.streak);
      // setLoading(false);
    } catch (error) {
      console.log(error.response)
    }
  };
 
  useEffect(() => {
    updateStreak();
  }, []);



    
  
    useEffect(() => {
      const fetchTimelines = async () => {
        try {
            const projectId = localStorage.getItem('nProject');
          const response = await axios.get(API_BASE_URL+`/api/algo/${projectId}`);
          console.log(response);
          setTimelines(response.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchTimelines();
    }, [projectId]);


    useEffect(() => {
        const fetchTimelinesCount = async () => {
          try {
              const projectId = localStorage.getItem('nProject');
            const response = await axios.get(API_BASE_URL+`/api/timeline/count/projects/${userId}/${projectId}`);
            console.log(response);
            setTimelineCount(response.data);
            setLoading(false);
          } catch (error) {
            setError(error);
            setLoading(false);
          }
        };
    
        fetchTimelinesCount();
      }, [projectId]);


      return (

       
       
      

       <div className=''>
        <Header />
        <div className='container'>
            
            <div className="row">
                <div className="col-md-3">
                    <div className="caseBA" onClick={handleClickB}>
                        <p className="caseBAPV">View</p>
                        <p className="caseBAP">Ideation</p>
                        <p className="caseBAP2">Create your Idea from start to finish</p>
                        <p className="caseBAP3">10:20pm 10.10.2022</p>
                        <p className="caseBAP2">5 Documents</p>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="caseBA2" onClick={handleClickI}>
                        <p className="caseBA2PV">View</p>
                        <p className="caseBA2P">Product Definition</p>
                        <p className="caseBA2P2">Design your business processes and flow</p>
                        <p className="caseBA2P3">10:20pm 10.10.2022</p>
                        <p className="caseBA2P2">5 Documents</p>
                    </div>
                </div>
                
                <div className="col-md-3">
                    <div className="caseBA3" onClick={handleClickP}>
                        <p className="caseBA3PV">View</p>
                        <p className="caseBA3P">Kpi</p>
                        <p className="caseBA3P2">Create Custom Graphs that gives you more insight</p>
                        <p className="caseBA3P3">10:20pm 10.10.2022</p>
                        <p className="caseBA3P2">7 Graph Types</p>
                    </div>
                </div>


                <div className="col-md-3">
                    <div className="caseBA4" onClick={handleClickS}>
                        
                        <p className="caseBA4P">ScrapBook</p>
                        <p className="caseBA4P2">Create Notes that you can look back at later</p>

                        <button className="lookF">Have a Feel</button>

                    </div>
                </div>



               
               

                <div className="col-md-3">
                    <div className="caseBA3" onClick={handleClickID}>
                        <p className="caseBA3PV">View</p>
                        <p className="caseBA3P">Initial Design</p>
                        <p className="caseBA3P2">Plan design and add memebers to Team</p>
                        <p className="caseBA3P3">10:20pm 10.10.2022</p>
                        <p className="caseBA3P2">5 Documents</p>
                        <div style={{paddingBottom:10}}></div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="caseBA">
                        <p className="caseBAPV">View</p>
                        <p className="caseBAP">Validating and Testing</p>
                        <p className="caseBAP2">Test and validate your prodduct</p>
                        <p className="caseBAP3">10:20pm 10.10.2022</p>
                        <p className="caseBAP2">5 Documents</p>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="caseBA2" onClick={handleClickCO}>
                        <p className="caseBA2PV">View</p>
                        <p className="caseBA2P">Commercialization</p>
                        <p className="caseBA2P2">Get your product ready to launch for production</p>
                        <p className="caseBA2P3">10:20pm 10.10.2022</p>
                        <p className="caseBA2P2">5 Documents</p>
                        <div style={{paddingBottom:10}}></div>
                    </div>
                </div>
                
                <div className="col-md-3">
                    <div className="caseBA3" onClick={handleClickPi}>
                        <p className="caseBA3PV">View</p>
                        <p className="caseBA3P">Pitch Deck</p>
                        <p className="caseBA3P2">Store Pitch Decks and have access to resources</p>
                        <p className="caseBA3P3">10:20pm 10.10.2022</p>
                        <p className="caseBA3P2">5 Documents</p>
                        <div style={{paddingBottom:10}}></div>
                    </div>
                </div>



                <div className="col-md-12">
                    <div className="innerStart2">
                        <div style={{padding:37}}>
                            <p className="ttas">Create Task</p>
                            <div className="row">
                                <div className="col-md-3">
                                    <p style={{marginBottom:0, fontSize:13}}>You can create task and assign</p>
                                    <p style={{marginBottom:0, fontSize:13}}>To team members</p>
                                </div>

                                <div className="col-md-9">
                                    <div className="upgi" onClick={handleClickCr}>
                                        <p style={{marginBottom:0, color:"#fff"}}>Create Task</p>
                                        
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                      
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="innerStart">
                   
                        <div className="text-center">
                        <img src={bolt} alt="Streak" className="datImage" style={{width:"20%"}}/>
                        </div>
                            
                            <p className='dat2' style={{marginBottom:0}}>{streak} Days!</p>
                            <p className='dat2' style={{fontWeight:700}}>Streak</p>
                        
                    </div>
                </div>

              


                <div className="col-md-6">
                    <div className="innerStart">
                        <div style={{padding:37}}>
                            <p className="ttas">Total Task</p>
                            <div className="row">
                                <div className="col-md-3">
                                <p>{timelineCount !== '' ? timelineCount : 0}</p>
                                </div>

                                <div className="col-md-9">
                                {timelineCount !== '' && (
                                    <div className="upgi" onClick={handleClickUp}>
                                    <p style={{marginBottom:0, color:"#fff"}}>Upload Files</p>
                                    </div>
                                )}
                                </div>
                                
                            </div>
                            
                        </div>
                      
                    </div>
                </div>



                <div className="col-md-3">
                    <div className="innerStart" style={{padding:20}}>
                        <p className="crh1">Craddule Hub</p>
                        <p className="crh2">View uploaded files in your project</p>
                        <button className="lookF" style={{marginTop:20, marginBottom:20}} onClick={handleClickC}>View Files</button>
                    </div>
                </div>
            </div>

            <div className="col-md-12">
                    <div className="innerStart2">
                        <div style={{padding:37}}>
                            <p className="ttas">Share Phases</p>
                            <div className="row">
                                <div className="col-md-3">
                                    <p style={{marginBottom:0, fontSize:13}}>You Feel your file is ready</p>
                                    <p style={{marginBottom:0, fontSize:13}}>For review</p>
                                </div>

                                <div className="col-md-9">
                                    <div className="upgi" onClick={handleClickSP}>
                                        <p style={{marginBottom:0, color:"#fff"}}>Review</p>
                                        
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                      
                    </div>
                </div>

            
            <div className="row">
            {timelines.map((timeline) => (
                <div className="col-md-3">
                    <div className='progTeam'>
                        <p className='teamP'>{timeline.task}</p>
                        <progress value={timeline.completionPercentage} max="100" className='progressB'></progress>
                        <p className='teamP2'>{timeline.completionPercentage}% Done</p>
                        <p className="caseBAPV" style={{color:"#fff", marginTop:30}} onClick={handleClickTi}>View Feed</p>
                    </div>
                </div>
            ))}
            </div>


            <div className="row">
                <div className="col-md-3">
                    <div className="caseBA5" onClick={handleClickCh}>
                        <CiLock style={{color: "#fff",fontSize: 25}}/>
                        <p className="caseBA5P">Change Password</p>
                       
                        
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="caseBA5" onClick={handleClickPr}>
                        <CiUser style={{color: "#fff",fontSize: 25}}/>
                        <p className="caseBA5P">Edit Profile</p>
                       
                        
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="caseBA5" onClick={handleClickT}>
                        <CiMemoPad style={{color: "#fff",fontSize: 25}}/>
                        <p className="caseBA5P">Terms & Conditions</p>
                       
                        
                    </div>
                </div>


                <div className="col-md-3">
                    <div className="caseBA5" onClick={handleClickPri}>
                        <CiMemoPad style={{color: "#fff",fontSize: 25}}/>
                        <p className="caseBA5P">Privacy Policy</p>
                    </div>
                </div>

            </div>


            <div className="startWrap"></div>
        </div>
         
</div> 

      );
    }




  export default InflationRateGraph;
