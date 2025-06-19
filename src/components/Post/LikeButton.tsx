import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { IoIosThumbsUp, IoIosThumbsDown } from 'react-icons/io';
import { supabase } from '../../supabase-client';
import type { CreateVoteSchema, VoteSchema } from '../../models/schema/Vote';
import { useAuth } from '../../context/AuthContext';

interface LikeButtonProps {
  postId: number;
  cosmeticOnly?: boolean;
}

const voteForPost = async (postId: number, isLike: boolean, userId: string) => {
  // CHECK if vote already exists
  const { data: voteExists } = await supabase
    .from('votes')
    .select('*')
    .eq('post_id', postId)
    .eq('user_id', userId)
    .maybeSingle();
  if (voteExists) {
    if (voteExists.is_like == isLike) {
      // remove from db, since user is pressing the same button again
      const { error: deleteError } = await supabase.from('votes').delete().eq('id', voteExists.id);
      if (deleteError) {
        console.error('Error deleting vote:', deleteError);
        throw new Error(deleteError.message);
      }
    } else {
      const { error: updateError } = await supabase.from('votes').update({ is_like: isLike }).eq('id', voteExists.id);
      if (updateError) {
        console.error('Error updating vote:', updateError);
        throw new Error(updateError.message);
      }
    }
  } else {
    const vote: CreateVoteSchema = {
      post_id: postId,
      is_like: isLike,
      user_id: userId,
    };
    const { data, error } = await supabase.from('votes').insert(vote).select().single();
    console.log('🚀 ~ voteForPost ~ error:', error);
    if (error) {
      throw new Error(error.message);
    }
    return data as VoteSchema;
  }
};

const fetchVotesForPost = async (postId: number): Promise<VoteSchema[]> => {
  // get all votes for this post
  const { data, error } = await supabase.from('votes').select('*').eq('post_id', postId);
  if (error) {
    console.error('Error fetching votes:', error);
    throw new Error(error.message);
  }
  return data as VoteSchema[];
};

const LikeButton = ({ postId, cosmeticOnly }: LikeButtonProps) => {
  const REFRESH_INTERVAL = 60000;
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const {
    data: votes,
    isLoading,
    error,
  } = useQuery<VoteSchema[], Error>({
    queryKey: ['votes', postId],
    queryFn: async () => {
      return fetchVotesForPost(postId);
    },

    //  refetchInterval: REFRESH_INTERVAL * 2, //
  });

  const { mutate } = useMutation({
    mutationFn: (isLike: boolean) => {
      if (!user) {
        throw new Error('User not authenticated');
      }
      return voteForPost(postId, isLike, user.id ?? '');
    },
    onSuccess: () => {
      // Invalidate the query to refetch votes
      queryClient.invalidateQueries({ queryKey: ['votes', postId] });
    },
  });
  // likes
  const likes = votes?.filter((x) => x.is_like).length ?? 0;
  const dislikes = votes?.filter((x) => !x.is_like).length ?? 0;
  const userVote = votes?.find((vote) => vote.user_id === user?.id);

  if (isLoading) {
    return <div className="text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error fetching votes</div>;
  }

  return (
    <div className="flex items-center gap-4">
      <button
        className={`cursor-pointer text-xl text-gray-300 hover:text-gray-500 transition-colors duration-200 ${
          userVote?.is_like ? 'text-green-500 hover:text-green-700' : ''
        }`}
        onClick={() => {
          if (cosmeticOnly) return; // If cosmeticOnly is true, do not mutate
          mutate(true);
        }}
      >
        <IoIosThumbsUp /> {likes}
      </button>
      <button
        className={`cursor-pointer text-xl text-gray-300 hover:text-gray-500 transition-colors duration-200 ${
          userVote?.is_like == false ? 'text-red-500 hover:text-red-700' : ''
        }`}
        onClick={() => {
          if (cosmeticOnly) return; // If cosmeticOnly is true, do not mutate
          mutate(false);
        }}
      >
        <IoIosThumbsDown /> {dislikes}
      </button>
    </div>
  );
};

export default LikeButton;
