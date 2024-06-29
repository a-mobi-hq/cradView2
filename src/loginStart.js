import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Toaster, toast } from 'sonner'
import { useNavigate,useLocation } from 'react-router-dom';
import API_BASE_URL from './config/apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

function Login() {

    //useEffect(() => {
    //     const wow = new WOW.WOW();
    //     wow.init();
    //   }, []);

    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const link = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;
    const match = link.match(/\/start\/(.+)/);
    const uniqueCode = match ? match[1] : '';

    console.log('Unique Code:', uniqueCode);

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
    const navigate = useNavigate()
    const onClickHandler = () => navigate(`/signup/start/`+uniqueCode);

    
  


  


    //Login
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        link: link,
        username: '',
        password: '',
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        
        login(formData);
    
       
      };
    
      const login = async (data) => {
        setLoading(true);
        try {

          
        console.log(data);
        console.log(JSON.stringify(data));
          const response = await fetch(API_BASE_URL+'/api/team/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

         // const data = response.json();
    
          if (response.status === 200) {
            console.log(response.status);
            console.log(response);
            const responseData = await response.json(); // Parse JSON response
      
     
      const { token } = responseData; // Access token directly from response
      setLoading(false);
      // Save access token to local storage
    
            console.log('Logged successfully');
            const userStatus = responseData.user.status
            console.log(responseData.user.status);
            if(userStatus === 'deactivated'){
              toast.error("This Account as been Deactivated");
            }else{
              localStorage.setItem('access_token', token);
              console.log('Access Token:', token);
              localStorage.setItem('access_token', token);
              navigate(`/home`);
            }
           
             // navigate(`/introduction1`)
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

  return (

<div className='container'>
   <div className='wholeP'>
    <div className='row'>
        <div className='col-md-6'>
          <div className='loginH'>
            <p className='lgT'>Login</p>
            <p className='lgT2'>Fill in neccessary details to proceed</p>
            <form onSubmit={handleSubmit}> 
            <div className="inputs-container">
                <label htmlFor="email" className='lab'>Email or Phone Number</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="custom-input"
                />

                <label htmlFor="password" className='lab'>Password</label>
                
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={formData.cpassword}
                    onChange={handleChange}
                    className="custom-input"
                  />
                  
                
                <span className="password-toggle" onClick={handleTogglePassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </span>
              </div>

              <button type="submit" className='btn loginBtn' disabled={loading}>
              
                { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
                { !loading && <span>Login</span>}
                
              </button>
              </form>
              <button className='btn loginBtn2' onClick={onClickHandler}>Sign Up</button>
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
   <Toaster  position="top-right" />
</div>
  );
}

export default Login;
