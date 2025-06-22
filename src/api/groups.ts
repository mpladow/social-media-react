import type { GroupSchema, GroupWithPostsSchema } from '../models/schema/Group';
import { supabase } from '../supabase-client';

export const fetchGroups = async (): Promise<GroupSchema[]> => {
	const { data, error } = await supabase.from('groups').select('*').order('name', { ascending: true });
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

export const fetchGroupsWithPostCount = async (): Promise<GroupWithPostsSchema[]> => {

	const { data, error } = await supabase
		.rpc('get_posts_count_in_communities')
		.select('*')
		.order('name', { ascending: true });
	if (error) {
		throw new Error(error.message);
	}
	return data as GroupWithPostsSchema[];
}