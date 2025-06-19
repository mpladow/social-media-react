import { useQuery } from '@tanstack/react-query';
import React from 'react';
import type { Post } from '../../models/Post';
import { supabase } from '../../supabase-client';
import PostItem from '../PostItem/PostItem';

const fetchPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const PostList = () => {
  const { data, error, isLoading } = useQuery<Post[], Error>({ queryKey: ['posts'], queryFn: fetchPosts });
  if (isLoading) {
    <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log('🚀 ~ PostList ~ data:', data);
  return (
    <div className="flex flex-wrap max-w-5xl mx-auto gap-6 justify-center">
      {data?.map((post, index) => (
        <PostItem post={post} key={index} />
      ))}
    </div>
  );
};

export default PostList;
