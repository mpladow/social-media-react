import React from 'react';
import PageHeading from '../components/common/PageHeading';
import GroupList from '../components/Group/GroupList';

const GroupsPage = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-4 mt-8">
      <PageHeading title="Groups" />
      <GroupList />
    </div>
  );
};

export default GroupsPage;
