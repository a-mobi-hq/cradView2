import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { text } from '@fortawesome/fontawesome-svg-core';

function Password() {

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
    const onClickHandler = () => navigate(`/viewDocument`)
    const onClickHandler1 = () => navigate(`/signUp`)
  return (

<div className='container'>
   <div className='wholeP'>
    <div className='row'>
        <div className='col-md-6'>
          <div className='loginHp'>
            <p className='lgT'>Password</p>
            <p className='lgT2'>Input Auto-Generated password sent to your email</p>

            <div className="inputs-container">
                <label htmlFor="password" className='lab'>Password</label>
            
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="custom-input"
                    placeholder='Enter Auto-Generated password here'
                  />
                   <span className="password-toggle" onClick={handleTogglePassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </span>
                  
              </div>

              <button className='btn loginBtn' onClick={onClickHandler}>Proceed</button>
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

export default Password;
