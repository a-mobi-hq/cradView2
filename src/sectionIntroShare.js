import React, { useState,useEffect,useRef } from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import Menu from './component/menu';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from './config/apiConfig';
import { Toaster, toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch,faChevronDown,faBold, faItalic, faUnderline, faStrikethrough, faQuoteRight, faCode, faLink, faImage, faTextHeight, faListOl, faListUl, faSubscript, faSuperscript, faOutdent, faIndent, faAlignRight, faHeading } from '@fortawesome/free-solid-svg-icons';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { jwtDecode } from "jwt-decode";
import ImageResize from 'quill-image-resize-vue';
import Tooltip from './component/tooltip';
import ImagePopup from './component/cradduleModal';
import axios from 'axios';
import API_BASE_WEB_URL from './config/apiConfigW';
import { useParams } from 'react-router-dom';

Quill.register("modules/imageResize", ImageResize);



function SectionIntroShare ({ htmlContent })  {
    
    const navigate = useNavigate()
    const { id,phase } = useParams();

     const onClickHandler = () => navigate(`/video`);
     const [images, setImages] = useState([]);
     const [types, setTypes] = useState([]);
  const [showImagePopup, setShowImagePopup] = useState(false);
     const [answers, setAnswers] = useState([]);
     const [answersV, setAnswersV] = useState([]);
     const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [combinedAnswer, setCombinedAnswer] = useState('');

  const access_token = localStorage.getItem('access_token');
    const decodedToken = jwtDecode(access_token);
    const userId = decodedToken.userId;

  const questionType ="BusinessCaseBuilder";
  const questionSubType ="Introduction";
  const token = localStorage.getItem('access_token');
  const [value, setValue] = useState('');
  const [formData, setFormData] = useState({
    summary: '',
    });
    
    useEffect(() => {
       
      fetchAnswerCut(); // Call the function to fetch the unanswered question
    }, [questionType, questionSubType, id]);
  

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const summaryResponse = await fetch(API_BASE_URL + `/api/summary/${id}/${questionType}/${questionSubType}`, {
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}` // Include the token in the request headers
            }
          });
        
      if(summaryResponse.ok) {
        // If summary exists, fetch the summary data
        const dataS = await summaryResponse.json();
        console.log(dataS);
        console.log(dataS.data.summary);
        setCombinedAnswer(dataS.data.summary);
     } else {
        const response = await fetch(API_BASE_URL + `/api/new/question/BusinessCaseBuilder/Introduction/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch answers');
        }
        const data = await response.json();
        console.log(data);
        setAnswers(data.data);
        setLoading(false);
    }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [questionType, questionSubType, id]);

  useEffect(() => {
    // Combine all answers into one string
    const combined = answers.map(answer => answer.answer).join('\n \n');
    setCombinedAnswer(combined);
  }, [answers]);

  // const handleEditorChange = () => {
  //   // Get the current content of the editor
  //   const content = editorRef.current.innerHTML;

  //   const event = { target: { id: 'editor', value: content } };
  // // Call the handleChange function with the content
  //   handleChange(event);
   
  // };


  const handleEditorChange = () => {
    // Get the current selection range
   
    const content = editorRef.current.innerHTML;
    const event = { target: { id: 'editor', value: content } };
  
    // Call the handleChange function to update the state with the new content
    handleChange(event);
  
   
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCombinedAnswer(value);
}






  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
  ['link', 'image'],
  [{size: []}],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']         
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
      // handlers: {
      //   'image': () => {
      //     setShowImagePopup(true);
      //   }
      // }
    },
    
    imageResize: {
      modules: ['Resize', 'DisplaySize', 'Toolbar'] // Configure the image resize module
    }
  };
  const module =  {
  
      toolbar: toolbarOptions
  };

  const reactQuillRef = React.useRef(null);
  const accessToolbar = () => {
    // Check if ref is initialized
    if (reactQuillRef.current) {
      // Get the Quill editor instance
      const quill = reactQuillRef.current.getEditor();
      
      // Access the toolbar
      const toolbar = quill.getModule('toolbar').handlers.image;
      toolbar.addHandler('image', console.log("image toolbar"));
      //console.log(toolbar.handlers.image);

    } else {
      console.error('ReactQuill ref is not initialized');
    }
  };

  const fetchAnswerCut = async () => {
        
    try {
      const response = await fetch(`${API_BASE_URL}/api/answer/${id}/${questionType}/${questionSubType}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}` // Include the token in the Authorization header
        }
      });
  
      if (response.status === 200) {
        const data = await response.json();
        console.log(data)
        setAnswersV(data.data); // Adjust based on your API response structure
       
      }else{
        const result = await response.json();
        console.error('Error:', result['error']);
      }
  
      
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

 
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const editorRef = useRef(null);

  const handleImageSelect = (imageUrl) => {
    const quill = reactQuillRef.current.getEditor();
    const range = quill.getSelection();
    quill.insertEmbed(range.index, 'image', imageUrl);
    setShowImagePopup(false);
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const createMarkup = (html) => {
    return { __html: html };
  };
  const insertLink = () => {
    const url = prompt('Enter the link URL:');
    if (url) {
      formatText('createLink', url);
    }
  };

  const insertImage = () => {
    const imageUrl = prompt('Enter the image URL:');
    if (imageUrl) {
      formatText('insertImage', imageUrl);
    }
  };
  const handleInput = () => {
    setCombinedAnswer(editorRef.current.innerHTML);
  };
  useEffect(() => {
    const editor = editorRef.current;
    if (editor && editor.innerHTML !== combinedAnswer) {
      editor.innerHTML = combinedAnswer;
    }
  }, [combinedAnswer]);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      // Move the cursor to the end of the content
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(editor);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, []);

  const handleHeadingChange = (event) => {
    const heading = event.target.value;
    if (heading) {
      formatText('formatBlock', heading);
    }
  };

  const handleImagePopup = () => {
    setShowImagePopup(!showImagePopup);
  };

  const [showHeadingDropdown, setShowHeadingDropdown] = useState(false);

  const toggleHeadingDropdown = () => setShowHeadingDropdown(!showHeadingDropdown);
