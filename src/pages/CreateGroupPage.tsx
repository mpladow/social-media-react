import PageHeading from '../components/common/PageHeading';
import CreateGroup from '../components/CreateGroup/CreateGroup';

const CreateGroupPage = () => {
  return (
	<div className="w-full mx-auto space-y-4 mt-8 flex flex-wrap max-w-5xl gap-6 flex-col px-6">
      <PageHeading title="Create Group" />
      <CreateGroup />
    </div>
  );
};

export default CreateGroupPage;
