import { Link } from 'react-router';
import Button from '../components/common/Button';
import PageHeading from '../components/common/PageHeading';
import PostList from '../components/Home/PostList';

export const Home = () => {
  return (
    <div className="px-4 w-full mx-auto space-y-4 items-start align-top mt-8 flex flex-wrap max-w-5xl gap-6">
      <div className="w-full flex flex-row justify-between items-center">
        <PageHeading title="All Posts" noPadding />
        <div className="flex flex-row gap-2">
          <Link to={'/create'}>
            <Button type={'button'} colorClass={'primary'} sizeClass={'small'}>
              Create Post
            </Button>
          </Link>
        </div>
      </div>
      <PostList />
    </div>
  );
};
