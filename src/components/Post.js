import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initCategories, addPost, editPost, getAllPosts } from '../actions/';
import * as ReadableAPI from '../utils/readableAPI';
import { Link } from 'react-router-dom';

class Post extends Component {
	render() {
		console.log('Post Props', this.props.initState.posts);
		const { id, author, timestamp, body, category, title, voteScore } = this.props.initState.posts.filter((post) => post.id === this.props.id)[0];
		const postId = this.props.id;
		return(
			<main className={`post-${postId}`}>
				<h1>{title}</h1>
				<div>
					<div>by {author}</div>
					<div>at {timestamp}</div>
					<div>{voteScore} liked</div>
				</div>
				<div>{body}</div>
				<Link to="/">back</Link>
			</main>
		)
	}
}

function mapStateToProps ({ initState, post }) {
  return {
    initState,
    post
  }
}

function mapDispatchToProps (dispatch) {
  return {
    initCategories: (data) => dispatch(initCategories(data)),
    getAllPosts: (data) => dispatch(getAllPosts(data)),
    addPost: (data) => dispatch(addPost(data)),
    editPost: (data) => dispatch(editPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
