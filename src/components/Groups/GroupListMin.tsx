import { useGroupsQuery } from '../../hooks/useGroupsQuery';
import NavbarButton from '../common/NavbarButton';

const GroupList = () => {
  const { groups, error, isLoading } = useGroupsQuery();

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {groups!.map((group, index) => (
        <NavbarButton to={`/group/${group.name}`} key={index}>
          <div className="flex items-center gap-4">
            {group.image_url ? (
              <img src={group.image_url} alt={group.name} className="rounded-full w-12 h-12 md:h-8 md:w-8" />
            ) : (
              <div className="rounded-full w-12 h-12 md:h-8 md:w-8 bg-gray-300 items-center flex justify-center">
                <span className="text-gray-500 text-center text-xl">{group.name[0]}</span>
              </div>
            )}
            <div>
              <h2 className="text-base font-semibold hover:underline transition duration-100 ease-in-out">
                {group.name}
              </h2>
            </div>
          </div>
        </NavbarButton>
      ))}
    </div>
  );
};

export default GroupList;
