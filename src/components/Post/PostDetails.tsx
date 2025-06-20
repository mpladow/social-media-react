import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../supabase-client';
import type { Post } from '../../models/Post';
import Avatar from '../common/Avatar';
import LikeButton from './LikeButton';
import CommentSection from './CommentSection';
import type { OutputBlockData, OutputData } from '@editorjs/editorjs';
import { editorJStoHTML } from '../../helpers/htmlRenderer';

const fetchPostById = async (postId: number): Promise<Post> => {
  const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single();

  if (error) throw new Error(error.message);

  return data as Post;
};

const handleEditorJSRendering = (data: OutputBlockData) => {
  return editorJStoHTML(data);
};

const PostDetails = ({ postId }: { postId: number }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId),
  });

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error?.message}</div>;
  }

  const renderContent = () => {
    if (data && data.content) {
      try {
        const content: OutputData = JSON.parse(data.content);
        const renderedBlocks = content.blocks.map((block, index) => {
          return <div key={index}>{handleEditorJSRendering(block)}</div>;
        });
        return renderedBlocks;
      } catch {
        return data.content;
      }
      // console.log('🚀 ~ renderContent ~ content:', content);
      return '';
    } else {
      return '';
    }
  };

  return (
    <div>
      {/* // page header */}
      <div className="flex items-center  mb-8 justify-between p-20 bg-gradient-to-br from-indigo-800/80 to-purple-800/80 rounded-2xl shadow-lg">
        <div className="flex flex-col w-screen max-w-5xl mx-auto  gap-4">
          <div>{new Date(data?.created_at ?? '').toLocaleDateString()}</div>
          <div>
            <h1 className="text-6xl font-bold">{data?.title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar altTitle={data?.title ?? ''} imageUrl={data?.avatar_url} size={'medium'} />
            <span className="font-bold">{data?.created_by ?? 'Anonymous'}</span>
          </div>
        </div>
        <LikeButton postId={data?.id ?? 0} />
      </div>
      {/* // content */}
      <div>
        {renderContent()}
        <p className="first-letter:text-7xl first-letter:float-left first-letter:mr-3 first-letter:font-bold first-line:tracking-widest"></p>
        {/* <img src={data?.image_url} alt={data?.title} className="w-full rounded-[20px] object-cover h-100" /> */}
      </div>
      <div className="w-screen max-w-5xl mx-auto mt-8">
        <label className="text-xl font-semibold mt-4 mb-4">Comments</label>

        <CommentSection postId={postId} />
      </div>
    </div>
  );
};

export default PostDetails;
