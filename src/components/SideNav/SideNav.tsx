import GroupListMin from '../Groups/GroupListMin';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { FaHome, FaUsers, FaInfoCircle } from 'react-icons/fa';
import NavbarButton from '../common/NavbarButton';

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div
      className={`relative md:flex origin-left transition-[width] duration-300 ${
        collapsed ? 'md:w-12 md:ml-4' : 'md:w-xs'
      }`}
    >
      <div className="absolute top-8 right-0 z-5 w-[32px]">
        <button
          className="cursor-pointer transition duration-100 bg-gradient-to-bl from-purple-900 to-black hover:bg-purple-600/50 rounded-full h-8 w-8 border border-gray-300/50 text-gray-100 hover:border-gray-100/80 hover:text-gray-50 p-2 flex items-center justify-center"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <FaArrowLeft className="transition duration-100 rotate-180" />
          ) : (
            <FaArrowLeft className="transition duration-100" />
          )}
        </button>
      </div>
      <div className=" absolute top-0 right-4 h-full border-r border-gray-300/50"></div>
      <div
        className={`pt-8 hidden origin-left md:scale-100 md:flex md:flex-1 md:w-full justify-start align-start transition duration-300 ${
          collapsed ? 'md:scale-x-0' : 'md:scale-x-100'
        }`}
      >
        <div
          className={`flex flex-col w-md space-y-2 p-4 pt-0 transition-opacity ${
            collapsed ? 'md:opacity-0' : 'md:opacity-100'
          }`}
        >
          <div className={`pb-4 flex flex-col gap-2 pr-6`}>
            <NavbarButton to={'/'}>
              <FaHome size={24} />
              Home
            </NavbarButton>
            <NavbarButton to={'/groups'}>
              <FaUsers size={24} />
              Groups
            </NavbarButton>
            <NavbarButton to={'/about'}>
              <FaInfoCircle size={24} />
              About
            </NavbarButton>
          </div>
          <div className="h-[0.5px] bg-gray-400 mr-6"></div>
          <div className="py-4 gap-4 flex flex-col pr-6">
            <div>
              <span className="font-semibold text-gray-400">Groups</span>
            </div>
            <GroupListMin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
