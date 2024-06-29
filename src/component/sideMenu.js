import React, { useState } from 'react';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`side-menu ${isOpen ? 'open' : ''}`}>
      <div className="sicon" onClick={toggleMenu}>
        {isOpen ? <button>&times;</button> : <button>Open</button>}
      </div>
      <ul className='sul'>
        <li className='sli'>Menu Item 1</li>
        <li className='sli'>Menu Item 2</li>
        <li className='sli'>Menu Item 3</li>
      </ul>
    </div>
  );
};

export default SideMenu;
