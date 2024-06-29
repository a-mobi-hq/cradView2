import React, { useState, useEffect } from 'react';
import Header from './component/header';
import Menu from './component/menu';
import ShareModal from './component/shareModal';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from './config/apiConfig';
import API_BASE_WEB_URL from './config/apiConfigW';
import axios from 'axios';
import p3 from './images/p3.jpeg';

function Timeline() {
return (
    <>

    
      <div className='container-fluid'>
        
      <div class="scrollable-div">
        <div class="scrollable-content tTop">
            <div className='tmD'>
                <p className='tmDP1'>Fri</p>
                <p className='tmDP'>9</p>
                <div class="dotted-line"></div>
            </div>

            <div className='tmD'>
                <p className='tmDP1'>Sat</p>
                <p className='tmDP'>10</p>
                <div class="dotted-line"></div>
            </div>

            <div className='tmD'>
                <p className='tmDP1'>Sun</p>
                <p className='tmDP'>11</p>
                <div class="dotted-line"></div>
            </div>

            <div className='tmD'>
                <p className='tmDP1'>Mon</p>
                <p className='tmDP'>12</p>
                <div class="dotted-line"></div>
            </div>

            <div className='tmD'>
                <p className='tmDP1'>Tue</p>
                <p className='tmDP'>13</p>
                <div class="dotted-line"></div>
            </div>

            <div className='tmD'>
                <p className='tmDP1'>Wed</p>
                <p className='tmDP'>14</p>
                <div class="dotted-line"></div>
            </div>

            <div className='tmD'>
                <p className='tmDP1'>Thu</p>
                <p className='tmDP'>15</p>
                <div class="dotted-line"></div>
            </div>

            <div className='tmD'>
                <p className='tmDP1'>Fri</p>
                <p className='tmDP'>16</p>
                <div class="dotted-line"></div>
            </div>

            <div className='tmD'>
                <p className='tmDP1'>Sat</p>
                <p className='tmDP'>17</p>
                <div class="dotted-line"></div>
            </div>

            <div className='tmD'>
                <p className='tmDP1'>Sun</p>
                <p className='tmDP'>18</p>
                <div class="dotted-line"></div>
            </div>

            <div className='tmD'>
                <p className='tmDP1'>Mon</p>
                <p className='tmDP'>19</p>
                <div class="dotted-line"></div>
            </div>

            <div className='tmD'>
                <p className='tmDP1'>Tu</p>
                <p className='tmDP'>20</p>
                <div class="dotted-line"></div>
            </div>

            <div className='tmD'>
                <p className='tmDP1'>Wed</p>
                <p className='tmDP'>21</p>
                <div class="dotted-line"></div>
            </div>

            <div className='tmD'>
                <p className='tmDP1'>Thu</p>
                <p className='tmDP'>22</p>
                <div class="dotted-line"></div>
            </div>

            <div className='tmD'>
                <p className='tmDP1'>Fri</p>
                <p className='tmDP'>23</p>
                <div class="dotted-line"></div>
            </div>

            <div className='tmD'>
                <p className='tmDP1'>Sat</p>
                <p className='tmDP'>24</p>
                <div class="dotted-line"></div>
            </div>

            <div className='tmD'>
                <p className='tmDP1'>Sun</p>
                <p className='tmDP'>25</p>
                <div class="dotted-line"></div>
            </div>

            <div className='tmD'>
                <p className='tmDP1'>Mon</p>
                <p className='tmDP'>26</p>
                <div class="dotted-line"></div>
            </div>

            <div className='tmD'>
                <p className='tmDP1'>Tue</p>
                <p className='tmDP'>27</p>
                <div class="dotted-line"></div>
            </div>

            <div className='tmD'>
                <p className='tmDP1'>Wed</p>
                <p className='tmDP'>28</p>
                <div class="dotted-line"></div>
            </div>

            <div className='tmD'>
                <p className='tmDP1'>Thu</p>
                <p className='tmDP'>29</p>
                <div class="dotted-line"></div>
            </div>

            


            
        </div>
    </div>

    <div class="top-div">
            
                <div className='grid-container2'>
                    <div className='grid-item'>
                        <div className='border-div '></div>
                    </div>

                    <div className='grid-item2' style={{ textAlign: 'start' }}>
                        <p className='tmev'>Research</p>
                        <p className='tmdar'>APRIL 5TH - APRIL 10TH</p>
                        <div class="progress-bar">
                            <div class="progress"></div>
                        </div>
                    </div>

                    <div className='grid-item2' style={{ textAlign: 'start',paddingTop: '20px' }}>
                        <span className='sideP'>30%</span>
                    </div>

                    <div className='grid-item2' style={{ textAlign: 'start' }}>
                        <span className='sideP'>Assignees</span>
                        <div class="proTop2">
                            <img src={p3} alt="Circular Image" className="circular-image-top2"/>
                        </div>

                        <div class="proTop2">
                            <img src={p3} alt="Circular Image" className="circular-image-top2"/>
                        </div>
                
                    </div>
                </div>
                    
                


                   
                    
               

            
            
            
        </div>


        <div class="top-div" style={{marginTop: "30px",marginLeft: "70px"}}>
            
            <div className='grid-container2'>
                <div className='grid-item'>
                    <div className='border-div' style={{ textAlign: 'start',backgroundColor: 'red' }}></div>
                </div>

                <div className='grid-item2' style={{ textAlign: 'start' }}>
                    <p className='tmev'>UI</p>
                    <p className='tmdar'>APRIL 5TH - APRIL 10TH</p>
                    <div class="progress-bar">
                        <div class="progress" style={{backgroundColor: 'red' }}></div>
                    </div>
                </div>

                <div className='grid-item2' style={{ textAlign: 'start',paddingTop: '20px' }}>
                    <span className='sideP'>40%</span>
                </div>

                <div className='grid-item2' style={{ textAlign: 'start' }}>
                    <span className='sideP'>Assignees</span>
                    <div class="proTop2">
                        <img src={p3} alt="Circular Image" className="circular-image-top2"/>
                    </div>

                    <div class="proTop2">
                        <img src={p3} alt="Circular Image" className="circular-image-top2"/>
                    </div>
            
                </div>
            </div>
                
            


               
                
           

        
        
        
    </div>


    <div class="top-div" style={{marginTop: "30px",marginLeft: "190px"}}>
            
            <div className='grid-container2'>
                <div className='grid-item'>
                    <div className='border-div' style={{ textAlign: 'start',backgroundColor: 'blue' }}></div>
                </div>

                <div className='grid-item2' style={{ textAlign: 'start' }}>
                    <p className='tmev'>Wireframe</p>
                    <p className='tmdar'>APRIL 5TH - APRIL 10TH</p>
                    <div class="progress-bar">
                        <div class="progress" style={{backgroundColor: 'blue' }}></div>
                    </div>
                </div>

                <div className='grid-item2' style={{ textAlign: 'start',paddingTop: '20px' }}>
                    <span className='sideP'>40%</span>
                </div>

                <div className='grid-item2' style={{ textAlign: 'start' }}>
                    <span className='sideP'>Assignees</span>
                    <div class="proTop2">
                        <img src={p3} alt="Circular Image" className="circular-image-top2"/>
                    </div>

                    <div class="proTop2">
                        <img src={p3} alt="Circular Image" className="circular-image-top2"/>
                    </div>
            
                </div>
            </div>
                
            


               
                
           

        
        
        
    </div>


    <div class="top-div" style={{marginTop: "30px",marginLeft: "190px"}}>
            
            <div className='grid-container2'>
                <div className='grid-item'>
                    <div className='border-div' style={{ textAlign: 'start',backgroundColor: 'purple' }}></div>
                </div>

                <div className='grid-item2' style={{ textAlign: 'start' }}>
                    <p className='tmev'>Development</p>
                    <p className='tmdar'>APRIL 5TH - APRIL 10TH</p>
                    <div class="progress-bar">
                        <div class="progress" style={{backgroundColor: 'blue' }}></div>
                    </div>
                </div>

                <div className='grid-item2' style={{ textAlign: 'start',paddingTop: '20px' }}>
                    <span className='sideP'>40%</span>
                </div>

                <div className='grid-item2' style={{ textAlign: 'start' }}>
                    <span className='sideP'>Assignees</span>
                    <div class="proTop2">
                        <img src={p3} alt="Circular Image" className="circular-image-top2"/>
                    </div>

                    <div class="proTop2">
                        <img src={p3} alt="Circular Image" className="circular-image-top2"/>
                    </div>
            
                </div>
            </div>
                
            


               
                
           

        
        
        
    </div>

        
        
        </div>
    </>
      );
};

export default Timeline;
