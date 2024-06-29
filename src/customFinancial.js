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
function CustomFinancial() {

  const navigate = useNavigate()
  const onClickNext = () => navigate(`/inflation`);
    const access_token = localStorage.getItem('access_token');
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId;

    const projectId = localStorage.getItem('nProject');
    console.log(userId);

    // const navigate = useNavigate();
    // const onClickIF = () => navigate(`/Inflation`);
 
      return (

       
       
      

    <div className='container2'>
         <SideMenu2 />    
         <div className="main-content">
        
         <Header />
         <div className='main-content2' style={{paddingLeft:40, paddingRight:40}}>

         <div className='text-center'>
                    <p className='textHp'>Custom Financial Projection</p>
                    <p className='textH'>You will need a Profesional</p>
                </div>
            
            
           <div className='row'>
              <div className='col-md-4'>
                <div className='columnGraph' onClick={onClickNext}>
                      <img src={graph6} className='imgX'></img>
                      <p className='graphName'>Inflation Rate</p>
                </div> 
              </div>

              <div className='col-md-4'>
                <div className='columnGraph'>
                      <img src={graph5} className='imgX'></img>
                      <p className='graphName'>Operating Income</p>
                </div> 
              </div>

              <div className='col-md-4'>
                <div className='columnGraph'>
                      <img src={graph3} className='imgX'></img>
                      <p className='graphName'>Expensses</p>
                </div> 
              </div>

              <div className='col-md-4'>
                <div className='columnGraph'>
                      <img src={graph2} className='imgX'></img>
                      <p className='graphName'>Net Profit</p>
                </div> 
              </div>

              <div className='col-md-4'>
                <div className='columnGraph'>
                      <img src={graph4} className='imgX'></img>
                      <p className='graphName'>Customer Influx</p>
                </div> 
              </div>

              <div className='col-md-4'>
                <div className='columnGraph'>
                      <img src={graph1} className='imgX'></img>
                      <p className='graphName'>Company Growth Rate</p>
                </div> 
              </div>
           </div>
           
         </div>

        
    </div>
</div> 

      );
    }




  export default CustomFinancial;
