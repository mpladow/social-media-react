import { isToday } from '../../../helpers/dates';
import type { Post } from '../../../models/Post';
import Avatar from '../../common/Avatar';

interface PostItemFooterProps {
  post: Post;
}
const PostItemFooter = ({ post }: PostItemFooterProps) => {
  return (
    <div className="flex flex-1 items-center justify-between mt-4 ">
      <div className="flex items-center space-x-2">
        <Avatar altTitle={post.title} imageUrl={post.avatar_url} name={post.created_by} size={'small'} />

        <div className="flex flex-col">
          <span className="text-sm font-semibold">{post.created_by}</span>
          <div className="text-sm text-gray-500">
            {post.created_at
              ? isToday(new Date(post.created_at))
                ? 'Today'
                : new Date(post.created_at).toLocaleDateString()
              : 'Unknown'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItemFooter;
