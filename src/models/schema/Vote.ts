export interface VoteSchema {
	id?: number; // Unique identifier for the vote
	post_id: number; // ID of the post being voted on
	user_id: string; // ID of the user who cast the vote
	is_like: boolean; // Indicates if the vote is a like (true) or dislike (false)
	created_at: string; // Timestamp when the vote was created
	updated_at: string; // Timestamp when the vote was last updated
}
export interface CreateVoteSchema {
	post_id: number; // ID of the post being voted on
	user_id: string; // ID of the user who cast the vote
	is_like: boolean; // Indicates if the vote is a like (true) or dislike (false)
}