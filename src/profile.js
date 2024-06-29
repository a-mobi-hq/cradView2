import React, { useState, useEffect, useRef } from 'react';
import p1 from './images/p1.jpeg'; 
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 
import Header from './component/header';
import API_BASE_URL from './config/apiConfig';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';
import ImageModal from './component/imageModal';
import { Toaster, toast } from 'sonner'
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'



const Profile = () =>  {

     // State variables to manage dropdown behavior
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const dropdownRef = useRef(null);


  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  
//Second Dropdown
  // State variables to manage dropdown behavior
       const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
       const [selectedOption1, setSelectedOption1] = useState('');
       const dropdownRef1 = useRef(null);


  // Function to toggle dropdown visibility
  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
  };

   // Function to handle option selection
   const handleOptionSelect1 = (option) => {
    setSelectedOption1(option);
    setIsDropdownOpen1(false);
  };


//Third Dropdown
  // State variables to manage dropdown behavior
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState('');
  const dropdownRef2 = useRef(null);


// Function to toggle dropdown visibility
const toggleDropdown2 = () => {
setIsDropdownOpen2(!isDropdownOpen2);
};

// Function to handle option selection
const handleOptionSelect2 = (option) => {
setSelectedOption2(option);
setIsDropdownOpen2(false);
};


//fourth Dropdown
  // State variables to manage dropdown behavior
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [selectedOption3, setSelectedOption3] = useState('');
  const dropdownRef3 = useRef(null);


// Function to toggle dropdown visibility
const toggleDropdown3 = () => {
setIsDropdownOpen3(!isDropdownOpen3);
};

