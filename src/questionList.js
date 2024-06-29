import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bci from './images/bc.png'; 
import bro from './images/bro.png'; 
import Header from './component/header';
import Menu from './component/menu';
import SideMenu from './component/sideMenu';
import API_BASE_URL from './config/apiConfig';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

function QuestionTwo ()  {
    const { id } = useParams();

    const navigate = useNavigate()
    
    const onClickHandler = () => navigate(``)

    const [question, setQuestion] = useState(null);
    const access_token = localStorage.getItem('access_token');
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId;

    const projectId = localStorage.getItem('nProject');
    const [loading, setLoading] = useState(false);
    console.log(userId);

    const questionType = "BusinessCaseBuilder";
    const questionSubType = "Introduction";
    const [answers, setAnswers] = useState([]);
    const [formData, setFormData] = useState({
        answer: '',
        });

        const handleChange = (e) => {
            setFormData({
              ...formData,
              [e.target.id]: e.target.value,
            });
          };
      
      const handleSubmit = (e) => {
        e.preventDefault();
        //createAnswer(formData);
      };


     
      useEffect(() => {
        const fetchQuestion = async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/api/question/${id}`, {
                headers: {
                  'Content-Type': 'application/json',
                   'Authorization': `Bearer ${access_token}` // Include the token in the Authorization header
                }
              });

            if (response.status === 200) {
              const data = await response.json();
              console.log(data.question.question);
              setQuestion(data.question.question);
              setLoading(false);
            } else {
                const result = await response.json();
                console.error('Error:', result['error']);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchQuestion();
      }, [id]);



    
    
    

    return (
        <>

<div className='container-fluid'>
    <Header />
    {/* <SideMenu />  */}
    <div className='row'>
    <Menu /> 
        <div className='col-md-9'>
        <div className='centerC'>
          
            <div className='text-center'>
                <p className='textHp'>Introduction</p>
                <p className='textH'>Make sure you answer all questions</p>
               
               
            </div>
            {question ? (
             <form onSubmit={handleSubmit}>
            <div>
           
            <p className='question'>{question}</p>
            <div className='container-textAs'>
                <textarea className='textAs' id="answer"  value={formData.answer} onChange={handleChange}></textarea>
            </div>
            <p className='suggest'>Your answer shouldn't be about money, It should be about solving a problem</p>
            <button type="submit" className='btn btn-primary curveNext' disabled={loading}>
              
                { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
                { !loading && <span>Next</span>}
              
              </button>
           
            </div>
            
            </form>
             ) : (
                <p></p>
              )}
        </div> 

       
  </div>
  </div>
  <Toaster  position="top-right" />
  </div>
  </>
    );
}

export default QuestionTwo

