import React from 'react';
import LoaderIcon from './LoaderIcon';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  colorClass: 'primary' | 'secondary' | 'danger';
  sizeClass: 'small' | 'medium' | 'large';
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const Button = ({
  type = 'button',
  colorClass,
  sizeClass,
  onClick,
  loading,
  children,
  disabled,
  ...rest
}: ButtonProps) => {
  const colorClasses = () => {
    switch (colorClass) {
      case 'primary':
        return { classNames: 'bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-200' };
      case 'secondary':
        return { classNames: 'bg-gray-500 text-white hover:bg-gray-600 transition-colors duration-200' };
      case 'danger':
        return { classNames: 'bg-red-500 text-white hover:bg-red-600 transition-colors duration-200' };
      default:
        return { classNames: '' };
    }
  };
  const sizeClasses = () => {
    switch (sizeClass) {
      case 'small':
        return { classNames: 'px-2 py-1 text-sm' };
      case 'medium':
        return { classNames: 'px-4 py-2 text-base' };
      case 'large':
        return { classNames: 'px-6 py-3 text-lg' };
      default:
        return { classNames: '' };
    }
  };

  return (
    <button
      {...rest}
      type={type}
      className={`cursor-pointer rounded-lg ${
        disabled ? 'opacity-50 cursor-not-allowed transition duration-75 ease-in' : ''
      } ${colorClasses().classNames} ${sizeClasses().classNames}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center">
        {loading && <LoaderIcon />}
        {children}
      </div>
    </button>
  );
};

export default Button;
