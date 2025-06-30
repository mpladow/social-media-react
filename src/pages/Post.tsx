import { useParams } from 'react-router';
import PostDetails from '../components/Post/PostDetails';

const Post = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="max-w-5xl mx-auto space-y-4 mt-8 pb-12">
      <PostDetails postId={Number(id)} />
    </div>
  );
};

export default Post;
