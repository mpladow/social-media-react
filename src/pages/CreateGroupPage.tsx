import React from 'react';
import PageHeading from '../components/common/PageHeading';
import CreateGroup from '../components/CreateGroup/CreateGroup';

const CreateGroupPage = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-4 mt-8">
      <PageHeading title="Create Group" />
      <CreateGroup />
    </div>
  );
};

export default CreateGroupPage;
