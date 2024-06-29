import React, { useState, useEffect, useRef } from 'react';
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';
import SectionInviteModal from './component/sectionInviteModal';




function TeamManagement ()  {


     //first dropdown
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



    const [isOpen, setIsOpen]= useState(false);

    const navigate = useNavigate()

    const onClickHandler = () => navigate(``)
    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
        <div className='centerC'>
           {/* <img src={bci} className='bcI'></img>*/}

            <div className='text-center'>
                <p className='centerH'>Getting your Team</p>
                <p className='centerHp'>Make sure you answer all questions</p>               
            </div>
            <p className='centerH1'>Team Management</p>
            <p className='centerHp1'>View, manage your memebers and send invites</p>
            <input type="text" className='input2' placeholder="Search.."></input>
            <p type='button' className='curveSend' onClick={()=>setIsOpen(true)}>Invite</p>
            <div className='container-secTeam'>
                    <div class="boxH1">
                    <div className='listT'>Name</div>
                    <div className='listU'>Team Members Permission</div>
                    <div className='remvo'>Revoke team member access</div>
                </div>
                <div class="boxH">
                    <div className='listT1'>Adunni Arike</div>
                   { /*<div type="button" data-toggle="dropdown" className='dropdown-toggle lst'>Change permission</div>*/}
                    <div  ref={dropdownRef} className="dropdown3 lst">
                <div className={`select3 ${isDropdownOpen ? 'select-clicked' : ''}`} onClick={toggleDropdown}>
                    <span classname="selected">{selectedOption|| "Change Permission"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu3 ${isDropdownOpen ? 'menu-open3' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect("Allow")} className='lili'>Allow</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect("Rejected")} className='lili1'>Rejected</li>
                </ul>
            </div>


                   {/* <div type="button" data-toggle="dropdown" className='dropdown-toggle txtp1'>Choose</div>*/}
          
                <div ref={dropdownRef4} className="dropdown3 txtp1">
                <div className={`select3 ${isDropdownOpen4 ? 'select-clicked' : ''}`} onClick={toggleDropdown4}>
                    <span classname="selected">{selectedOption4|| "Choose"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu3 ${isDropdownOpen4 ? 'menu-open3' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect4("NO")} className='lili'>NO</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect4("YES")} className='lili1'>YES</li>
                </ul>
            </div>
            </div> 


                <div class="boxH">
                    <div className='listT2'>Jeddiah Joshua</div>
                    {/*<div type="button" data-toggle="dropdown" className='dropdown-toggle lstS'>Change permission</div>*/}
                    <div ref={dropdownRef1} className="dropdown3 lstS">
                <div className={`select3 ${isDropdownOpen1 ? 'select-clicked' : ''}`} onClick={toggleDropdown1}>
                    <span classname="selected">{selectedOption1|| "Change Permission"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu3 ${isDropdownOpen1 ? 'menu-open3' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect1("Allow")} className='lili'>Allow</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect1("Rejected")} className='lili1'>Rejected</li>
                </ul>
            </div>


                    {/*<div type="button" data-toggle="dropdown" className='dropdown-toggle txtp2'>Choose</div>*/}
                    <div ref={dropdownRef5} className="dropdown3 txtp1">
                <div className={`select3 ${isDropdownOpen5 ? 'select-clicked' : ''}`} onClick={toggleDropdown5}>
                    <span classname="selected">{selectedOption5|| "Choose"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu3 ${isDropdownOpen5 ? 'menu-open3' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect5("NO")} className='lili'>NO</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect5("YES")} className='lili1'>YES</li>
                </ul>
            </div>

                </div>  



                <div class="boxH">
                    <div className='listT3'>Mark Joel</div>
                  {/*  <div type="button" data-toggle="dropdown" className='dropdown-toggle lisS'>Change permission</div>*/}
                    <div ref={dropdownRef2} className="dropdown3 lisS">
                <div className={`select3 ${isDropdownOpen2 ? 'select-clicked' : ''}`} onClick={toggleDropdown2}>
                    <span classname="selected">{selectedOption2|| "Change Permission"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu3 ${isDropdownOpen2 ? 'menu-open3' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect2("Allow")} className='lili'>Allow</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect2("Rejected")} className='lili1'>Rejected</li>
                </ul>
            </div>


                  {/*  <div type="button" data-toggle="dropdown" className='dropdown-toggle txtp3'>Choose</div>*/}
                    <div ref={dropdownRef6} className="dropdown3 txtp3">
                <div className={`select3 ${isDropdownOpen6 ? 'select-clicked' : ''}`} onClick={toggleDropdown6}>
                    <span classname="selected">{selectedOption6 || "Choose"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu3 ${isDropdownOpen6 ? 'menu-open3' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect6("NO")} className='lili'>NO</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect6("YES")} className='lili1'>YES</li>
                </ul>
            </div>

                </div> 



                <div class="boxH">
                    <div className='listT4'>Titilope Seun</div>
                   {/* <div type="button" data-toggle="dropdown" className='dropdown-toggle lstS1'>Change Permission</div>*/}
                    <div ref={dropdownRef3} className="dropdown3 lstS1">
                <div className={`select3 ${isDropdownOpen3 ? 'select-clicked' : ''}`} onClick={toggleDropdown3}>
                    <span classname="selected">{selectedOption3|| "Change Permission"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu3 ${isDropdownOpen3 ? 'menu-open3' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect3("Allow")} className='lili'>Allow</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect3("Rejected")} className='lili1'>Rejected</li>
                </ul>
            </div>


                   {/* <div type="button" data-toggle="dropdown" className='dropdown-toggle txtp4'>Choose</div>*/}
                    <div ref={dropdownRef7} className="dropdown3 txtp4">
                <div className={`select3 ${isDropdownOpen7 ? 'select-clicked' : ''}`} onClick={toggleDropdown7}>
                    <span classname="selected">{selectedOption7 || "Choose"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu3 ${isDropdownOpen7 ? 'menu-open3' : ''}`}>
                    <li type='button' onClick={() => handleOptionSelect7("NO")} className='lili'>NO</li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={() => handleOptionSelect7("YES")} className='lili1'>YES</li>
                </ul>
            </div>

                </div>

                               
        </div>  
        </div> 
  
        <button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>
           
        <SectionInviteModal open={isOpen} onClose={() => setIsOpen(false)}>

            </SectionInviteModal>   
  </div>
  </div>
  </div>
  </>
    );
}

export default TeamManagement