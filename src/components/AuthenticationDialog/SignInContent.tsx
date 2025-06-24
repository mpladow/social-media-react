import React, { useState } from 'react';
import DialogContent from './DialogContent';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import Label from '../common/Label';

type SignInContentProps = {
  onClose?: () => void;
};
const SignInContent = ({ onClose }: SignInContentProps) => {
  const { user, signInWithGithub, signInWithEmail } = useAuth();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleOnSignInWithGithubPress = () => {
    signInWithGithub();
  };

  const handleSignInWithEmailPress = () => {
    setShowLoginForm(true);
  };
  const handleClose = () => {
    console.log('🚀 ~ handleClose ~ onClose:', onClose);
    onClose && onClose();
  };

  const onSubmit = (data: any) => {
    signInWithEmail(data.email, data.password);
  };
  const onError = (error: any) => {
    console.error('Error signing in:', error);
  };
  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      <h2 className="text-lg font-semibold">Sign In</h2>
      <div className="w-full flex flex-col space-y-4">
        <Button onClick={handleOnSignInWithGithubPress} type={'button'} colorClass={'cancel'} sizeClass={'medium'}>
          Continue with Github
        </Button>

        <div className=" flex-row flex items-center justify-center space-x-2">
          <div className="h-[1px] w-full bg-slate-600/50"></div>
          <span className="text-gray-500">OR</span>

          <div className="h-[1px] w-full bg-slate-600/50"></div>
        </div>
        <form className="gap-4 space-y-4" onSubmit={handleSubmit(onSubmit, onError)}>
          <Label>Email</Label>
          <input
            {...register('email')}
            className="w-full border border-gray-300 p-2 rounded bg-transparent focus:outline"
          />
          <Label>Password</Label>
          <input
            {...register('password')}
            className="w-full border border-gray-300 p-2 rounded bg-transparent focus:outline"
            type="password"
          />
          <div className="flex flex-row space-between justify-between items-center">
            <Button variant="text" type={'button'} colorClass={'cancel'} sizeClass={'medium'} onClick={handleClose}>
              Cancel
            </Button>
            <Button type={'submit'} colorClass={'primary'} sizeClass={'medium'}>
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInContent;
