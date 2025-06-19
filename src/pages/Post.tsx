import React from 'react';
import PageHeading from '../components/common/PageHeading';
import PostDetails from '../components/Post/PostDetails';
import { useParams } from 'react-router';

const Post = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="max-w-5xl mx-auto space-y-4 mt-8">
      <PostDetails postId={Number(id)} />
    </div>
  );
};

export default Post;
