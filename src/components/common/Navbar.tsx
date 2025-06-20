import { useState } from 'react';
import { Link } from 'react-router';
import Menu from '../Icons/Menu';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, authMessage, signInWithGithub, signOut } = useAuth();

  const displayName = user?.user_metadata.user_name || user?.email || 'Guest';

  const handleSignInPress = () => {
    signInWithGithub();
  };
  const handleSignOutPress = () => {
    signOut();
  };
  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] background-blur-lg border-b border-gray-50 shadow-lg">
      {/* <div className="max-w-5xl mx-auto px-4 "> */}
      <div className="w-screen mx-auto px-4 ">
        <div className="flex justify-between items-center h-16">
          <Link to={'/'} className="font-mono text-xl items-center text-white">
            ML<span className="text-purple-700">.development</span>
          </Link>
          {/* for desktop} */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to={'/'} className="text-gray-200 hover:text-white transition-colors">
              Home
            </Link>
            <Link to={'/create'} className="text-gray-200 hover:text-white transition-colors">
              Create Post
            </Link>
            <Link to={'/communities'} className="text-gray-200 hover:text-white transition-colors">
              Communities
            </Link>
            <Link to={'/community/create'} className="text-gray-200 hover:text-white transition-colors">
              Create Community
            </Link>
            <Link to={'/about'} className="text-gray-200 hover:text-white transition-colors">
              About
            </Link>
          </div>
          {/*Desktop Authentication Buttons*/}
          <div className="hidden md:flex items-center">
            {user !== null ? (
              <div className="flex items-center space-x-4">
                {user.user_metadata?.avatar_url && (
                  <img className="rounded-full h-8 w-8" src={user.user_metadata?.avatar_url} alt="User Avatar" />
                )}
                <span className="text-gray-100 mr-4">Welcome, {displayName}</span>
                <button
                  onClick={handleSignOutPress}
                  className="bg-amber-700 px-3 py-1 rounded text-gray-200 hover:text-white transition-colors cursor-pointer"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={handleSignInPress}
                  className="bg-purple-400 px-3 py-1 rounded text-gray-200 hover:text-white cursor-pointer"
                >
                  Sign in with Github
                </button>
              </div>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-300 focus:outline-none cursor-pointer">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* For Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[rgba(10,10,10,0.8)]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to={'/'} className="block text-gray-200 hover:text-white transition-colors">
              Home
            </Link>
            <Link to={'/create'} className="block text-gray-200 hover:text-white transition-colors">
              Create Post
            </Link>
            <Link to={'/communities'} className="block text-gray-200 hover:text-white transition-colors">
              Communities
            </Link>
            <Link to={'/community/create'} className="block text-gray-200 hover:text-white transition-colors">
              Create Community
            </Link>
            <Link to={'/about'} className="block text-gray-200 hover:text-white transition-colors">
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
