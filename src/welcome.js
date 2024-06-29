import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { text } from '@fortawesome/fontawesome-svg-core';

function Welcome() {

    //useEffect(() => {
    //     const wow = new WOW.WOW();
    //     wow.init();
    //   }, []);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
  
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
    const navigate = useNavigate()
    const onClickHandler = () => navigate(`/password`)
    const onClickHandler1 = () => navigate(`/signUp`)
    const onClickHandler2 = () => navigate(`/login`)
  return (

<div className='container'>
   <div className='wholeP'>
    <div className='row'>
        <div className='col-md-6'>
          <div className='loginHp'>
            <p className='lgT'>Welcome to Craddule</p>
            <p className='lgT2'>Make your product cool</p>

            <div className="inputs-container">
            <p className='lab1'>Input your details</p>
                <label htmlFor="email" className='lab'>Email</label>
            
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="custom-input"
                  />
      
                  
                  <label htmlFor="text" className='lab'>Full Name</label>
                <input
                  type="text"
                  id="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="custom-input"
                  placeholder='Enter first name'
                />
              </div>
              <p className='lab'>Already on Craddule? <a href=''onClick={onClickHandler2}>Login</a> now!</p>
              <button className='btn loginBtn1' onClick={onClickHandler}>Proceed</button>
              <p className='lab'>Already on Craddule? <a href=''onClick={onClickHandler1}>Sign Up</a> now!</p>
          </div>
          
        </div>

        <div className='col-md-6'>
          <div className='halfWh'>
            <div className='blurry'>
              <p>You will never do anything in this world without courage. It is the greatest quality of the mind next to honor</p>

              
            </div>
          </div>
        </div>
    </div>
    
      
   </div>

</div>
  );
}

export default Welcome;
