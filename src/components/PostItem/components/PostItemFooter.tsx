import React from 'react';
import type { Post } from '../../../models/Post';
import Avatar from '../../common/Avatar';

interface PostItemFooterProps {
  post: Post;
}
const PostItemFooter = ({ post }: PostItemFooterProps) => {
  return (
    <div className="flex flex-1 items-center justify-between mt-4 ">
      <div className="flex items-center space-x-2">
        <Avatar altTitle={post.title} imageUrl={post.avatar_url} name={post.created_by} size={'small'} />

        <div className="flex flex-col">
          <span className="text-sm font-semibold">{post.created_by}</span>
          <div className="text-sm">{post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Unknown'}</div>
        </div>
      </div>
    </div>
  );
};

export default PostItemFooter;
