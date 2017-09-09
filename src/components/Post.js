import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost, editPost, getCmtsOfPost } from '../actions/';
import { Link } from 'react-router-dom';
import * as ReadableAPI from '../utils/readableAPI';
import Comment from './Comment.js';

class Post extends Component {
	componentDidMount() {
		ReadableAPI.getCmtsOfPost(this.props.id).then((cmt) => {
			this.props.getCmtsOfPost(cmt);
		})
	}
	render() {
		console.log('Post Props', this.props);
		const { author, timestamp, body, title, voteScore } = this.props.initState.posts.filter((post) => post.id === this.props.id)[0];
		const postId = this.props.id;
		return(
			<main className={`post-${postId}`}>
				<Link to="/">back</Link>
				<h1>{title}</h1>
				<div className="post-info card__head">
					<div>by {author}</div>
					<div>at {timestamp}</div>
					<div>{voteScore} liked</div>
				</div>
				<div className="post-body card__body">{body}</div>
				<Comment parentId={postId}/>
			</main>
		)
	}
}

function mapStateToProps ({ initState, post, comment }) {
  return {
    initState,
    post,
    comment
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    editPost: (data) => dispatch(editPost(data)),
    getCmtsOfPost: (data) => dispatch(getCmtsOfPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
