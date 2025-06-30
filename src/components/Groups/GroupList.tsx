import { Link } from 'react-router';
import { useGroupsQuery } from '../../hooks/useGroupsQuery';

const GroupList = () => {
  const { groups, error, isLoading } = useGroupsQuery();

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {groups!.map((group, index) => (
        <Link
          to={`/group/${group.name}`}
          key={index}
          className="flex h-full z-10 w-full border border-gray-500 bg-gradient-to-b from-violet-800/10 to-gray-800/10 blur-none transition duration-300 hover:scale-101 rounded-2xl flex-col p-4 shadow-xl hover:shadow-indigo-950/50 cursor-pointer"
        >
          <div className="flex items-center gap-4 mb-2">
            {group.image_url ? (
              <img src={group.image_url} alt={group.name} className="rounded-full w-12 h-12 md:h-24 md:w-24" />
            ) : (
              <div className="rounded-full w-12 h-12 md:h-24 md:w-24 bg-gray-300 items-center flex justify-center">
                <span className="text-gray-500 text-center text-4xl">{group.name[0]}</span>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-semibold text-purple-500 hover:underline transition duration-100 ease-in-out">
                {group.name}
              </h2>
              <div>
                <p>{group.description}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GroupList;
