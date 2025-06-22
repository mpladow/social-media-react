import { useParams } from 'react-router';

const Group = () => {
  const { id } = useParams<{ id: string }>();
  return <div>Group ID: {id}</div>;
};

export default Group;
