import { useQuery } from '@tanstack/react-query';
import { fetchGroupByName } from '../../api/groups';
import PageHeading from '../common/PageHeading';
import PostList from '../Home/PostList';

const Group = ({ name }: { name: string }) => {
  const {
    data: group,
    isLoading,
    error,
  } = useQuery({ queryKey: ['group', name], queryFn: () => fetchGroupByName(name ?? '') });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="pb-12">
      {group?.image_url ? (
        <div className="h-30 overflow-hidden w-full flex justify-center items-center mb-4 rounded-2xl">
          <img src={group?.image_url} alt={group?.name} />
        </div>
      ) : (
        <div className="h-30 w-full flex justify-center items-center mb-4 bg-gradient-to-l from-purple-800 to-blue-100 rounded-md"></div>
      )}
      <PageHeading title={group?.name!} />
      <div className="flex w-full gap-4">
        <div className="w-full flex-3">
          <PostList groupId={group?.id} />
        </div>
        <div className="hidden md:flex flex-1 flex-col  ">
          <div className="bg-slate-900 p-4 py-6 rounded-2xl justify-start align-top">
            <h3 className="font-semibold">{group?.name}</h3>
            <p className="text-gray-400">{group?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
