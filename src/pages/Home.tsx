import PageHeading from '../components/common/PageHeading';
import PostList from '../components/Home/PostList';

export const Home = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-4 mt-8">
      <PageHeading title="All Posts" />
      <PostList />
    </div>
  );
};
