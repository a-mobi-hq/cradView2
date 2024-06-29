import React from 'react';

// Custom Checkbox Component
const OrangeCheckbox = ({ label, name, checked, onChange }) => {
  return (
    <label style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="checkbox"
        name={name}
        checked={checked} // Bind checked attribute to state
        onChange={onChange}
        style={{
          appearance: 'none',
          width: '20px',
          height: '20px',
          borderRadius: '4px',
          border: '2px solid #ffa500', // Orange border
          backgroundColor: 'transparent',
          cursor: 'pointer',
          position: 'relative',
        }}
      />
      <span style={{ marginLeft: '8px' }}>{label}</span>
      <style>
        {`
          input[type="checkbox"]:checked {
            background-color: #ffa500; /* Orange background when checked */
            border: none;
          }
          input[type="checkbox"]:checked::after {
            content: '\\2713'; /* Checkmark character */
            position: absolute;
            left: 4px;
            top: 0;
            color: white;
          }
        `}
      </style>
    </label>
  );
};

export default OrangeCheckbox;
