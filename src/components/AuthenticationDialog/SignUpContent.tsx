import React from 'react';
import DialogContent from './DialogContent';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

type SignUpContentProps = {
  onClose?: () => void;
};
const SignUpContent = ({ onClose }: SignUpContentProps) => {
  const { user, signInWithGithub, signInWithEmail } = useAuth();
  const navigate = useNavigate();
  const handleOnSignUpWithGithubPress = () => {
    onClose?.();
    signInWithGithub();
  };
  const handleOnSignUpWithEmailPress = () => {
    onClose?.();
    navigate('/email-signup');
  };
  const handleClose = () => {
    onClose?.();
  };
  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      <h2 className="text-lg font-semibold">Sign Up</h2>
      <div className="w-full flex flex-col space-y-4">
        <Button onClick={handleOnSignUpWithGithubPress} type={'button'} colorClass={'cancel'} sizeClass={'medium'}>
          Continue with Github
        </Button>
        <Button onClick={handleOnSignUpWithEmailPress} type={'button'} colorClass={'cancel'} sizeClass={'medium'}>
          Sign Up with Email
        </Button>
        {/* <div className=" flex-row flex items-center justify-center space-x-2">
            <div className="h-[1px] w-full bg-slate-600/50"></div>
            <span className="text-gray-500">OR</span>

            <div className="h-[1px] w-full bg-slate-600/50"></div>
          </div> */}
        <div className="flex flex-row space-between justify-between items-center">
          <Button variant="text" type={'button'} colorClass={'cancel'} sizeClass={'medium'} onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpContent;