// Function to handle option selection
const handleOptionSelect3 = (option) => {
setSelectedOption3(option);
setIsDropdownOpen3(false);
};

 // Close dropdown when clicking outside of it 1
 useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);

  // Close dropdown when clicking outside of it 2
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
            setIsDropdownOpen1(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);

 // Close dropdown when clicking outside of it 3
 useEffect(() => {
  const handleClickOutside = (event) => {
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
          setIsDropdownOpen2(false);
      }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
      document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

// Close dropdown when clicking outside of it 4
useEffect(() => {
const handleClickOutside = (event) => {
    if (dropdownRef3.current && !dropdownRef3.current.contains(event.target)) {
        setIsDropdownOpen3(false);
    }
};

document.addEventListener('mousedown', handleClickOutside);
return () => {
    document.removeEventListener('mousedown', handleClickOutside);
};
}, []);

const access_token = localStorage.getItem('access_token');
const decodedToken = jwtDecode(access_token);
const userId = decodedToken.userId;

//Register

const [errorMessage, setErrorMessage] = useState('');
const [successMessage, setSuccessMessage] = useState('');

const [loading, setLoading] = useState(false);
const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    // Simulating fetching user details from an API
    const fetchUserDetails = async () => {
        try {
          const response = await fetch(API_BASE_URL+'/api/user/'+userId, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`,
            },
          });
            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                // Update user details state with fetched data
                const { firstName, lastName, email, phoneNumber } = data;
                setFormData({ firstName, lastName, email, phoneNumber });
            } else {
                const data = await response.json();
                console.log(data);
                console.error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    fetchUserDetails();
}, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    updateUser(formData);

   
  };

  const updateUser = async (data) => {
    setLoading(true);
    console.log("at change")
    try {

      console.log(data);
      const response = await fetch(API_BASE_URL+'/api/user/'+userId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify(data),
      });

     // const data = response.json();
      
      if (response.status === 200) {
        console.log(response.status);
        console.log(response);

        const responseData = await response.json(); // Parse JSON response
        console.log(responseData)
  
  setLoading(false);      

      } else {
        const result = await response.json();
        setLoading(false);
        toast.error(result['error']);
          console.error('Error:', result['error']);
        
      }
    } catch (error) {
      setLoading(false);
      console.error('An error occurred:', error);
    }
  };


const navigate = useNavigate()
const [isOpen, setIsOpen]= useState(false);

    const onClickHandler = () => navigate(`/introduction1`)
    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
        
        <div className='col-md-12'>
        <div className='centerP'>

        <form onSubmit={handleSubmit}>
            <div><p className='centerH1a'>Profile</p>
            <p className='centerHp1a'>View, manage your memebers and send invites</p>



            <button className="btn btn-primary curveN"  disabled={loading}>
              { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
                { !loading && <span>Save changes</span>}
                
              </button>

            {/* <button className="btn btn-primary curveI">Discard changes</button></div> */}
            </div>
            <p className='profileTitle'>Profile picture or company logo</p>

            <div className='profilePic'>
               <img src= {p1} className='imgPic' type='button'></img>
              {/* <p className='imgTittle' type='button'>Edit</p>*/}
                 <div ref={dropdownRef3} className="dropdown4 imgTittle">
                <div className={`select4 ${isDropdownOpen3 ? 'select-clicked' : ''}`} onClick={toggleDropdown3}>
                    <span classname="selected">{selectedOption3 || "Edit"}</span>
                    <div class=""></div>
                </div>
                <ul className={`menu6 ${isDropdownOpen3 ? 'menu-open6' : ''}`}>
                    <li type='button' className='imgItem' onClick={()=>setIsOpen(true)}>Upload a photo</li>
                    <hr className='listMar1'></hr>
                    <li type='button' className='imgItem'>Remove photo</li>
                </ul>
            </div>
            </div>


            <div className='filled1'>
            <label htmlFor="firstName" className='pageTittle'>First Name</label>
                <input 
                type="text"
                id="firstName" 
                value= {formData.firstName}
                onChange={handleChange}
                className='profileInput' 
                placeholder='First Name'
                />
                
            </div>
            <div className='filled2'>
                <label htmlFor="lastName" className='pageTittle'>Last Name</label>
                <input 
                type="text"
                id="lastName" 
                value= {formData.lastName}
                onChange={handleChange}
                className='profileInput' 
                placeholder='Last Name'
                />
            </div>

            <div className='filled2'>
                <label htmlFor="email" className='pageTittle'>Email</label>
                <input 
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className='profileInput' 
                placeholder='Email'
                />
            </div>

            <div className='filled2'>
                <label htmlFor="phone" className='pageTittle'>Phone Number</label>
                <input 
                 type="tel"
                 id="phoneNumber" 
                 value= {formData.phoneNumber}
                 onChange={handleChange}
                className='profileInput'  
                placeholder='Phone Number'
                />
            </div>
         </form>


            {/* <div className='filledd'>
            <div className="dropdown">
             <p class='pageTitle1'>Assign super admin/delegated</p> </div>
             <div className="dropdown">
             <p class='pageTitle1'>Delegate authority period</p>
              </div>
              </div>   */}
           

            {/* <div className='filled3a'>    
            <div ref={dropdownRef} className="dropdown">
                <div className={`select ${isDropdownOpen ? 'select-clicked' : ''}`} onClick={toggleDropdown}>
                    <span classname="selected">{selectedOption|| "Select from team member"}</span>
                    <div class="caret"></div>
                </div>
                <ul className={`menu ${isDropdownOpen ? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("Ade Yemaja")}>Ade Yemaja</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Jide Arowolo")}>Jide Arowolo</li>
                </ul>
            </div>

            
            <div ref={dropdownRef1} className="dropdown">
                <div className={`select ${isDropdownOpen1 ? 'select-clicked' : ''}`} onClick={toggleDropdown1}>
                    <span classname="selected" >{selectedOption1|| "Choose period"}</span>
                    <div class="caret"></div>
                </div>
                <ul className={`menu ${isDropdownOpen1? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect1("One Week")}>One Week</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect1("Two Weeks")}>Two Weeks</li>
                </ul>
            </div>
            </div> */}

         
       {/*<div class='dropdown'>
        <select class='dropdown-select'>
            <option value='' class="opP">Select from team member</option>
        </select>
        <div class='dropdown-arrow'></div>
    </div>
</div>
            <div className='filled2'>
                <p className='pageTittle'>Assign super admin/ delegated</p>
                <div className='member'><p className='textdiv'>Select from team member</p></div>
    </div>
       <div class='filled3'>
    <p class='pageTitle'>Assign super admin/delegated</p>
    <div class='dropdown'>
        <div class='custom-dropdown'>
            <span class='selected-option'>Select from team member</span>
            <ul class='options'>
                <li>Option 1</li>
                <li>Option 2</li>
            </ul>
        </div>
        <div class='dropdown-arrow'></div>
    </div>
</div>
            <div className='filledd'>
            <div className="dropdown">
                <p className='pageTittle1'>Age</p>
                <input className='profileInput'></input></div>
                <div className="dropdown">
                <div className={`select ${isDropdownOpen2 ? 'select-clicked' : ''}`} onClick={toggleDropdown2}>
                    <span classname="selected">{selectedOption1|| "Gender"}</span>
                    <div class="caret"></div>
                </div>
                <ul className={`menu ${isDropdownOpen2 ? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect2("Ade Yemaja")}>Ade Yemaja</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect2("Jide Arowolo")}>Jide Arowolo</li>
                </ul>
            </div>
                
            </div>*/}
{/* 
<div className='filledd'>
            <div className="dropdown">
             <p class='pageTitle1'>Age</p> </div>
             <div className="dropdown">
             <p class='pageTitle1'>Gender</p>
              </div>
              </div>  
           

            <div className='filled3'>    
            <div className="dropdown">
            <input className='profileInput1'></input></div>


               

            
            <div ref={dropdownRef2} className="dropdown">
                <div className={`select ${isDropdownOpen2 ? 'select-clicked' : ''}`} onClick={toggleDropdown2}>
                    <span classname="selected" >{selectedOption2|| "Select Gender"}</span>
                    <div class="caret"></div>
                </div>
                <ul className={`menu ${isDropdownOpen2? 'menu-open' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect2("Male")}>Male</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect2("Female")}>Female</li>
                </ul>
            </div>
            </div> */}
            
            <ImageModal open={isOpen} onClose={() => setIsOpen(false)}>

          </ImageModal>
      </div>  
        
  </div>
  <Toaster  position="top-right" />

  </div>
  </div>
  </>
    );
}

export default Profile
