import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '../../supabase-client';
import type { CommentSchema } from '../../models/schema/Comment';

interface CommentSectionProps {
  postId: number;
}
interface CreateCommentForm {
  content: string;
  parent_comment_id?: number;
}

const createComment = async (
  commentForm: CreateCommentForm,
  postId: number,
  userId: string,
  author: string,
  avatar_url: string
): Promise<any> => {
  const newComment: CommentSchema = {
    post_id: postId,
    user_id: userId,
    author,
    avatar_url,
    content: commentForm.content,
  };
  const { data, error } = await supabase.from('comments').insert(newComment);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const CommentSection = ({ postId }: CommentSectionProps) => {
  const { user } = useAuth();
  const { register, handleSubmit, watch } = useForm<CreateCommentForm>();

  const { mutate } = useMutation({
    mutationFn: (data: CreateCommentForm) => {
      if (user == null) {
        throw new Error('User is not authenticated');
      }

      return createComment(
        data,
        postId,
        user?.id,
        user?.user_metadata.preferredName ?? user?.user_metadata.fullName,
        user?.user_metadata.avatar_url
      );
    },
  });

  const onSubmit = (data: CreateCommentForm) => {
    data.parent_comment_id = undefined;
    mutate(data);
  };
  const onError = (error: any) => {
    console.error('Error submitting comment:', error);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      {user ? (
        <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-4">
          <textarea
            className="border border-gray-300 rounded-md p-2"
            rows={3}
            placeholder="Write a comment..."
            {...register('content', { required: true, maxLength: 400 })}
          />
          <button
            disabled={watch('content') == ''}
            type="submit"
            className={`bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors duration-200 ${
              watch('content') === '' ? 'opacity-50 hover:bg-blue-500' : ''
            }`}
          >
            Submit
          </button>
        </form>
      ) : (
        <p>You must be logged in to comment on this post.</p>
      )}
    </div>
  );
};

export default CommentSection;
