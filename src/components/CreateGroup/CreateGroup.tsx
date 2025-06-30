import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../supabase-client';
import Label from '../common/Label';
import { useNavigate } from 'react-router';
import type { ChangeEvent } from 'react';
import type { GroupSchema } from '../../models/schema/Group';
import { useAuth } from '../../context/AuthContext';

interface CreateGroupForm {
  name: string;
  description: string;
  image?: File; // Optional field for image URL
}
const createGroup = async (formData: CreateGroupForm) => {
  // upload image
  let imageUrl: string = '';
  if (formData.image) {
    const filePath = `${formData.name}-${Date.now()}-${formData.image?.name}`;
    const { error: uploadError } = await supabase.storage.from('post-images').upload(filePath, formData.image);
    if (uploadError) {
      throw new Error(uploadError.message);
    }
    const { data: publicUrl } = await supabase.storage.from('post-images').getPublicUrl(filePath);
    imageUrl = publicUrl.publicUrl;
  }
  const newGroup: GroupSchema = {
    name: formData.name,
    description: formData.description,
    image_url: imageUrl || undefined,
  };
  const { error, data } = await supabase.from('groups').insert(newGroup);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
const CreateGroup = () => {
  const { register, handleSubmit, setValue, watch } = useForm<CreateGroupForm>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      // navigate to new group?
      navigate('/groups');
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file);
    } else {
      setValue('image', undefined);
    }
  };
  const handleRemoveFileClick = () => {
    setValue('image', undefined);
  };

  const onSubmit = (data: CreateGroupForm) => {
    mutate(data);
  };
  const onError = (error: any) => {
    console.log('🚀 ~ CreateGroup ~ error:', error);
  };
  if (!user) {
    return <div className="text-red-500">You must be logged in to create a group.</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="gap-4 space-y-4">
      <div className={'flex flex-col'}>
        <Label>Group Name</Label>
        <input
          className=" w-full border border-gray-300 p-2 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
          id="groupName"
          {...register('name', { required: true })}
        />
      </div>
      <div className={'flex flex-col'}>
        <Label>Group Description</Label>
        <textarea
          className="w-full border border-gray-300 p-2 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
          id="groupDescription"
          {...register('description', { required: true })}
          rows={3}
        />
      </div>
      <div className={'flex flex-col'}>
        <label className="text-lg font-semibold mb-2">Preview Image</label>
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
      {isError && <div className="text-red-500">An error has occurred.</div>}
      <div>
        <Button type={'submit'} colorClass={'primary'} sizeClass={'medium'} loading={isPending} disabled={isPending}>
          {isPending ? 'Creating Group...' : 'Create Group'}
        </Button>
      </div>
    </form>
  );
};

export default CreateGroup;
