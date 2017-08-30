export const INIT_CATEGORIES = "INIT_CATEGORIES";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const VOTE_POST = "VOTE_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const VOTE_COMMENT = "VOTE_COMMENT";

export function initCategories ({ categories }) {
	return {
		type: INIT_CATEGORIES,
		categories
	}
}

export function getAllPosts ({ posts }) {
	return {
		type: GET_ALL_POSTS,
		posts
	}
}

export function addPost ({ id, timeStamp, title, body, author, category }) {
	return {
		type: ADD_POST,
		id,
		timeStamp,
		title,
		body,
		author,
		category
	}
}

export function editPost ({ timeStamp, title, body, category }) {
	return {
		type: EDIT_POST,
		timeStamp,
		title,
		body,
		category
	}
}

export function deletePost ({ id, deleted, parentDeleted }) {
	return {
		type: DELETE_POST,
		id,
		deleted,
		parentDeleted
	}
}

export function votePost ({ id, upOrDownVote }) {
	return {
		type: VOTE_POST,
		id,
		upOrDownVote
	}
}