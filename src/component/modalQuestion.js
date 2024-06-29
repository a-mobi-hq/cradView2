import React, { useState }from  "react";
import ReactDOM from "react-dom";
import { jwtDecode } from "jwt-decode";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

export default function ModalQuestion({ open, onClose}){

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');  
    const [formData, setFormData] = useState({
        projectName: '',
      });
    
 
    
   
      
    if(!open) return null
    return ReactDOM.createPortal(
        <>
            <div className="modalOv"></div>
            <div className="modalSt">
            { errorMessage &&  <p className="createER">Project name is empty</p>}
               
             <form>
            <div className="input-containerC">
                {/* <label htmlFor="projectName" className="creT">Create Project</label> */}
                <input
                    type="text"
                    id="projectName"
                    className="bottom-border-input"
                    placeholder="Why do you want to start a company"
                    // value={formData.projectName}
                    // onChange={handleChange}
                />
                </div>
                <button type="submit" className="createBT" disabled={loading}>
                { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin colw'/>}
                { !loading &&  <span className='iconSB'><span className="iconh"><HiOutlineArrowSmallRight /></span></span>}
                   
                </button>
                
                </form>
               
            </div>
        </>,
        document.getElementById('portal')
    )

}