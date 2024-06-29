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

    const [currentIndex, setCurrentIndex] = useState(0);
    const [name, setName] = useState('');
    const [mainCategory, setMainCategory] = useState('');

    const [showScrollableDiv, setShowScrollableDiv] = useState(false);

    const handleToggle = () => {
      setShowScrollableDiv(!showScrollableDiv);
    };

    const items = [
      'Introduction',
      'Opportunity Analysis',
      'Market Analysis',
      'Solution Description',
      'Cost Analysis',
      'Risk And Mitigation Strategies Implementation Plan'
    ];
    
    let originalText = "";
      // First list: names as they are
      // const originalList = items.map((item, index) => (
      //   <li key={index}>{item}</li>
      // ));
    
      // Second list: names with spaces removed
      const modifiedList = items.map((item, index) => (
        <li key={index}>{item.replace(/\s+/g, '')}</li>
      ));

      useEffect(() => {
        checkAndFetchQuestions();
      }, []); // Run once on component mount
    
      const checkAndFetchQuestions = async () => {
        try {
          let foundUnansweredCategory = false;
          let index = currentIndex;
    
          while (!foundUnansweredCategory && index < modifiedList.length) {
            const currentCategory = modifiedList[index];
            console.log(currentCategory.props.children);
            const response = await fetchSummary(currentCategory.props.children);
    
            if (!response.data) {
              foundUnansweredCategory = true;
              
              setCurrentIndex(index); // Set the current index to the first unanswered category
              console.log(index);
              passFoward(currentCategory.props.children,index);
            }
            index++;
          }
    
          // if (!foundUnansweredCategory) {
          //   console.log('All categories are answered');
          //   // Handle scenario where all categories are answered
          // } else {
          //   console.log(items[currentIndex]);
          //   setName(items[currentIndex]);
          //   // Fetch unanswered questions for the current category
          //   await fetchUnansweredQuestion(modifiedList[index].props.children);
          // }
        } catch (error) {
          console.error('An error occurred:', error.message);
        }
      };

      const passFoward = async (category,currentCategory) => {
        console.log("pass "+ currentCategory)
        setName(items[currentCategory]);
        setMainCategory(category);
        await fetchUnansweredQuestion(category);
      }
    
      const fetchSummary = async (category) => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/summary/${projectId}/BusinessCaseBuilder/${category}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`,
            },
          });
          //const response = await fetch(`${API_BASE_URL}/api/summary/${projectId}/BusinessCaseBuilder/${category}`);
          if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            return data;
          } else {
            const errorMessage = `Error fetching summary: ${response.statusText}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
          }
        } catch (error) {
          console.error('An error occurred:', error.message);
          throw error;
        }
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

    const fetchUnansweredQuestion = async (category) => {
        try {
         console.log( "am here");
         console.log( "category"+ category);
          const response = await fetch(API_BASE_URL+`/api/new/question/${userId}/${projectId}/BusinessCaseBuilder/${category}`);
          if (response.status === 200) {
            const data = await response.json();
            if (!data.data) {
               //setNoMoreQuestions(true);
                navigate(`/questionBusMainSum/BusinessCaseBuilder/${mainCategory}`);
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
    
    // useEffect(() => {
       
    //     fetchUnansweredQuestion(); // Call the function to fetch the unanswered question
    //   }, [userId]);
      
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
         data.questionType = 'BusinessCaseBuilder'; 
         data.questionSubType = mainCategory; 

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

            fetchUnansweredQuestion(mainCategory);
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
                    <p className='textHp'>{name}</p>
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
