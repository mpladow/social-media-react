import React from 'react';
import DialogContent from './DialogContent';
import SignInContent from './SignInContent';
import SignUpContent from './SignUpContent';

type DialogAuthenticationProps = {
  onClose: () => void;
  displaySignInContent?: boolean;
} & React.HTMLAttributes<HTMLDialogElement>;
const DialogAuthentication = ({ onClose, displaySignInContent }: DialogAuthenticationProps) => {
  //

  const handleClose = () => {
    onClose();
  };
  return (
    <div
      className="relative z-20 bg-gray-500/75 transition-opacity duration-300"
      aria-labelledby="dialog-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity duration-300" aria-hidden="true"></div>
      <div className="fixed inset-0 z-15 w-screen overflow-y-auto">
        <div
          id={'dialog-background'}
          // ref={dialogRef}
          className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <DialogContent>
            {displaySignInContent ? <SignInContent onClose={handleClose} /> : <SignUpContent onClose={handleClose} />}
          </DialogContent>
          {/* <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-lg max-w-4xl mx-auto my-auto">
			<button
			  className="absolute top-2 right-2 text-gray-400 hover:text-white"
			  onClick={() => dialogRef.current?.close()}
			>
			  &times;
			</button>
			<h2>Sign In</h2>
			<Button
			  onClick={handleOnSignInWithGithubPress}
			  type={'button'}
			  colorClass={'primary'}
			  sizeClass={'small'}
			>
			  Sign in with Github
			</Button>
		 </div> */}
        </div>
      </div>
      {/* <DialogSignIn onClose={() => setMenuOpen(false)} showDialog={openAuthenticationDialog} /> */}
    </div>
  );
};

export default DialogAuthentication;
