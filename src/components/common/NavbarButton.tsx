import React, { type PropsWithChildren } from 'react';
import { Link } from 'react-router';

type NavbarButtonProps = {
  className?: string;
  to: string;
  // Additional props can be added as needed
} & React.HtmlHTMLAttributes<HTMLLinkElement> &
  PropsWithChildren;
const NavbarButton = ({ children, className, to }: NavbarButtonProps) => {
  return (
    <Link
      className={`flex items-center mr-4 h-full z-10 w-full blur-none py-2 px-2 rounded-2xl flex-colshadow-xl hover:shadow-indigo-950/50 cursor-pointer gap-2 transition duration-300 hover:bg-gradient-to-b from-violet-800/20 to-gray-800 ${className}`}
      to={to}
    >
      {children}
    </Link>
  );
};

export default NavbarButton;
