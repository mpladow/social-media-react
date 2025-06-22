import { useQuery } from '@tanstack/react-query';
import { fetchGroupsWithPostCount } from '../api/groups';

export const useGroupsQuery = () => {
	const { data: groups, error, isLoading } = useQuery({ queryKey: ['groups'], queryFn: fetchGroupsWithPostCount });

	return { groups, error, isLoading };
}
