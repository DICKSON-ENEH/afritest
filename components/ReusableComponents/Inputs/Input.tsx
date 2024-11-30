import React, { useState } from 'react';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

interface InputProps {
  type?: string;
  label?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  className?: string;
  max?: any;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  max,
  label,
  placeholder = '',
  name = '',
  className = '',
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const renderedValue = type === 'password' && !showPassword ? '' : value;

  return (
    <div className="flex flex-col mb-4">
      <div className="relative">
        {type === 'password' ? (
          <>
            <input
              type={showPassword ? 'text' : 'password'}
              value={value}
              placeholder={placeholder}
              max={max}
              onChange={onChange}
              name={name}
              className={`border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-green-300 w-full ${className}`}
            />
            <button
              type="button"
              className="absolute top-1/2 right-2 transform-translate-y-1/2 text-gray-500 focus:outline-none"
              onClick={toggleShowPassword}
            >
              {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </button>
          </>
        ) : (
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            max={max}
            onChange={onChange}
            name={name}
            className={`border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-green-300 w-full ${className}`}
          />
        )}
      </div>
    </div>
  );
};

export default Input;