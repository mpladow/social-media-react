import type { CommentMaybeWithChildren, CreateCommentForm, CreateReplySchema } from './CommentSection';
import Avatar from '../common/Avatar';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { createComment, createReply } from '../../api/comments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaChevronDown } from 'react-icons/fa6';
import { isToday } from '../../helpers/dates';

interface CommentItemProps {
  postId: number;
  comment: CommentMaybeWithChildren;
}
const CommentItem = ({ postId, comment }: CommentItemProps) => {
  const [showReply, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const { user } = useAuth();
  const { register, handleSubmit, watch, reset } = useForm<CreateReplySchema>();
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: CreateReplySchema) => {
      console.log('🚀 ~ CommentItem ~ user:', user);
      if (user == null) {
        throw new Error('User is not authenticated');
      }
      const author = user?.user_metadata.preferred_username ?? user?.user_metadata.email ?? 'Anonymous';

      return createReply(data, postId, user?.id, author, user?.user_metadata.avatar_url, comment.id);
    },
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      setShowReply(false);
      console.log('Comment submitted successfully');
    },
  });

  const onSubmit = (data: CreateReplySchema) => {
    mutate(data);
  };
  const onError = (error: any) => {
    console.error('Error submitting comment:', error);
  };
  const isChild = comment.parent_comment_id !== null;

  const transformDate = () => {
    const transformed = new Date(comment.created_at);
    if (isToday(transformed)) {
      return 'Today';
    }
  };
  return (
    <div key={comment.id} className="py-4">
      <div className={`flex flex-col justify-between space-x-4 `}>
        <div className={`flex-1 gap-4 border-gray-400/50 border-l-2 pl-4 ${isChild ? 'ml-8' : ''}`}>
          <div className="flex items-center mb-2 space-x-2">
            <Avatar altTitle={comment.author ?? ''} imageUrl={comment.avatar_url} size={'small'} />
            <div className="font-semibold">{comment.author}</div>{' '}
            <span className="text-xs items-center text-gray-400">
              {new Date(comment.created_at).toLocaleTimeString()} {transformDate()}
            </span>
          </div>
          <div className="text-gray-300">{comment.content}</div>
          <button className="text-blue-300 mt-4 cursor-pointer" onClick={() => setShowReply((prev) => !prev)}>
            {showReply ? 'Cancel' : 'Reply'}
          </button>
          {showReply && user && (
            <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-4 mt-4">
              <textarea
                className="border border-gray-300 rounded-md p-2"
                rows={3}
                placeholder="Write a reply..."
                {...register('content', { required: true, maxLength: 400 })}
              />
              <div>
                <button
                  disabled={watch('content') == ''}
                  type="submit"
                  className={`cursor-pointer bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors duration-200 ${
                    watch('content') === '' ? 'opacity-50 hover:bg-blue-500' : ''
                  }`}
                >
                  {isPending ? 'Submitting...' : 'Post Reply'}
                </button>
                {isError && (
                  <div className="text-red-500 mb-4">An error has occurred and your reply has not been submitted.</div>
                )}
              </div>
            </form>
          )}
        </div>
        {/*Reply to comment8s can be added here*/}
        {comment.childrenComments && comment.childrenComments.length > 0 && (
          <div className="mt-4">
            <button className="cursor-pointer" onClick={() => setShowReplies((prev) => !prev)}>
              {showReplies ? (
                <div className="flex items-center space-x-2">
                  <FaChevronDown className="rotate-180" />
                  <span>Hide Replies</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <FaChevronDown />
                  <span>Show Replies ({comment.childrenComments.length})</span>
                </div>
              )}
            </button>
            {showReplies &&
              comment.childrenComments.map((childComment) => (
                <CommentItem key={childComment.id} postId={postId} comment={childComment} />
              ))}
          </div>
        )}
        <div></div>
      </div>
    </div>
  );
};

export default CommentItem;
