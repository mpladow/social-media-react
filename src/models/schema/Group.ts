export interface GroupSchema {
	id: number;
	created_at: string;
	name: string;
	description: string;

}
export interface GroupWithPostsSchema {
	id: number;
	created_at: string;
	name: string;
	description: string;
	post_count: number;
}