//   createOrUpdateSummary();
  
const handleInsertFile = (file) => {
  const newFile = API_BASE_URL+'/images/'+file;
  console.log(newFile);
  setCombinedAnswer((prevContent) => `${prevContent}<div contenteditable="true" style="display:inline-block; width:30%;"><img src="${newFile}" style="width:100%;" /></div>`);
  // setCombinedAnswer((prevContent) => `${prevContent}<img src="${newFile}" alt="Inserted File" />`);

};

  useEffect(() => {
      const fetchSubtypeFiles = async () => {
          try {
              const response = await axios.get(`${API_BASE_URL}/api/hub/project/${id}`);
              setTypes(response.data.data);
              console.log(response.data);
             
          } catch (error) {
              console.error('Error fetching files:', error);
             
             
          }
      };
  
      fetchSubtypeFiles();
  }, []);


  const [resizingImage, setResizingImage] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const [initialX, setInitialX] = useState(null);
  const [initialY, setInitialY] = useState(null);

  function handleImageResizing(event) {
    if (event.type === 'mousemove' && !isResizing) {
      return; // Ignore mousemove event if not resizing
    }
  
    const imageElement = event.target;
    if (imageElement.nodeName !== 'IMG') {
      return; // Ignore if the target is not an image element
    }
  
    if (event.type === 'mousedown') {
      startImageResize(event);
    } else if (event.type === 'mousemove') {
      if (isResizing) {
        resizeImage(event, imageElement);
      }
    } else if (event.type === 'mouseup') {
      stopImageResize();
    }
  }

  function startImageResize(event) {
    setIsResizing(true);
    setInitialX(event.clientX);
    setInitialY(event.clientY);
  }

  function resizeImage(event, imageElement) {
    const newWidth = imageElement.offsetWidth + (event.clientX - initialX);
    const newHeight = imageElement.offsetHeight + (event.clientY - initialY);
    imageElement.style.width = `${newWidth}px`;
    imageElement.style.height = `${newHeight}px`;
  }

  function stopImageResize() {
    setIsResizing(false);
    setInitialX(null);
    setInitialY(null);
  }

  function handleMouseMove(event) {
    if (!resizingImage) return;
  
    const { element, initialX, initialY, initialWidth, initialHeight } = resizingImage;
    const deltaX = event.clientX - initialX;
    const deltaY = event.clientY - initialY;
  
    const newWidth = initialWidth + deltaX;
    const newHeight = initialHeight + deltaY;
  
    element.style.width = newWidth + 'px';
    element.style.height = newHeight + 'px';
  }
  function handleMouseUp() {
    if (!resizingImage) return;

    // Reset resizing state
    setResizingImage(null);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

    return (
        <>

<div className='container-fluid'>
   
    <div className='row'>

      <div className='col-md-2'>
      </div>
        
        <div className='col-md-9'>
            <img src={bci} className='bcA'></img>
        <div className='lenght'>
                    <div className='text-center'>
                <p className='centerH' onClick={accessToolbar}>Introduction</p>
                <p className='centerHp'>Make sure you answer all questions</p>
                </div>
                
            <a className="btn btn-primary buttonE"  href={`${API_BASE_WEB_URL}/sharefeedback/${id}/${phase}`} >
               
            Give Feedback
            </a>
            {/* <button className="btn btn-primary buttonS">Edit</button> */}
            {/*<p className= "buttonE">Save</p>
            <p className= "buttonS">Edit</p>*/}
            <div class = "break"></div>
            {answersV.map((answerV, index) => (
            <Link to={`/question/${answerV.questionId}`}>
                <div key={answerV._id} className="qul">
                <Tooltip content={answerV.answer}>
                
              
                    <p
                        className={`qulp ${hoveredIndex === index ? 'full' : ''}`}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {hoveredIndex === index ? answerV.question : answerV.question.slice(0, 10) + '...'}
                    </p>
                    </Tooltip>
                    
                </div>
                 </Link>
            ))}
           
            <div className='container-textBs'>

            {/* <ReactQuill ref={reactQuillRef} theme="snow" value={combinedAnswer} onChange={setCombinedAnswer} modules={modules} formats={formats}/> */}
            
                {/* <textarea className='textBs' value={combinedAnswer} onChange={handleChange} id="summary"></textarea> */}



  <div
      ref={editorRef}
      contentEditable={false}
      className="editor"
      onInput={handleInput}// Use onInput event instead of onChange for contenteditable elements
    //  onMouseDown={handleImageResizing}
    // onMouseMove={handleImageResizing}
    // onMouseUp={handleImageResizing}
    ></div>


                {showImagePopup && 
                  <ImagePopup 
                    
                    
                    onClose={() => setShowImagePopup(false)} 
                    types={types}
                    onInsertFile={handleInsertFile}
                  />
                }
            
            </div>

                
           
            
           
           
        </div> 

       
  </div>
  <div className='col-md-2'>
      </div>
  </div>
  <Toaster  position="top-right" />
  </div>
  </>
    );
}

export default SectionIntroShare
