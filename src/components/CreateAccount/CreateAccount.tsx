import { type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import Label from '../common/Label';

export type CreateAccountForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  image?: File;
};
const CreateAccount = () => {
  const { register, handleSubmit, watch, setValue } = useForm<CreateAccountForm>();

  const { signUpWithEmail } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: CreateAccountForm) => {
    const result = await signUpWithEmail(data);
    console.log('🚀 ~ onSubmit ~ result:', result);
    if (result.error) {
      onError();
    } else {
      navigate('/');
    }
  };
  const onError = () => {
    console.error('Error creating account');
  };
  const handleRemoveFileClick = () => {
    setValue('image', undefined);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file);
    } else {
      setValue('image', undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4 flex flex-col gap-2">
      <Label>Username</Label>
      <input type="text" {...register('username')} className="border border-gray-300 p-2 rounded" />
      <Label>Email</Label>
      <input type="email" {...register('email')} className="border border-gray-300 p-2 rounded" />
      <Label>Password</Label>
      <input type="password" {...register('password')} className="border border-gray-300 p-2 rounded" />
      <Label>Confirm Password</Label>
      <input type="password" {...register('confirmPassword')} className="border border-gray-300 p-2 rounded" />
      <div className={'flex flex-col'}>
        <Label>Avatar URL (optional)</Label>
        {watch('image') && (
          <div className="w-auto self-start space-x-2 mb-2 relative">
            <div className="absolute top-2 right-0">
              <button
                type="button"
                onClick={handleRemoveFileClick}
                className="bg-red-500 w-6 h-6 rounded-full text-white flex items-center justify-center cursor-pointer"
              >
                X
              </button>
            </div>
            <img src={URL.createObjectURL(watch('image')!)} alt="Selected" className="h-32 w-32 object-contain" />
          </div>
        )}
        <input
          onChange={handleFileChange}
          type="file"
          className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500 ..."
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Create Account
      </button>
    </form>
  );
};

export default CreateAccount;
