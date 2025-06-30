import PageHeading from '../components/common/PageHeading';
import GroupList from '../components/Groups/GroupList';

const GroupsPage = () => {
  return (
    <div className="w-full mx-auto space-y-4 mt-8 flex flex-wrap max-w-5xl gap-6 flex-col px-6">
      <PageHeading title="Groups" />
      <GroupList />
    </div>
  );
};

export default GroupsPage;
