
import React, { ReactNode, MouseEventHandler } from 'react';

interface ButtonProps {
 children: ReactNode;
 type?:any
 disabled?:boolean
 className?: string;
 onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ children, disabled, className, type, onClick }) => {
 return (
    <button
      className={`p2 rounded-md text-white  ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
 );
};

export default Button;
