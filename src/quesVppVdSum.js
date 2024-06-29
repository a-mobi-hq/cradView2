import React, { useState,useEffect,useRef } from 'react';
import bci from './images/bc.png';
import Header from './component/header';
import SideMenu2 from './component/sideMenu2';
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
import nspell from 'nspell';
import API_BASE_WEB_URL from './config/apiConfigW';

function QuestionBusIntro() {

    const navigate = useNavigate()

    const onClickHandler = () => navigate(`/video`);
    const [images, setImages] = useState([]);
    const [types, setTypes] = useState([]);
 const [showImagePopup, setShowImagePopup] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [answersV, setAnswersV] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 const projectId = localStorage.getItem('nProject');
 const [combinedAnswer, setCombinedAnswer] = useState('');

 const access_token = localStorage.getItem('access_token');
   const decodedToken = jwtDecode(access_token);
   const userId = decodedToken.userId;

 const questionType ="ValuePropositionPack";
 const questionSubType ="Value Delivery Process";
 const token = localStorage.getItem('access_token');
 const [value, setValue] = useState('');
 const [misspelledWords, setMisspelledWords] = useState([]);
 const [suggestions, setSuggestions] = useState([]);
 const [suggestionBoxPosition, setSuggestionBoxPosition] = useState({ top: 0, left: 0 });
 const [selectedWord, setSelectedWord] = useState(null); 

 const [showScrollableDiv, setShowScrollableDiv] = useState(false);

    const handleToggle = () => {
      setShowScrollableDiv(!showScrollableDiv);
    };

    const onClickNext = () => navigate(`/questionVppPs`);

 const [formData, setFormData] = useState({
   summary: '',
   });
   
   useEffect(() => {
      
     fetchAnswerCut(); // Call the function to fetch the unanswered question
   }, [questionType, questionSubType, projectId]);
 
   useEffect(() => {
     const fetchTypes = async () => {
         try {
             const response = await axios.get(`${API_BASE_URL}/api/hub/types`);
             setImages(response.data);
             setLoading(false);
         } catch (error) {
             console.error('Error fetching types:', error);
             setError('Failed to fetch types');
             setLoading(false);
         }
     };

     fetchTypes();
 }, []);

 useEffect(() => {
   const fetchAnswers = async () => {
     try {
       const summaryResponse = await fetch(API_BASE_URL + `/api/summary/${projectId}/${questionType}/${questionSubType}`, {
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
       const response = await fetch(API_BASE_URL + `/api/new/question/ValuePropositionPack/Value Delivery Process/${projectId}`);
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
 }, [questionType, questionSubType, projectId]);

 useEffect(() => {
   // Combine all answers into one string
   const combined = answers.map(answer => answer.answer).join('\n');
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
   // checkSpelling(event.target.innerText);
 
   // Call the handleChange function to update the state with the new content
  

   const newText = content || '';
   setCombinedAnswer(content);
   console.log(content);
   console.log("checking error");
   console.log(newText);
//    checkSpelling(newText);

   handleChange(event);
 
  
 };

 const handleChange = (e) => {
   const { id, value } = e.target;
   setCombinedAnswer(value);
}
 const handleSubmit = (e) => {
   e.preventDefault();
   createOrUpdateSummary();
   
 };




 const createOrUpdateSummary = async (data) => {
   try {
       setLoading(true);
       console.log(combinedAnswer);
       const summary = combinedAnswer;
     const response = await fetch(API_BASE_URL +'/api/summary', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}` 
       },
       body: JSON.stringify({ projectId, questionType, questionSubType, summary,userId }),
     });
 
     if (!response.ok) {
       setLoading(false);
       toast.error("can't save");
       ///throw new Error('Failed to create or update summary');
     }

     const data = await response.json();
     setLoading(false);
     toast.success("Saved");
     console.log(data.message); // Log success message
 
    
   } catch (error) {
     console.error('Error creating or updating summary:', error.message);
     // Handle error
   }
 };
 



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
     const response = await fetch(`${API_BASE_URL}/api/answer/${projectId}/${questionType}/${questionSubType}`, {
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

 const loadDictionary = async () => {
   const affResponse = await fetch('/dictionaries/en.aff');
   const aff = await affResponse.text();
 
   const dicResponse = await fetch('/dictionaries/en.dic');
   const dic = await dicResponse.text();
   console.log(dic);
   return nspell({ aff, dic });
 };


 const escapeRegExp = (string) => {
   return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
 };
 
 

 const highlightMisspelledWords = () => {
   //if (!editorRef.current) return;


   const selection = window.getSelection();
   const range = selection.getRangeAt(0);
   const startContainer = range.startContainer;
   const startOffset = range.startOffset;
 
   const startMarker = document.createElement("span");
   startMarker.id = "start-marker";
   range.insertNode(startMarker);
   
   console.log(misspelledWords);
   if (misspelledWords.length === 0) {
     console.log("no words")
     //editorRef.current.innerHTML = combinedAnswer;
     return;
   }
 
   let innerHTML = combinedAnswer;
   const words = innerHTML.split(/(\s+)/); // Split by spaces, keeping the spaces in the array
 
   //const words = innerHTML.split(/(\b|\s+)/);
   const tempContainer = document.createElement('div');
   tempContainer.innerHTML = combinedAnswer;
   const textNodes = getTextNodes(tempContainer);
 
 textNodes.forEach(node => {
   let nodeText = node.nodeValue;
   misspelledWords.forEach(word => {
     const escapedWord = escapeRegExp(word);
     const regex = new RegExp(`\\b${escapedWord}\\b`, 'g');
     nodeText = nodeText.replace(regex, `<span style="background-color: darkblue; color: white;">${word}</span>`);
   });
   const newNode = document.createElement('span');
   newNode.innerHTML = nodeText;
   node.replaceWith(...newNode.childNodes);
 });


 
 console.log(tempContainer.innerHTML);
 editorRef.current.innerHTML = tempContainer.innerHTML;
 restoreCursorPosition();

   // Highlight misspelled words
   // for (let i = 0; i < words.length; i++) {
   //   const word = words[i];
   //   if (misspelledWords.includes(word.trim())) {
   //     words[i] = `<span style="background-color: darkblue; color: white;">${word}</span>`;
   //   }
   // }

   // console.log(words);
   // setCombinedAnswer(words);
   //editorRef.current.innerHTML = words.join('');
 };

 const getTextNodes = (node) => {
   let textNodes = [];
   if (node.nodeType === Node.TEXT_NODE) {
     textNodes.push(node);
   } else {
     for (let child of node.childNodes) {
       textNodes = textNodes.concat(getTextNodes(child));
     }
   }
   return textNodes;
 };

 const restoreCursorPosition = () => {
   const startMarker = document.getElementById("start-marker");
   if (!startMarker) return;
 
   const range = document.createRange();
   const selection = window.getSelection();
 
   range.setStartBefore(startMarker);
   range.collapse(true);
   selection.removeAllRanges();
   selection.addRange(range);
 
   // Clean up marker
   startMarker.parentNode.removeChild(startMarker);
 };
 const checkSpelling = async (text) => {
   if (!text) return;
   console.log("now checking");
   const spell = await loadDictionary();
   const words = text.split(/\s+/);
   const misspelled = words.filter(word => !spell.correct(word));
   console.log(misspelled);
   setMisspelledWords(misspelled);
   console.log("what was passed");
   console.log(misspelledWords);
   highlightMisspelledWords();
   
 };

 const showSuggestions = async (word, rect) => {
   const spell = await loadDictionary();
   const suggestions = spell.suggest(word);
   console.log(word);
   console.log(spell);
   console.log(suggestions);
   setSuggestions(suggestions);
   setSuggestionBoxPosition({ top: rect.bottom, left: rect.left });
 };

 const handleWordClick = (word, rect) => {
   console.log("here sugg");
   console.log(word);
   setSelectedWord(word);
   showSuggestions(word, rect);
 };

 const applySuggestion = (suggestion) => {
   // const editor = editorRef.current;
   // const html = editor.innerHTML;
   // const newHtml = html.replace(new RegExp(`\\b${misspelledWords[0]}\\b`, 'g'), suggestion);
   // editor.innerHTML = newHtml;
   // setCombinedAnswer(newHtml);
   // setSuggestions([]);

   if (!selectedWord) return; // Check if a word is selected

   const editor = editorRef.current;
   const html = editor.innerHTML;

   // Create a regex to match only the selected word
   const escapedWord = selectedWord.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
   const newHtml = html.replace(new RegExp(`\\b${escapedWord}\\b`, 'g'), suggestion);

   editor.innerHTML = newHtml;
   setCombinedAnswer(newHtml);
   checkSpelling(newHtml);
   setSelectedWord(null); // Reset selected word
   
 };

 const handleSuggestionClick = (suggestion) => {
   if (!selectedWord) return; // Check if a word is selected

   const editor = editorRef.current;
   const html = editor.innerHTML;

   // Create a regex to match only the selected word
   const escapedWord = selectedWord.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
   const newHtml = html.replace(new RegExp(`\\b${escapedWord}\\b`, 'g'), suggestion);

   editor.innerHTML = newHtml;
   setCombinedAnswer(newHtml);
   checkSpelling(newHtml);
   setSelectedWord(null); // Reset selected word
 };

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
             const response = await axios.get(`${API_BASE_URL}/api/hub/project/${projectId}`);
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







 const handleMouseDown = (event) => {
   if (event.target.tagName === 'IMG') {
     setResizingImage(event.target);
     setInitialX(event.clientX);
     setInitialY(event.clientY);
     setIsResizing(true);
   }
 };

 const handleMouseMove = (event) => {
   if (isResizing && resizingImage) {
     const deltaX = event.clientX - initialX;
     const deltaY = event.clientY - initialY;
     const newWidth = resizingImage.clientWidth + deltaX;
     const newHeight = resizingImage.clientHeight + deltaY;
     resizingImage.style.width = `${newWidth}px`;
     resizingImage.style.height = `${newHeight}px`;
     setInitialX(event.clientX);
     setInitialY(event.clientY);
   }
 };

 const handleMouseUp = () => {
   if (isResizing) {
     setIsResizing(false);
     setResizingImage(null);
   }
 };
 
      return (

       
       
      

    <div className='container2'>
         <SideMenu2 />    
         <div className="main-content">
        
         <Header />
         <div className={`main-content2 ${showScrollableDiv ? 'shrink' : ''}`}>

         <div className='text-center'>
                    <p className='textHp'>Value Delivery Process</p>
                    <p className='textH'>Make sure you answer all questions</p>
                </div>
            
            <div className=''>
                <p className='prq' onClick={handleToggle}>Previous Questions</p>
            </div>
            
            <div className='quiInt'>

            
            <form onSubmit={handleSubmit}>    
            <button className="btn btn-primary buttonE" type='submit'>
                { loading && <FontAwesomeIcon icon={faCircleNotch} className='fa-spin'/>}
                { !loading && <span>Save</span>}
            </button>
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


  <div class="toolbar">
  <button onClick={() => formatText('bold')} type='button'>
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button onClick={() => formatText('italic')} type='button'>
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button onClick={() => formatText('underline')} type='button'>
          <FontAwesomeIcon icon={faUnderline} />
        </button>
        <button onClick={() => formatText('strikeThrough')} type='button'>
          <FontAwesomeIcon icon={faStrikethrough} />
        </button>
        <button onClick={() => formatText('formatBlock', 'blockquote')} type='button'>
          <FontAwesomeIcon icon={faQuoteRight} />
        </button>
        <button onClick={() => formatText('formatBlock', 'pre')} type='button'>
          <FontAwesomeIcon icon={faCode} />
        </button>
        <button onClick={insertLink} type='button'>
          <FontAwesomeIcon icon={faLink} />
        </button>
        <button onClick={handleImagePopup} type='button'>
          <FontAwesomeIcon icon={faImage} />
        </button>
        <select onChange={(e) => formatText('fontSize', e.target.value)} className="headingDropdown" style={{marginRight: 10}}>
          <option value="">Font Size</option>
          {[...Array(23)].map((_, i) => (
            <option key={i} value={i + 2}>{i + 2}</option>
          ))}
        </select>
        <div className="dropdownM">
         
        
            <select onChange={handleHeadingChange} className="headingDropdown">
                <option value="">Heading</option>
                {[...Array(6)].map((_, i) => (
                  <option key={i} value={`h${i + 1}`}>H{i + 1}</option>
                ))}
          </select>
     
        </div>
        <button onClick={() => formatText('insertOrderedList')} type='button'>
          <FontAwesomeIcon icon={faListOl} />
        </button>
        <button onClick={() => formatText('insertUnorderedList')} type='button'>
          <FontAwesomeIcon icon={faListUl} />
        </button>
        <button onClick={() => formatText('subscript')} type='button'>
          <FontAwesomeIcon icon={faSubscript} />
        </button>
        <button onClick={() => formatText('superscript')} type='button'>
          <FontAwesomeIcon icon={faSuperscript} />
        </button>
        <button onClick={() => formatText('outdent')} type='button'>
          <FontAwesomeIcon icon={faOutdent} />
        </button>
        <button onClick={() => formatText('indent')} type='button'>
          <FontAwesomeIcon icon={faIndent} />
        </button>
        <button onClick={() => formatText('direction', 'rtl')} type='button'>
          <FontAwesomeIcon icon={faAlignRight} />
        </button>
      
  </div>
  <div
      ref={editorRef}
      contentEditable={true}
      className="editor"
      onInput={handleEditorChange}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                // onClick={(e) => {
                //   const selection = window.getSelection();
                //   if (!selection.rangeCount) return;

                //   const range = selection.getRangeAt(0);
                //     const word = range.startContainer.textContent.slice(range.startOffset, range.endOffset);
                //     console.log(word);
                //    if (misspelledWords.includes(word)) {
                //     const rect = e.target.getBoundingClientRect();
                //     handleWordClick(word, rect);
                //   }
                // }}
                // style={{ whiteSpace: "pre-wrap", minHeight: "200px", border: "1px solid #ccc", padding: "10px",marginTop: "0px" }}
              />
  




    {suggestions.length > 0 && (
              <div
                className="suggestion-box"
                style={{
                  position: 'absolute',
                  top: suggestionBoxPosition.top,
                  left: suggestionBoxPosition.left,
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  zIndex: 1000,
                }}
              >
               {suggestions.map((suggestion, index) => (
                    <div key={index} onClick={() => applySuggestion(suggestion)}>
                      {suggestion}
                    </div>
                  ))}
              </div>
            )}

                {showImagePopup && 
                  <ImagePopup 
                    
                    
                    onClose={() => setShowImagePopup(false)} 
                    types={types}
                    onInsertFile={handleInsertFile}
                  />
                }
            <button type="button" className='btn btn-primary curveNext' onClick={onClickNext} style={{marginTop:20}}> Next</button>
            </div>

                
            </form>
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
    <Toaster  position="top-right" />
</div> 

      );
    }




  export default QuestionBusIntro;
