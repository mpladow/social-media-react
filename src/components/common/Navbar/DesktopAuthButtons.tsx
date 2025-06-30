import React from 'react';
import Button from '../Button';

type DesktopAuthButtonsProps = {
  isSignedIn?: boolean;
  avatar_url?: string;
  onSignoutPress: () => void;
  displayName: string;
  onSignInPress: () => void;
  onCreateAccountPress: () => void;
};
const DesktopAuthButtons = ({
  isSignedIn,
  avatar_url,
  onSignoutPress,
  displayName,
  onSignInPress,
  onCreateAccountPress,
}: DesktopAuthButtonsProps) => {
  return (
    <div className="hidden lg:flex items-center min-w-[400px] max-w-[500px] justify-end">
      {isSignedIn ? (
        <div className="flex items-center justify-end space-x-4">
          {avatar_url && <img className="rounded-full h-8 w-8" src={avatar_url} alt="User Avatar" />}
          <span className="text-gray-100 mr-4">Welcome, {displayName}</span>
          <button
            onClick={onSignoutPress}
            className="bg-amber-700 px-3 py-1 rounded text-gray-200 hover:text-white transition-colors cursor-pointer"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-end space-x-4">
          <Button
            onClick={onSignInPress}
            className="bg-purple-400 px-3 py-1 rounded text-gray-200 hover:text-white cursor-pointer"
            type={'button'}
            variant="text"
            colorClass={'primary'}
            sizeClass={'small'}
          >
            Sign in
          </Button>
          <Button
            onClick={onCreateAccountPress}
            className="bg-purple-400 px-3 py-1 rounded text-gray-200 hover:text-white cursor-pointer"
            type={'button'}
            colorClass={'primary'}
            sizeClass={'small'}
          >
            Create Account
          </Button>
        </div>
      )}
    </div>
  );
};

export default DesktopAuthButtons;
