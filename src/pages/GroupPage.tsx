import { useParams } from 'react-router';
import Group from '../components/Group/Group';

const GroupPage = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div className="max-w-5xl w-full mx-auto space-y-4 items-center mt-8 justify-center pb-12 px-6">
      <Group name={name!} />
    </div>
  );
};

export default GroupPage;
