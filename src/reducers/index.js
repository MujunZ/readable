import {
	ADD_POST,
	EDIT_POST,
	VOTE_POST,
	DELETE_POST
} from '../actions/'
import { combineReducers } from 'redux'

const initialPostState = {
	categories: [
		{
			name: "react",
			path: "react"
		},
		{
			name: "redux",
			path: "redux"
		},
		{
			name: "udacity",
			path: "udacity"
		}
	],
	posts: [],
	comments: []
}

function post (state = initialPostState, action) {
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

export default post;