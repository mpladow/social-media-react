import { useForm, type SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '../../supabase-client';
import { useRef, type ChangeEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import type { Post } from '../../models/Post';
import { useNavigate } from 'react-router';
import Editor from '../common/Editor/Editor';
import type { OutputData } from '@editorjs/editorjs';

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
    console.log('🚀 ~ CreatePost ~ data:', data);
    // add user created data
    data.created_by = user?.user_metadata.preferred_username || user?.user_metadata.email || 'Anonymous';
    data.avatar_url = user?.user_metadata.avatar_url || null;
    mutate(data);

    // Here you would typically send the form data to your backend or API
  };
  const onError = (error: any) => {
    console.error('Error creating post:', error);
  };

  const handleEditorDataChange = (data: OutputData) => {
    setValue('content', JSON.stringify(data));
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
        <Editor data={watch('content')} onChange={handleEditorDataChange} editorBlock="editorjs" />
        {/* <textarea
          className="w-full border border-gray-300 p-2 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
          {...register('content', { required: true })}
          id="content"
          rows={5}
        /> */}
        {errors.content && <span className="text-red-500">Content is required</span>}
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
            <img src={URL.createObjectURL(watch('image'))} alt="Selected" className="h-32 w-32 object-contain" />
          </div>
        )}
        <input
          onChange={handleFileChange}
          type="file"
          className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500 ..."
        />
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
