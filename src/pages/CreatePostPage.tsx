import CreatePost from '../components/CreatePost/CreatePost';
import PageHeading from '../components/common/PageHeading';

const CreatePostPage = () => {
  return (
	// <div className="px-4 w-full mx-auto space-y-4 items-start align-top mt-8 flex flex-wrap max-w-5xl gap-6">

    <div className="w-full mx-auto space-y-4 mt-8 flex max-w-5xl gap-6 flex-col pb-8 px-4">
      <PageHeading title="Create New Post" />
      <CreatePost />
    </div>
  );
};

export default CreatePostPage;
