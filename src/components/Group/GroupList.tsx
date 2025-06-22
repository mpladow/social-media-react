import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../supabase-client';
import type { GroupSchema } from '../../models/schema/Group';
import { Link } from 'react-router';

const fetchGroups = async (): Promise<GroupSchema[]> => {
  //   const { data, error } = await supabase.from('groups').select('*').order('name', { ascending: true });
  const { data, error } = await supabase
    .rpc('get_posts_count_in_communities')
    .select('*')
    .order('name', { ascending: true });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const GroupList = () => {
  const { data, error, isLoading } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups });
  console.log('🚀 ~ GroupList ~ data:', data);

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {data!.map((group, index) => (
        <Link
          to={`/groups/${group.id}`}
          key={index}
          className="flex h-full z-10 w-full border border-gray-500 bg-gradient-to-b from-violet-800/10 to-gray-800/10 blur-none transition duration-300 hover:scale-101 rounded-2xl flex-col p-4 shadow-xl hover:shadow-indigo-950/50 cursor-pointer"
        >
          <div>
            <h2 className="text-2xl font-semibold text-purple-500 hover:underline transition duration-100 ease-in-out">
              {group.name}
            </h2>
          </div>
          <div>
            <p>{group.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GroupList;
