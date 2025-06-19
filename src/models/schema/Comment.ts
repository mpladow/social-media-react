export interface CommentSchema {
	id?: number; // Unique identifier for the comment
	post_id: number; // ID of the post the comment belongs to
	parent_comment_id?: number;
	user_id: string; // ID of the user who made the comment
	avatar_url?: string;
	author?: string;
	content: string; // The content of the comment
	created_at?: string; // Timestamp when the comment was created
}