import React from 'react';
import '../styles/Form.css'; // For custom form styles

const Form = ({ onSubmit, children }) => {
  return (
    <form className="login-form" onSubmit={onSubmit}>
     {children}
    </form>
  );
};

export default Form;