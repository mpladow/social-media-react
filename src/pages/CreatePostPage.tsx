import React from 'react';
import CreatePost from '../components/CreatePost/CreatePost';
import PageHeading from '../components/common/PageHeading';

const CreatePostPage = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-4 mt-8">
      <PageHeading title="Create New Post" />
      <CreatePost />
    </div>
  );
};

export default CreatePostPage;
