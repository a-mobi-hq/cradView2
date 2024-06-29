import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ScaleLoader from "react-spinners/ScaleLoader";
import { useNavigate } from 'react-router-dom';









function LoadingPage() {
const [loading, setLoading] = useState(false);
const navigate = useNavigate()
useEffect(() =>{
  setLoading(true)
  setTimeout(() =>{
    setLoading(false)
    navigate(`/home`)
  }, 8000)
})

  return (

<div className='loadP'>
  
  {loading ?(
   <div className='text-center'>
  <ScaleLoader
          color={'#facc04'}
          loading={loading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
    <p className='loadPt'>Setting up Your Craddule</p>
    </div> 
  ):(
    <div></div>
  )}
</div>
  );
}

export default LoadingPage;
