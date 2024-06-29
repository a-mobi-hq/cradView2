import React, { useState } from 'react';
import bci from './images/bc.png'; 
import bob from './images/bob.png'; 
import Header from './component/header';
import SettingMenu from './component/settingMenu';
import { useNavigate } from 'react-router-dom';





function PageSub ()  {
  const [isOpen, setIsOpen]= useState(false);

    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/generalSetting`)
    const onClickHandler1 = () => navigate(`/planSub`)

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
        <img src={bci} className='bcA' type='button' onClick={onClickHandler}></img>
        <div className='centerS'>
          <div className='topDiv'>
            <p className='topDivT'>Current Plan</p>
            <p className='topDivSub'>See information regarding your current plan</p>
          </div>

          <div className='subCont'>
          <div className='topDiv1'>
            <p className='topDivT'>Craddule Pro</p>
            <p className='topDivSub1'>Current plan ends on Wednesday, Jun 21, 2024.</p>
          </div>
            <div className='cancelSubButt'>
            <button className="btn btn-primary cancelSubc" onClick={onClickHandler1}>Upgrade Plan</button>
            </div>
            <div className='bottomCanDiv'>
            <p className='bottomCan' type='button'>Cancel Subscription</p>
          </div>

          </div>

        </div> 




       <div className='centerC'>
      <div>
           <div className='bigHeading'>
            <p className='bigHeadingTxt'>Billing History</p>
           </div>
           <div className='billHeading'>
            <div className='billList'>
              <p className='theList'>Invoice</p>
              <p className='theList'>Amount</p>
              <p className='theList'>Date</p>
              <p className='theList'>Status</p>
            </div>
            <div className='billList1'>
              <p className='theList'>INV-363362</p>
              <p className='theList'>N10,000</p>
              <p className='theList'>Apr 12, 2024</p>
              <div className='thelistDiv1' type='button'><p className='theListP'>Paid</p></div>
            </div>
            <div className='billList2'>
              <p className='theList'>INV-121464</p>
              <p className='theList'>N10,000</p>
              <p className='theList'>Apr 12, 2024</p>
              <p className='theListC' type='button'>cancelled</p>
            </div>
           </div>


            
    </div>
        </div> 
  
  
      {/*  <button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>*/}
           
          
  </div>
 
  </div>
  </div>
  </>
    );
}

export default PageSub