import type { OutputData } from '@editorjs/editorjs';
import parse from 'html-react-parser';
import { BsChatFill } from 'react-icons/bs';
import { IoIosThumbsUp } from 'react-icons/io';
import { Link } from 'react-router';
import type { Post } from '../../models/Post';
import PostItemFooter from './components/PostItemFooter';

interface PostItemProps {
  post: Post;
}
const PostItem = ({ post }: PostItemProps) => {
  const handleRenderContent = () => {
    if (post && post.content) {
      try {
        const content: OutputData = JSON.parse(post.content);
        const firstParagraph = content.blocks?.find((x) => x.type === 'paragraph')?.data?.text || '';
        if (firstParagraph)
          // If the first paragraph exists, render it directly
          return <p className="line-clamp-4">{firstParagraph}</p>;
      } catch (error) {
        return parse(`<p className="line-clamp-4">${post.content}</p>`);
      }
    }
  };
  return (
    <Link
      to={`/post/${post.id}`}
      className="flex h-full z-10 w-full border border-gray-500/50 hover:bg-gradient-to-b from-violet-800/20 to-gray-800 blur-none transition duration-300 rounded-2xl flex-col p-4 shadow-xl hover:shadow-indigo-950/50 cursor-pointer"
    >
      {/* HEADING - TODO - pull into seperate component */}
      <div className="flex flex-1 flex-col gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex flex-col flex-1">
            <h3 className="text-xl font-semibold">{post.title}</h3>
          </div>
        </div>
        {post.image_url && (
          <img src={post.image_url} alt={post.title} className="w-full rounded-md h-42 object-cover" />
        )}
        <div className="flex flex-1 h-full flex-col gap-4">
          <div className="flex-col justify-between">
            {/* <p className="line-clamp-4">{post.content}</p> */}
            {handleRenderContent()}
          </div>
        </div>
        <PostItemFooter post={post} />
        <div className="flex spacing-4 gap-4">
          <div className="flex items-center space-x-1">
            <BsChatFill />
            <span className="text-gray-400">{post.comment_count} Comments</span>
          </div>
          <div className="flex items-center space-x-1">
            <IoIosThumbsUp />
            <span className="text-gray-400">{post.like_count} Likes</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
