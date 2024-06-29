import React, { useState, useEffect } from 'react';
import Header from './component/header';
import Menu from './component/menu';
import ShareModal from './component/shareModal';
import { useNavigate } from 'react-router-dom';

const phaseNames = [
  'Ideation',
  'Product Definition',
  'Prototyping',
  'Initial Design',
  'Validating and Testing',
  'Commercialization'
];

function PageShare() {
  const [isOpen, setIsOpen] = useState(false);
  const [circles, setCircles] = useState(new Array(6).fill(false));

  // Clear localStorage on initial load
  useEffect(() => {
    localStorage.removeItem('filledCircles');
  }, []);

  useEffect(() => {
    const filledCircles = circles
      .map((isFilled, index) => (isFilled ? phaseNames[index] : null))
      .filter(phase => phase !== null);
    localStorage.setItem('filledCircles', JSON.stringify(filledCircles));
    console.log('Filled circles:', filledCircles); // Log the filled circles
  }, [circles]);

  const toggleStyle = (index) => {
    setCircles(prevCircles => {
      const newCircles = [...prevCircles];
      newCircles[index] = !newCircles[index];
      return newCircles;
    });
  };

  const navigate = useNavigate()

  const onClickHandler21 = () => navigate(`/feedback`);

  return (
    <>
      <div className='container-fluid'>
        <Header />
        <div className='row'>
          <Menu />

          <div className='col-md-9'>
            <div className='centerC'>
              <div className='text-center'>
                <p className='centerH'>Share</p>
                <p className='centerHp'>Here you can share your work</p>
              </div>
              <div className='BoxPhase1'>
              <button className="btn btn-primary curveP" onClick={onClickHandler21}>Feedback</button>
                <p className='centerH1v'>Phase</p>
               
                {phaseNames.map((phase, index) => (
                  <div className='BoxPhase' key={index}>
                    <div className='boxView'><p className='heading'>{phase}</p></div>
                    <div className='boxView'>
                      <div 
                        className={`circle ${circles[index] ? 'filled' : 'borderC'}`} 
                        onClick={() => toggleStyle(index)}
                      ></div>
                    </div>
                  </div>
                ))}
                <div className='boxView'>
                  <button className="btn btn-primary curveP" onClick={() => setIsOpen(true)}>Share</button>
                </div>
                <ShareModal 
                    open={isOpen} 
                    onClose={() => setIsOpen(false)} 
                    circles={circles}
                    phaseNames={phaseNames}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageShare;
