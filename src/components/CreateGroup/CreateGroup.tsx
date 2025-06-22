import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../supabase-client';
import Label from '../common/Label';
import { useNavigate } from 'react-router';

interface CreateGroupForm {
  name: string;
  description: string;
}
const createGroup = async (formData: CreateGroupForm) => {
  const { error, data } = await supabase.from('groups').insert(formData);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
const CreateGroup = () => {
  const { register, handleSubmit } = useForm<CreateGroupForm>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      // navigate to new group?
      navigate('/groups');
    },
  });

  const onSubmit = (data: CreateGroupForm) => {
    mutate(data);
  };
  const onError = (error: any) => {
    console.log('🚀 ~ CreateGroup ~ error:', error);
  };

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
