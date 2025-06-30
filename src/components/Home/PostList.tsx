import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { fetchPostsByGroupId } from '../../api/posts';
import type { Post } from '../../models/Post';
import Button from '../common/Button';
import PostItem from '../PostItem/PostItem';

const PostList = ({ groupId }: { groupId?: number }) => {
  const { data, error, isLoading } = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: () => fetchPostsByGroupId(groupId!),
  });
  if (isLoading) {
    <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-96 bg-gray-100/5 rounded-lg shadow-md gap-4">
        <p>{groupId ? 'There are no posts for this group.' : 'There are no posts.'}</p>
        <Link to={'/create'}>
          <Button type={'button'} colorClass={'primary'} sizeClass={'small'}>
            Create Post
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap max-w-5xl w-full mx-auto gap-6 mb-12 pb-12">
      {data?.map((post, index) => (
        <PostItem post={post} key={index} />
      ))}
    </div>
  );
};

export default PostList;
