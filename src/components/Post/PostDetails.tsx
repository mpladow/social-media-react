import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import { supabase } from '../../supabase-client';
import type { Post } from '../../models/Post';
import PageHeading from '../common/PageHeading';
import Avatar from '../common/Avatar';
import LikeButton from './LikeButton';

const fetchPostById = async (postId: number): Promise<Post> => {
  const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single();

  if (error) throw new Error(error.message);

  return data as Post;
};

const PostDetails = ({ postId }: { postId: number }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId),
  });

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error?.message}</div>;
  }

  return (
    <div>
      {/* // page header */}
      <div className="flex flex-col w-screen max-w-5xl mx-auto justify-between mb-4 p-20 bg-gradient-to-br from-indigo-800/80 to-purple-800/80 rounded-2xl shadow-lg gap-4">
        <div>{new Date(data?.created_at ?? '').toLocaleDateString()}</div>
        <div>
          <h1 className="text-6xl font-bold">{data?.title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Avatar altTitle={data?.title ?? ''} imageUrl={data?.avatar_url} size={'medium'} />
          <span className="font-bold">{data?.created_by ?? 'Anonymous'}</span>
        </div>
        <LikeButton postId={data?.id ?? 0} />
      </div>
      {/* // content */}
      <div>
        <p>{data?.content}</p>
        <img src={data?.image_url} alt={data?.title} className="w-full rounded-[20px] object-cover h-100" />
      </div>
    </div>
  );
};

export default PostDetails;
