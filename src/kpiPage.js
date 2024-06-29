import React, { useState, useEffect, useRef } from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';
import AddKpiModal from './component/addKpiModal';
import SearchKpiModal from './component/searchKpiModal';


function KPIPage ()  {
    const [isOpen, setIsOpen]= useState(false);
    const [isOpen1, setIsOpen1]= useState(false);

    const navigate = useNavigate()
    const onClickHandler = (event) => {
        // Your existing logic here
        navigate(`/trackPage`)
        // New logic to handle active class
        const buttons = document.querySelectorAll('.tFeem');
        buttons.forEach(btn => btn.classList.remove('active'));
        event.currentTarget.classList.add('active');
    };
      //first dropdown
    // State variables to manage dropdown behavior
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [isNestedDropdownOpen, setIsNestedDropdownOpen] = useState(false);
    const [isNestedDropdownOpen1, setIsNestedDropdownOpen1] = useState(false);
    const dropdownRef = useRef(null);
  
    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const toggleNestedDropdown = () => {
        setIsNestedDropdownOpen(!isNestedDropdownOpen);
    }; 
    
    const toggleNestedDropdown1 = () => {
        setIsNestedDropdownOpen1(!isNestedDropdownOpen1);
    };

    // Function to handle option selection
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
      setIsDropdownOpen(false);
      setIsNestedDropdownOpen(false);
      setIsNestedDropdownOpen1(false);

    };

     // Close dropdown when clicking outside of it 1
     useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
                setIsNestedDropdownOpen(false);
                setIsNestedDropdownOpen1(false);

            }
        };
  
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (

        <>

        <div className='container-fluid'>
            <Header />
            <div className='row'>
            <Menu /> 
                <div className='col-md-9'>
                    <img src={bci} className='bcA' onClick={onClickHandler}></img>
                    <div className='div-kpi1'><p>KPI</p></div>
                <div className='centerKpi1'>
                <div  className='topButtonKpi'>
                <button className="btn btn-primary tFeem" type="button">Create KPI</button>
                <button className="btn btn-primary tFeem" type="button" onClick={onClickHandler}>Track KPI</button>
                {/* <button className="btn btn-primary dropdown-toggle tFeem" type="button" data-toggle="dropdown">Select Project</button> */}
                <div ref={dropdownRef} className="dropdown3 tFeem">
                <div className={`select8 ${isDropdownOpen ? 'select-clicked' : ''}`} onClick={toggleDropdown}>
                    <span classname="selected">{selectedOption|| "Select Project"}</span>
                    <div class="caret3"></div>
                </div>
                <ul className={`menu8 ${isDropdownOpen ? 'menu-open8' : ''}`}>
                    <li type='button' className='liProject' onClick={toggleNestedDropdown}>My Project
                    <div className="caret8" ></div>
                    {isNestedDropdownOpen && (
                        <ul className="nested-menu8">
                            <li type='button' onClick={() => handleOptionSelect("Project 1")}>Project 1</li>
                            <hr className='listMar'></hr>
                            <li type='button' onClick={() => handleOptionSelect("Project 2")}>Project 2</li>
                        </ul>
                    )}
                    </li>
                    <hr className='listMar'></hr>
                    <li type='button' onClick={toggleNestedDropdown1} className='liProject'>Team Project
                    <div className="caret8" ></div>
                    {isNestedDropdownOpen1 && (
                        <ul className="nested-menu8">
                            <li type='button' onClick={() => handleOptionSelect("Project TA")}>Project TA</li>
                            <hr className='listMar'></hr>
                            <li type='button' onClick={() => handleOptionSelect("Project TB")}>Project TB</li>
                        </ul>
                    )}
                    </li>                  
                </ul>
            </div>
                </div>

                <div  className='bottomButtonKpi'>
                <button className="btn btn-primary  tFeems" type="button" onClick={()=>setIsOpen(true)}>Add a KPI<br></br><p className='txtc'>Add a KPI manually</p></button>
                <button className="btn btn-primary  tFeems1" type="button" onClick={()=>setIsOpen1(true)}>Search for a KPI <br></br><p className='txtc'>Browse and add KPI's from the library</p></button>
                <button className="btn btn-primary  tFeems2" type="button">Add a KPI Template<p className='txtc'>Browse and add KPI's from the library</p></button>
               </div>

                {/* <div class="boxA1">
                    <div className=''>Name</div>
                    <div>Unit</div>
                    <div>Frequency</div>
                    <div>Direction</div>
                    <div>Target</div>
                    <div>Calculated?</div>
                </div>
                <div class="boxA2">
                    <div className=''>Sales Revenue</div>
                    <div>#2,400,000</div>
                    <div>Daily</div>
                    <div className='No'>Up</div>
                    <div className='amt'>#1.200,00</div>
                    <div>No</div>
                    <div className='editT'><a href='' className='anchor'>Edit</a></div>
                    <div className='delete'><a href='' className='anchor1'>Delete</a></div>
                </div>
                <div class="flex-container box3">
                    <div className='list1'></div>
                </div>
                <div class="flex-container box3">
                    <div className='list1'></div>
                </div>
                <div class="flex-container box3">
                    <div className='list1'></div>
                </div>*/}

<table className='kpiTable'> 
  <tr className="boxA1">
    <th>Name</th>
    <th>Unit</th>
    <th>Frequency</th>
    <th>Direction</th>
    <th>Target</th>
    <th>Calculated</th>
    <th></th>
    <th></th>
  </tr>
  <tr className='boxA2'>
    <td>Sales Revenue</td>
    <td>#2,400,000</td>
    <td>Daily</td>
    <td>Up</td>
    <td>#1.200,00</td>
    <td>No</td>
    <td><a href='' className='anchor'>Edit</a></td>
    <td><a href='' className='anchor1'>Delete</a></td>
  </tr>
  <tr className='boxA3'>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  {/* <br className='brkKpi'></br> */}
  <tr className='boxA3'>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr className='boxA3'>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>
                </div> 
        
                <button className="btn btn-primary curveNext">Next</button>
                <AddKpiModal open={isOpen} onClose={() => setIsOpen(false)}>

</AddKpiModal>
<SearchKpiModal open={isOpen1} onClose={() => setIsOpen1(false)}>

</SearchKpiModal>
          </div>
          </div>
          </div>
          </>
    );
}

export default KPIPage