import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../../context/AuthContext';

import DialogAuthentication from '../../AuthenticationDialog/DialogAuthentication';
import DesktopAuthButtons from './DesktopAuthButtons';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const [openAuthenticationDialog, setOpenAuthenticationDialog] = useState(false);
  const [signUpClicked, setSignUpClicked] = useState(false);
  const displayName = user?.user_metadata.user_name || user?.email || 'Guest';

  const handleSignInPress = () => {
    setSignUpClicked(false);
    setOpenAuthenticationDialog(true);
    //  if (!dialogRef.current) {
    //    return;
    //  }
    //  dialogRef.current.hasAttribute('open') ? dialogRef.current.close() : dialogRef.current.showModal();
  };
  const handleCreateAccountPress = () => {
    setSignUpClicked(true);
    setOpenAuthenticationDialog(true);
  };
  const handleSignOutPress = () => {
    signOut();
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] background-blur-lg border-b border-gray-50 shadow-lg">
        {/* <div className="max-w-5xl mx-auto px-4 "> */}
        <div className="w-screen mx-auto px-4 ">
          <div className="flex justify-between items-center h-16">
            <Link to={'/'} className="font-mono text-xl items-center text-white min-w-[400px] max-w-[500px]">
              ML<span className="text-purple-700">.development</span>
            </Link>
            {/* for desktop} */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to={'/'} className="text-gray-200 hover:text-white transition-colors">
                Home
              </Link>
              <Link to={'/create'} className="text-gray-200 hover:text-white transition-colors">
                Create Post
              </Link>
              <Link to={'/groups'} className="text-gray-200 hover:text-white transition-colors">
                Groups
              </Link>
              <Link to={'/groups/create'} className="text-gray-200 hover:text-white transition-colors">
                Create Group
              </Link>
              <Link to={'/about'} className="text-gray-200 hover:text-white transition-colors">
                About
              </Link>
            </div>
            {/*Desktop Authentication Buttons*/}
            <DesktopAuthButtons
              isSignedIn={user !== null}
              avatar_url={user?.user_metadata?.avatar_url}
              onSignoutPress={handleSignOutPress}
              displayName={displayName}
              onSignInPress={handleSignInPress}
              onCreateAccountPress={handleCreateAccountPress}
            />

            {/* Mobile Menu Button */}
            <div className="lg:hidden duration-300 ease-in-out">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-300 focus:outline-none cursor-pointer"
              >
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
        <div
          className={`lg:hidden ${
            menuOpen
              ? 'h-auto opacity-100 transition duration-300 ease-in-out '
              : ' overflow-hidden h-0  opacity-0 transition duration-300 ease-in-out '
          } bg-[rgba(10,10,10,0.8)]`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to={'/'} className="block text-gray-200 hover:text-white transition-colors">
              Home
            </Link>
            <Link to={'/create'} className="block text-gray-200 hover:text-white transition-colors">
              Create Post
            </Link>
            <Link to={'/groups'} className="block text-gray-200 hover:text-white transition-colors">
              Groups
            </Link>
            <Link to={'/groups/create'} className="block text-gray-200 hover:text-white transition-colors">
              Create Group
            </Link>
            <Link to={'/about'} className="block text-gray-200 hover:text-white transition-colors">
              About
            </Link>
          </div>
        </div>
      </nav>
      {openAuthenticationDialog && (
        <DialogAuthentication
          onClose={() => setOpenAuthenticationDialog(false)}
          displaySignInContent={!signUpClicked}
        />
      )}
    </>
  );
};
