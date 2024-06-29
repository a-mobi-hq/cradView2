import React, { useState } from 'react';
import bci from './images/bc.png'; 
import bob from './images/bob.png'; 
import Header from './component/header';
import SettingMenu from './component/settingMenu';
import { useNavigate } from 'react-router-dom';





function PlanSub ()  {
  const [isOpen, setIsOpen]= useState(false);

    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/pageSub`)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
  
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
    return (
        <>
 <div className='container-fluid'>
    <Header />
    <div className='row'>
    <SettingMenu /> 
        
        <div className='col-md-9'>
        <h1 className='centerHh'>Settings</h1>
        <p className='centerHh'>View and manage settings</p>
        <img src={bci} className='bcA' onClick={onClickHandler} type='button'></img>
        <div className='centerS'>
          <div className='topDiv'>
            <p className='topDivT'>Upgrade Plan</p>
            <p className='topDivSub'>See information regarding your current plan</p>
          </div>

          <div className='divPlan'>
         {/* <div className='divPlan1'>
            <div className='planTittle'>
                <p className='planHead'>Basic</p>
                <p className='planHead'>N10,000<span className='planSmall'>/month</span></p>
                <p className='state'>Ideal for small teams, offering essential tools and feature</p>
            </div>
            <hr className='rule'></hr>
            <div className='thePlanDiv'>
                <ul>
                    <li className='thePlan'>Ideal for small teams, offering essential tools.</li>
                    <li className='thePlan'>Ideal for small teams, offering essential tools.</li>
                    <li className='thePlan'>Ideal for small teams, offering essential tools.</li>
                    <li className='thePlan'>Ideal for small teams, offering essential tools.</li>
                </ul>
            </div>
            <div className='planButton'>
            <button className="btn btn-primary thePlanButton">Current Plan</button>
            </div>
    </div>*/}

          <div className='divPlan2'>
            <div className='planTittle'>
                <p className='planHead'>Premium</p>
                <p className='planHead'>N10,000<span className='planSmall'>/month</span></p>
                <p className='state'>Ideal for small teams, offering essential tools and feature</p>
            </div>
            <hr className='rule'></hr>
            <div className='thePlanDiv'>
                <ul>
                    <li className='thePlan'>Ideal for small teams, offering essential tools.</li>
                    <li className='thePlan'>Ideal for small teams, offering essential tools.</li>
                    <li className='thePlan'>Ideal for small teams, offering essential tools.</li>
                    <li className='thePlan'>Ideal for small teams, offering essential tools.</li>
                </ul>
            </div>
            <div className='planButton'>
            <button className="btn btn-primary thePlanButton1">Upgrade to Premium</button>
            </div>
          </div>

          {/*<div className='divPlan3'>
            <div className='planTittle'>
                <p className='planHead'>Basic</p>
                <p className='planHead'>N10,000<span className='planSmall'>/month</span></p>
                <p className='state'>Ideal for small teams, offering essential tools and feature</p>
            </div>
            <hr className='rule'></hr>
            <div className='thePlanDiv'>
                <ul>
                    <li className='thePlan'>Ideal for small teams, offering essential tools.</li>
                    <li className='thePlan' >Ideal for small teams, offering essential tools.</li>
                    <li className='thePlan'>Ideal for small teams, offering essential tools.</li>
                    <li className='thePlan'>Ideal for small teams, offering essential tools.</li>
                </ul>
            </div>

            <div className='planButton'>
            <button className="btn btn-primary thePlanButton2">Upgrade to Platinum</button>
            </div>
</div>*/}

          
          </div>

        </div> 
  
  
      {/*  <button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>*/}
           
          
  </div>
 
  </div>
  </div>
  </>
    );
}

export default PlanSub