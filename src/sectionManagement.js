import React, { useState, useEffect, useRef } from 'react';
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 
import Header from './component/header';
import Menu from './component/menu';
import SectionInviteModal from './component/sectionInviteModal';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './config/apiConfig';
import API_BASE_WEB_URL from './config/apiConfigW';
import { Toaster, toast } from 'sonner'
import { jwtDecode } from "jwt-decode";



function SectionManagement ()  {

    //first dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const dropdownRef = useRef(null);

    const access_token = localStorage.getItem('access_token');
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId;

    const projectId = localStorage.getItem('nProject');
    console.log(projectId);
  
    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    // Function to handle option selection
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
      setIsDropdownOpen(false);
    };

    //second dropdown
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

    //third dropdown
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

    //fourth dropdown
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


     //fifth dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
    const [selectedOption4, setSelectedOption4] = useState('');
    const dropdownRef4 = useRef(null);
  
    // Function to toggle dropdown visibility
    const toggleDropdown4 = () => {
      setIsDropdownOpen4(!isDropdownOpen4);
    };
  
    // Function to handle option selection
    const handleOptionSelect4 = (option) => {
      setSelectedOption4(option);
      setIsDropdownOpen4(false);
    };

     //six dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen5, setIsDropdownOpen5] = useState(false);
    const [selectedOption5, setSelectedOption5] = useState('');
    const dropdownRef5 = useRef(null);
  
    // Function to toggle dropdown visibility
    const toggleDropdown5 = () => {
      setIsDropdownOpen5(!isDropdownOpen5);
    };
  
    // Function to handle option selection
    const handleOptionSelect5 = (option) => {
      setSelectedOption5(option);
      setIsDropdownOpen5(false);
    };

     //seventh dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen6, setIsDropdownOpen6] = useState(false);
    const [selectedOption6, setSelectedOption6] = useState('');
    const dropdownRef6 = useRef(null);
  
    // Function to toggle dropdown visibility
    const toggleDropdown6 = () => {
      setIsDropdownOpen6(!isDropdownOpen6);
    };
  
    // Function to handle option selection
    const handleOptionSelect6 = (option) => {
      setSelectedOption6(option);
      setIsDropdownOpen6(false);
    };

     //eight dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen7, setIsDropdownOpen7] = useState(false);
    const [selectedOption7, setSelectedOption7] = useState('');
    const dropdownRef7 = useRef(null);
  
    // Function to toggle dropdown visibility
    const toggleDropdown7 = () => {
      setIsDropdownOpen7(!isDropdownOpen7);
    };
  
    // Function to handle option selection
    const handleOptionSelect7 = (option) => {
      setSelectedOption7(option);
      setIsDropdownOpen7(false);
    };
    const [teamMembers, setTeamMembers] = useState([]);


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchTeamMembers = async () => {
      try {
        console.log(projectId);
        const response = await fetch(`${API_BASE_URL}/api/team/${projectId}`, {
          headers: {
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${access_token}` // Include the token in the Authorization header
          }
        });
        
        console.log("here");
        console.log("here");
        if (response.status === 200) {
          const data = await response.json();
          console.log(data.data);
          setTeamMembers(data.data);
          console.log(teamMembers)
          setLoading(false);
        }else{
          const result = await response.json();
          console.error('Error:', result['error']);
        }
       
      } catch (err) {
        setError(err);
        setLoading(false);
        console.log(err);
      }
    };

    useEffect(() => {
     
      console.log("work");
  
      fetchTeamMembers();
    }, [projectId]);

   


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

 // Close dropdown when clicking outside of it 5
 useEffect(() => {
  const handleClickOutside = (event) => {
      if (dropdownRef4.current && !dropdownRef4.current.contains(event.target)) {
          setIsDropdownOpen4(false);
      }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
      document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

 // Close dropdown when clicking outside of it 6
 useEffect(() => {
  const handleClickOutside = (event) => {
      if (dropdownRef5.current && !dropdownRef5.current.contains(event.target)) {
          setIsDropdownOpen5(false);
      }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
      document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

 // Close dropdown when clicking outside of it 7
 useEffect(() => {
  const handleClickOutside = (event) => {
      if (dropdownRef6.current && !dropdownRef6.current.contains(event.target)) {
          setIsDropdownOpen6(false);
      }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
      document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

 // Close dropdown when clicking outside of it 8
 useEffect(() => {
  const handleClickOutside = (event) => {
      if (dropdownRef7.current && !dropdownRef7.current.contains(event.target)) {
          setIsDropdownOpen7(false);
      }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
      document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


    const navigate = useNavigate()
    const [isOpen, setIsOpen]= useState(false);


    const onClickHandler = () => navigate(`/pageShare`)


    const handleRemove = async (memberId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/team/${memberId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${access_token}` 
          }
        });
  
        if (response.ok) {
          // Remove the deleted member from the teamMembers state
          setTeamMembers(prevMembers => prevMembers.filter(member => member._id !== memberId));
        } else {
          const result = await response.json();
          console.error('Error:', result['error']);
        }
      } catch (error) {
        console.error('Error removing team member:', error);
      }
    };

    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
      {/*  <img src={bci} className='bcA'></img>*/}
        <div className='centerC'>
            
            <div><p className='centerH1a'>Team Management</p>
            <p className='centerHp1a'>View, manage your memebers and send invites</p>
          </div>
            <div className='bottonInput'><input type="text" className='input2' placeholder="Search.."></input>
            {/*<button className="btn btn-primary curveX">Chat and message</button>*/}
            <button className="btn btn-primary curvej" onClick={()=>setIsOpen(true)}>Send Invite</button>
</div>
              <div className='container-team'>
                    
               

        <table class="table table-bordered">
            <thead class="thead-light">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {teamMembers.map(member => (
              <tr key={member._id}>
                <td>{`${member.userDetails.firstName} ${member.userDetails.lastName}`}</td>
                <td>{member.email || 'Not Set'}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleRemove(member._id)}>Remove</button>
                </td>
              </tr>
            ))}
            </tbody>
        </table>
             


               
                               
        </div> 
        </div>
        <SectionInviteModal open={isOpen} onClose={() => setIsOpen(false)}>

            </SectionInviteModal>   
          
  </div>
  </div>
  </div>
  </>
    );
}

export default SectionManagement
