import {
	INIT_CATEGORIES,
	ADD_POST,
	EDIT_POST,
	VOTE_POST,
	DELETE_POST
} from '../actions/'
import * as ReadableAPI from '../utils/readableAPI';
import { combineReducers } from 'redux'


// const initialPostState = {
// 	categories: [],
// 	posts: [],
// 	comments: []
// }

function category (state = {}, action) {
	const { categories } = action
	switch (action.type) {
		case INIT_CATEGORIES :
			return {
				...state,
				categories
			}
		default :
			return state
	}
}

function post (state = {}, action) {
	const { id, timeStamp, title, body, author, category } = action

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
			return state
	}
}

export default combineReducers({
	category,
	post
})