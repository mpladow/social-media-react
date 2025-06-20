import type { CreateCommentForm, CreateReplySchema } from '../components/Post/CommentSection';
import type { CommentSchema } from '../models/schema/Comment';
import { supabase } from '../supabase-client';

export const createComment = async (
	commentForm: CreateCommentForm,
	postId: number,
	userId: string,
	author: string,
	avatar_url: string
): Promise<any> => {
	console.log("🚀 ~ author:", author)
	const newComment: CommentSchema = {
		post_id: postId,
		user_id: userId,
		author,
		avatar_url,
		content: commentForm.content,
		parent_comment_id: undefined,
	};
	const { data, error } = await supabase.from('comments').insert(newComment);
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

export const createReply = async (
	commentForm: CreateReplySchema,
	postId: number,
	userId: string,
	author: string,
	avatar_url: string,
	parentCommentId?: number
): Promise<any> => {
	const newComment: CommentSchema = {
		post_id: postId,
		user_id: userId,
		author,
		avatar_url,
		content: commentForm.content,
		parent_comment_id: parentCommentId,
	};
	const { data, error } = await supabase.from('comments').insert(newComment);
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

export const fetchComments = async (postId: number): Promise<CommentSchema[]> => {
	const { data, error } = await supabase
		.from('comments')
		.select('*')
		.eq('post_id', postId)
		.order('created_at', { ascending: false });

	if (error) {
		throw new Error(error.message);
	}
	return data as CommentSchema[];
};