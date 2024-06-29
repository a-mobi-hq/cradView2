import React, { useState, useEffect, useRef } from 'react';
import bci from './images/bc.png'; 
import solution from './images/solution.png'; 
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faRectangleList, faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import CreateTaskModal from './component/createTaskModal';
import AddUserModal from './component/addUserModal';




function TimelineBuilder ()  {
    const [isOpen, setIsOpen]= useState(false);
    const [isOpen1, setIsOpen1]= useState(false);
    const onClickHandler1 = () => navigate(`/timeline`);
    const navigate = useNavigate()

    const onClickHandler = () => navigate(``)
    return (
        
        <>

<div className='container-fluid'>
    <Header />
    <div className='row'>
    <Menu /> 
        
        <div className='col-md-9'>
                       <img src={bci} className='bcI'></img>
        <p className='centerH'>Timeline Builder</p>
                <p className='centerHp'>Here you can create and assign task</p> 
        <div className='centerC'>

            <div className='text-center'>
                              
            </div>
            <div className='timelineButton'>
            <p type='button' className='buttonTime' onClick={()=>setIsOpen(true)}>Creat Task</p>
            <p type='button' className='buttonTime' onClick={()=>setIsOpen1(true)}>Add User</p>
            </div>

                <table className='tTable'>

            <tr className='timeTable'>
                <th>Name</th>
                <th>Email</th>
                <th>Task</th>
                <th>Task Color</th>
                <th>Start Date</th>
                <th>End Date</th>
            </tr>
            <tr className='timeRow'>
                <td>Jedidah</td>
                <td>loremipsum@yahoo.com</td>
                <td>UX</td>
                <td><FontAwesomeIcon icon={faSquareFull} className='orange'/></td>
                <td>5/4/2024</td>
                <td>15/4/2024</td>
            </tr>
            <tr className='timeRow'>
                <td>Mike Idoma</td>
                <td>loremipsum@yahoo.com</td>
                <td>UI</td>
                <td><FontAwesomeIcon icon={faSquareFull} className='green'/></td>
                <td>8/4/2024</td>
                <td>17/4/2024</td>
            </tr>
            <tr className='timeRow'>
                <td>Aisha Aliyu</td>
                <td>loremipsum@yahoo.com</td>
                <td>UI</td>
                <td><FontAwesomeIcon icon={faSquareFull} className='green'/></td>
                <td>8/4/2024</td>
                <td>17/4/2024</td>
            </tr>
            <tr className='timeRow'>
                <td>Joseph Smith</td>
                <td>loremipsum@yahoo.com</td>
                <td>Development</td>
                <td><FontAwesomeIcon icon={faSquareFull} className='red'/></td>
                <td>5/4/2024</td>
                <td>15/4/2024</td>
            </tr>

                </table>
                
       



           

                                
        </div> 
  
        <button className="btn btn-primary curveNext" onClick={onClickHandler}>Next</button>
           
  </div>
  <CreateTaskModal open={isOpen} onClose={() => setIsOpen(false)}>

          </CreateTaskModal>
          <AddUserModal open={isOpen1} onClose={() => setIsOpen1(false)}>

          </AddUserModal>
  </div>
  </div>
  </>
    );
}

export default TimelineBuilder