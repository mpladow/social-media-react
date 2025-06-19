import { useForm, type SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '../../supabase-client';
import { useRef, type ChangeEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import type { Post } from '../../models/Post';
import { useNavigate } from 'react-router';

interface CreatePostSchema {
  title: string;
  content: string;
  image_url?: string; // Optional field for image URL
  avatar_url?: string;
  created_by: string;
}

interface CreatePostForm {
  title: string;
  content: string;
  image?: File; // Optional field for image URL
  avatar_url?: string;
  created_by: string;
}

const createPost = async (post: CreatePostForm) => {
  console.log('🚀 ~ createPost ~ post:', post);

  // from = the table you want to insert into
  // data = success
  // 1. INSERT IMAGE
  const filePath = `${post.title}-${Date.now()}-${post.image?.name}`;
  if (post.image) {
    const { error: uploadError } = await supabase.storage.from('post-images').upload(filePath, post.image as File);

    if (uploadError) {
      throw new Error(uploadError.message);
    }
  }

  // 2 CREATE POST DATA
  // get url
  const { data: postImageData } = await supabase.storage.from('post-images').getPublicUrl(filePath);
  const postData: CreatePostSchema = {
    title: post.title,
    content: post.content,
    image_url: postImageData.publicUrl ?? undefined,
    created_by: post.created_by,
    avatar_url: post.avatar_url ?? undefined, // Optional field for avatar URL
  };

  // 3. INSERT POST DATA
  const { data, error } = await supabase.from('posts').insert([postData]).select().single();

  if (error) {
    throw new Error(error.message);
  }
  return data as Post;
};

const CreatePost = () => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostForm>();
  const fileRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const navivate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      navivate(`/post/${data.id}`);
    },
  });

  const onSubmit: SubmitHandler<CreatePostForm> = (data: CreatePostForm) => {
    // add user created data
    data.created_by = user?.user_metadata.preferred_username || user?.user_metadata.email || 'Anonymous';
    data.avatar_url = user?.user_metadata.avatar_url || null;
    mutate(data);

    // Here you would typically send the form data to your backend or API
  };
  const onError = (error: any) => {
    console.error('Error creating post:', error);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file);
    } else {
      setValue('image', undefined);
    }
  };

  const handleFileInputButtonClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };
  const handleRemoveFileClick = () => {
    setValue('image', undefined);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
      <div className={'flex flex-col'}>
        <label className="text-lg font-semibold mb-2">Title</label>
        <input
          className=" w-full border border-gray-300 p-2 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
          defaultValue={'New Post'}
          {...register('title')}
          type="text"
          id="title"
          required
        />
      </div>
      <div className={'flex flex-col'}>
        <label className="text-lg font-semibold mb-2">Content</label>
        <textarea
          className="w-full border border-gray-300 p-2 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
          {...register('content', { required: true })}
          id="content"
          rows={5}
        />
        {errors.content && <span className="text-red-500">Content is required</span>}
      </div>
      <div className={'flex flex-col'}>
        <label className="text-lg font-semibold mb-2">Upload Image</label>
        <div className={'flex flex-col border border-gray-300 p-2 rounded'}>
          {watch('image') == null ? (
            <div className="flex flex-col items-center justify-centerspace-y-2">
              <button
                className="bg-blue-500 text-white p-2 rounded cursor-pointer"
                type="button"
                onClick={handleFileInputButtonClick}
              >
                Select file
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-baseline space-x-2">
              <img src={URL.createObjectURL(watch('image'))} alt="Selected" className="h-32 w-32 object-contain" />
              <span className="py-3">{watch('image')?.name}</span>
              <div className="flex space-x-2 align-middle justify-center">
                <button
                  className="bg-blue-500 text-white p-2 rounded cursor-pointer"
                  type="button"
                  onClick={handleFileInputButtonClick}
                >
                  Change file
                </button>
                <button
                  className="bg-amber-600 text-white p-2 rounded cursor-pointer"
                  type="button"
                  onClick={handleRemoveFileClick}
                >
                  Remove File
                </button>
              </div>
            </div>
          )}
          {/* <input
            type="file"
            className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500 ..."
          /> */}
          <input ref={fileRef} onChange={handleFileChange} type="file" accept="image/*" className="hidden" />
        </div>
        {errors.image && <span className="text-red-500">Content is required</span>}
      </div>
      {error && <p className="text text-red-500">{error.message}</p>}
      {isPending ? (
        <p className="text text-blue-500 pt-3">Creating post...</p>
      ) : (
        <button disabled={isPending} className="bg-purple-500 text-white p-2 rounded cursor-pointer my-3" type="submit">
          <span>{isPending ? 'Creating Post...' : 'Create Post'}</span>
        </button>
      )}
    </form>
  );
};

export default CreatePost;
