
import React from 'react';

const Button = ({ onClick, children, id }) => {
  return (
    <button className="button" onClick={onClick} id={id}>
      {children}
    </button>
  );
};

export default Button;