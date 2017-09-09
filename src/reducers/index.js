import {
	INIT_CATEGORIES,
	GET_ALL_POSTS,
	ADD_POST,
	EDIT_POST,
	VOTE_POST,
	DELETE_POST,
	GET_CMTS_OF_POST,
	ADD_COMMENT
} from '../actions/'
import { combineReducers } from 'redux';
import * as ReadableAPI from '../utils/readableAPI';


// const initialPostState = {
// 	categories: [],
// 	posts: [],
// 	comments: []
// }

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
	const { id, timeStamp, title, body, author, category } = action;

	switch (action.type) {
		case ADD_POST :
			return {
				...state,
				posts: {
					id,
					timeStamp,
					title,
					body,
					author,
					category
				}
			}
		case EDIT_POST :
			return {
				timeStamp,
				title,
				body,
				category
			}
		default :
			return state;
	}
}

function comment (state = {}, action) {
	const { comments, author, body, deleted, id, parentId, timestamp, voteScore } = action;

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
						voteScore: 0,
						deleted: false,
						parentDeleted: false
					}
			ReadableAPI.addComment(addCommentVal).then(e=>{console.log(e)});
			state.comments.push(addCommentVal);
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