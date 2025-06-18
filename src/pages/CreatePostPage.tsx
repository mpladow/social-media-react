import React from 'react';
import CreatePost from '../components/CreatePost';

const CreatePostPage = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <h2 className="text-5xl text-center bg-gradient-to-br from-purple-400 to-blue-500 text-transparent bg-clip-text font-bold mb-4">Create new Post</h2>
      <CreatePost />
    </div>
  );
};

export default CreatePostPage;
