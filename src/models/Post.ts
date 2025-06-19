export interface Post {
	id: number;
	created_at: string;
	title: string;
	content: string;
	image_url?: string; // Optional field for image URL
	created_by:string;
	avatar_url?: string; // Optional field for avatar URL
}