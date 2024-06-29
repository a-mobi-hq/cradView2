import React, { useEffect, useState } from 'react';
import bci from './images/bc.png'; 
import bro from './images/bro.png'; 
import Header from './component/header';
import Menu from './component/menu';
import SideMenu2 from './component/sideMenu2';
import API_BASE_URL from './config/apiConfig';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'


function QuestionBus() {

    const navigate = useNavigate()
    
    const onClickHandler = () => navigate(``)

    const [question, setQuestion] = useState(null);
    const access_token = localStorage.getItem('access_token');
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId;

    const projectId = localStorage.getItem('nProject');
    const [loading, setLoading] = useState(false);
    console.log(userId);

    const [showScrollableDiv, setShowScrollableDiv] = useState(false);

    const handleToggle = () => {
      setShowScrollableDiv(!showScrollableDiv);
    };

    const [formData, setFormData] = useState({
        answer: '',
        });

        const handleChange = (e) => {
            setFormData({
              ...formData,
              [e.target.id]: e.target.value,
            });
          };

    const fetchUnansweredQuestion = async () => {
        try {
          const response = await fetch(API_BASE_URL+`/api/new/question/${userId}/${projectId}/BusinessAnalysisPack/CustomerSegments`);
          if (response.status === 200) {
            const data = await response.json();
            if (!data.data) {
            //   setNoMoreQuestions(true);
                navigate(`/questionBapCsSum`);
            } else {
              setQuestion(data.data);
            }
            // setQuestion(data.data); // Set the fetched question to state
          } else {
            const errorMessage = `Error fetching question: ${response.statusText}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
          }
        } catch (error) {
          console.error('An error occurred:', error.message);
        }
      };
    
    useEffect(() => {
       
        fetchUnansweredQuestion(); // Call the function to fetch the unanswered question
      }, [userId]);
      
      const handleSubmit = (e) => {
        e.preventDefault();
        createAnswer(formData);
      };

      const createAnswer = async (data) => {
        setLoading(true);
        
        try {
         data.userId = userId;  
         data.questionId = question._id; 
         data.projectId = projectId; 

          console.log(data);
          
          const response = await fetch(API_BASE_URL+'/api/answer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`,
            },
            body: JSON.stringify({data}),
          });
    
          if (response.status === 200) {
            // If submission is successful, fetch another question
            const responseData = await response.json();
            console.log(responseData);

            fetchUnansweredQuestion();
            setLoading(false);
            setFormData({
                     answer: '',
                  });
          } else {
            const result = await response.json();
            setLoading(false);
            toast.error(result['error']);
            console.error('Error:', result['error']);
          }
        } catch (error) {
            //toast.error(result['error']);  
            setLoading(false);
            console.error('An error occurred:', error);
        }
      };
      //submit answer

 
      return (

       
       
      

    <div className='container2'>
         <SideMenu2 />    
         <div className="main-content">
        
         <Header />
         <div className={`main-content2 ${showScrollableDiv ? 'shrink' : ''}`}>

         <div className='text-center'>
                    <p className='textHp'>Customer Segments</p>
                    <p className='textH'>Make sure you answer all questions</p>
                </div>
            
            <div>
                <p className='prq' onClick={handleToggle}>Previous Questions</p>
            </div>
            
            <div className='centerC'>
           
                
                {question ? (
                <form onSubmit={handleSubmit}>
                <div>
            
                <p className='question'>{question.question}</p>
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

         <div className={`scrollable-div ${showScrollableDiv ? 'show' : ''}`}>
            <button className="close-button" onClick={handleToggle}>X</button>
            <div className='qulis'>
                <p style={{marginBottom:7}}>What existing solutions or competitors are in this space, and how does your idea differentiate?</p>
            </div>
            <div className='qulis'>
                <p style={{marginBottom:7}}>What existing solutions or competitors are in this space, and how does your idea differentiate?</p>
            </div>
            <div className='qulis'>
                <p style={{marginBottom:7}}>What existing solutions or competitors are in this space, and how does your idea differentiate?</p>
            </div>
            <div className='qulis'>
                <p style={{marginBottom:7}}>What existing solutions or competitors are in this space, and how does your idea differentiate?</p>
            </div>
            <div className='qulis'>
                <p style={{marginBottom:7}}>What existing solutions or competitors are in this space, and how does your idea differentiate?</p>
            </div>
            <div className='qulis'>
                <p style={{marginBottom:7}}>What existing solutions or competitors are in this space, and how does your idea differentiate?</p>
            </div>
            
            
            {/* Add more content as needed */}
        </div>
    </div>
</div> 

      );
    }




  export default QuestionBus;
