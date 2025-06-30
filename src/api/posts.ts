import type { Post } from '../models/Post';
import { supabase } from '../supabase-client';

export const fetchPostById = async (postId: number): Promise<Post> => {
  const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single();

  if (error) throw new Error(error.message);

  return data as Post;
};

export const fetchPosts = async (): Promise<Post[]> => {
  //   const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
  const { data, error } = await supabase
    .rpc('get_posts_with_counts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

export const fetchPostsByGroupId = async (id: number): Promise<Post[]> => {
  let query = supabase.rpc('get_posts_with_counts').order('created_at', { ascending: false });
  query = id ? query.eq('group_id', id) : query;
  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }
  return data as Post[];
};
