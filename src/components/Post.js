import React, { Component } from 'react';
import { connect } from 'react-redux';
import { votePost, editPost, getCmtsOfPost } from '../actions/';
import { Link } from 'react-router-dom';
import * as ReadableAPI from '../utils/readableAPI';
import Comment from './Comment.js';
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up';
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down';

class Post extends Component {
	componentDidMount() {
		ReadableAPI.getCmtsOfPost(this.props.id).then((cmt) => {
			this.props.getCmtsOfPost(cmt);
		})
	}
	voteUp = (id, voteScore) => {
		voteScore++;
		this.props.votePost({id, voteScore})
	}
	voteDown = (id, voteScore) => {
		voteScore--;
		this.props.votePost({id, voteScore})
	}
	render() {
		console.log('Post Props', this.props);
		const { author, timestamp, body, title, voteScore } = this.props.initState.posts.filter((post) => post.id === this.props.id)[0];
		const postId = this.props.id;
		let time = new Date(timestamp);
		time = time.toUTCString();
		return(
			<main className={`post-${postId}`}>
				<Link to="/">back</Link>
				<h1>{title}</h1>
				<div className="post-info card__head">
					<div>by {author}</div>
					<div>at {time}</div>
					<div className="vote-container">
						<div>{voteScore} Liked</div>
						<div>
							<div onClick={()=>{this.voteUp(postId, voteScore)}}><TiThumbsUp /></div>
							<div onClick={()=>{this.voteDown(postId, voteScore)}}><TiThumbsDown /></div>
						</div>
					</div>
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
    votePost: (data) => dispatch(votePost(data)),
    editPost: (data) => dispatch(editPost(data)),
    getCmtsOfPost: (data) => dispatch(getCmtsOfPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
