import React, { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../supabase-client';
import type { CommentSchema } from '../../models/schema/Comment';
import Avatar from '../common/Avatar';
import CommentItem from './CommentItem';
import { createComment, fetchComments } from '../../api/comments';

interface CommentSectionProps {
  postId: number;
}
export interface CreateCommentForm {
  content: string;
  parent_comment_id?: number;
}

export interface CreateReplySchema {
  content: string;
}

export interface CommentMaybeWithChildren extends CommentSchema {
  childrenComments: CommentMaybeWithChildren[];
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const { user } = useAuth();
  const { register, handleSubmit, watch, reset } = useForm<CreateCommentForm>();
  const queryClient = useQueryClient();
  const { data: comments } = useQuery<CommentSchema[], Error>({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: CreateCommentForm) => {
      if (user == null) {
        throw new Error('User is not authenticated');
      }

      console.log('🚀 ~ CommentSection ~ user:', user.user_metadata);
      const author = user?.user_metadata.preferred_username ?? user?.user_metadata.email ?? 'Anonymous';
      return createComment(data, postId, user?.id, author, user?.user_metadata.avatar_url);
    },
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      console.log('Comment submitted successfully');
    },
  });

  const onSubmit = (data: CreateCommentForm) => {
    data.parent_comment_id = undefined;
    mutate(data);
  };
  const onError = (error: any) => {
    console.error('Error submitting comment:', error);
  };

  /**Iterate over comments and create a comment tree for each of the comments, based off comment parents */
  const commentTree = useMemo(() => {
    const roots: CommentMaybeWithChildren[] = [];
    if (comments) {
      const map = new Map<number, CommentMaybeWithChildren>();
      comments.forEach((comment) => {
        map.set(comment.id ?? 0, { ...comment, childrenComments: [] });
      });
      comments.forEach((comment) => {
        if (comment.parent_comment_id) {
          const parent = map.get(comment.parent_comment_id);
          if (parent) {
            parent.childrenComments.push(map.get(comment.id!) as CommentMaybeWithChildren);
          }
        } else {
          // not a reply, just a parent
          roots.push(map.get(comment.id!) as CommentMaybeWithChildren);
        }
      });
      return roots;
    } else {
      return roots;
    }
  }, [comments]);

  return (
    <div className="max-w-5xl mx-auto pt-2">
      {user ? (
        <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-4 mt-4">
          <textarea
            className="border border-gray-300 rounded-md p-2"
            rows={3}
            placeholder="Write a comment..."
            {...register('content', { required: true, maxLength: 400 })}
          />
          <div>
            <button
              disabled={watch('content') == undefined || watch('content') === ''}
              type="submit"
              className={`cursor-pointer bg-blue-500 text-white rounded-md px-4 py-2 ${
                watch('content') === '' || watch('content') == undefined
                  ? ' cursor-pointer opacity-50'
                  : 'cursor-pointer hover:bg-blue-600 transition-colors duration-200'
              }`}
            >
              {isPending ? 'Submitting...' : 'Post Comment'}
            </button>
            {isError && (
              <div className="text-red-500 mb-4">An error has occurred and your comment has not been submitted.</div>
            )}
          </div>
        </form>
      ) : (
        <p>You must be logged in to comment on this post.</p>
      )}
      <div className="mt-8 space-y-4">
        {commentTree?.map((comment, index) => (
          <CommentItem key={index} comment={comment} postId={postId} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
