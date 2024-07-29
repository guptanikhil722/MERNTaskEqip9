import React from 'react';
import '../styles/Button.css'; // For custom button styles

const Button = ({ onClick, children, type = "button", disabled=false }) => {
  return (
    <button type={type} className="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;