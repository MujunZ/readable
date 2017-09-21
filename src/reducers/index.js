import {
	INIT_CATEGORIES,
	GET_ALL_POSTS,
	ADD_POST,
	EDIT_POST,
	VOTE_POST,
	DELETE_POST,
	GET_CMTS_OF_POST,
	ADD_COMMENT,
	DELETE_COMMENT,
	VOTE_COMMENT,
	EDIT_COMMENT
} from '../actions/'
import { combineReducers } from 'redux';
import * as ReadableAPI from '../utils/readableAPI';

function initState (state = {}, action) {
	const { categories, posts } = action
	switch (action.type) {
		case INIT_CATEGORIES :
			return {
				...state,
				categories
			}
		case GET_ALL_POSTS :
			return {
				...state,
				posts
			}
		default :
			return state;
	}
}

function post (state = {}, action) {
	const { posts, id, timestamp, title, body, author, category, voteScore } = action;

	switch (action.type) {
		case GET_ALL_POSTS :
			return {
				...state,
				posts
			};
		case ADD_POST :
		let addPostVal = {
					id,
					timestamp,
					title,
					body,
					author,
					category,
					deleted: false,
					voteScore: 1
				}
			ReadableAPI.addPost(addPostVal);
			state.posts.push(addPostVal);
			return state;
		case DELETE_POST :
			const newState = {
				...state,
				posts: state.posts.map((p) => {
						if (p.id === id) {
							p.deleted = true;
						}
						return p
					})
			}
			ReadableAPI.deletePost(id);
			return newState;
		case VOTE_POST :
			let option;
			const newPosts = state.posts.map((p) => {
						if (p.id === id) {
							option = voteScore - p.voteScore > 0 ? "upVote" : "downVote";
							p.voteScore = voteScore;
						}
						return p
					})
			ReadableAPI.votePost(id, option);
			return {
				...state,
				comments: newPosts
			};
		case EDIT_POST :
			for (let p of state.posts) {
				if (p.id === id) {
					p.author = author;
					p.body = body;
					p.title = title;
					ReadableAPI.editPost(p);
				}
			}
			return state;
		default :
			return state;
	}
}

function comment (state = {}, action) {
	const { comments, author, body, id, parentId, timestamp, voteScore } = action;

	switch (action.type) {
		case GET_CMTS_OF_POST :
			return {
				...state,
				comments
			}
		case ADD_COMMENT :
			const addCommentVal = {
						id,
						parentId,
						body,
						author,
						timestamp,
						voteScore: 1,
						deleted: false,
						parentDeleted: false
					}
			ReadableAPI.addComment(addCommentVal);
			state.comments.push(addCommentVal);
			return state;
		case DELETE_COMMENT :
			const newState = {
				...state,
				comments: state.comments.map((cmt) => {
						if (cmt.id === id) {
							cmt.deleted = true;
						}
						return cmt
					})
			}
			ReadableAPI.deleteComment(id);
			return newState;
		case VOTE_COMMENT :
			let option;
			const newComments = state.comments.map((cmt) => {
						if (cmt.id === id) {
							option = voteScore - cmt.voteScore > 0 ? "upVote" : "downVote";
							cmt.voteScore = voteScore;
						}
						return cmt
					})
			ReadableAPI.voteComment(id, option);
			return {
				...state,
				comments: newComments
			};
		case EDIT_COMMENT :
			for (let cmt of state.comments) {
				if (cmt.id === id) {
					cmt.author = author;
					cmt.body = body;
					ReadableAPI.editComment(cmt);
				}
			}
			return state;
		default :
			return state;
	}
}

export default combineReducers({
	initState,
	post,
	comment
})