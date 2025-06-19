import React from 'react';
import type { Post } from '../../models/Post';
import { Link } from 'react-router';
import Avatar from '../common/Avatar';
import PostItemFooter from './components/PostItemFooter';
import LikeButton from '../Post/LikeButton';

interface PostItemProps {
  post: Post;
}
const PostItem = ({ post }: PostItemProps) => {
  return (
    <Link
      to={`/post/${post.id}`}
      className="flex h-full z-10 w-full xl:w-120 border border-gray-500 bg-gradient-to-br from-gray-800 to-gray-00 blur-none transition duration-300 hover:scale-105 rounded-2xl flex-col p-4 shadow-xl hover:shadow-indigo-950/50 cursor-pointer"
    >
      {/* HEADING - TODO - pull into seperate component */}
      <div className="flex flex-1 flex-col gap-4 mb-4">
        <img src={post.image_url} alt={post.title} className="w-full rounded-[20px] h-42 object-cover" />
        <div className="flex flex-1 h-full flex-col gap-4">
          <div className="flex items-center space-x-2">
            <div className="flex flex-col flex-1">
              <h3 className="text-2xl font-semibold">{post.title}</h3>
            </div>
          </div>
          <div className="flex-col justify-between">
            <p className="line-clamp-4">{post.content}</p>
          </div>
        </div>
        <PostItemFooter post={post} />
        <LikeButton postId={post.id} cosmeticOnly />
      </div>
    </Link>
  );
};

export default PostItem;
