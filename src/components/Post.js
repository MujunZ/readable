import React, { Component } from 'react';
import { connect } from 'react-redux';
import { votePost, editPost, getCmtsOfPost } from '../actions/';
import * as ReadableAPI from '../utils/readableAPI';
import Comment from './Comment.js';
import PostForm from './PostForm';
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up';
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down';
import TiEdit from 'react-icons/lib/ti/edit';
import serialize from 'form-serialize';

class Post extends Component {
	state = {
		showForm: false
	}
	componentDidMount() {
		ReadableAPI.getCmtsOfPost(this.props.id).then((cmt) => {
			this.props.getCmtsOfPost(cmt);
		})
	}
	editPost = (e, id) => {
		e.preventDefault();
		let addPostVal = serialize(e.target, { hash: true });
		addPostVal = {
			...addPostVal,
			timestamp: Date.now(),
			id
		}
		this.props.editPost(addPostVal);
		this.setState({ showForm: false });
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
		const { author, timestamp, body, title, voteScore, category } = this.props.post.posts.filter((post) => post.id === this.props.id)[0];
		const postId = this.props.id;
		let time = new Date(timestamp);
		time = time.toUTCString();
		return(
			<main className={`post-${postId}`}>
				{!this.state.showForm && (<section>
					<h1>{title}</h1>
					<div className="post-info card__head">
						<div className="vote-container">
							<div>{voteScore} Liked</div>
							<div>
								<div onClick={()=>{this.voteUp(postId, voteScore)}}><TiThumbsUp /></div>
								<div onClick={()=>{this.voteDown(postId, voteScore)}}><TiThumbsDown /></div>
							</div>
						</div>
						<div>by {author}</div>
						<div>at {time}</div>
						<div onClick={() => {
							this.setState({ showForm: true });
						}}><TiEdit/></div>
					</div>
					<div className="post-body card__body">{body}</div>
				</section>)}
				{this.state.showForm && (<PostForm option={postId} author={author} body={body} title={title} category={category} onCancel={() => {this.setState({ showForm: false })}} onSubmitPost={(e,postId) => {this.editPost(e, postId)}}/>)}
				<Comment parentId={postId}/>
			</main>
		)
	}
}

function mapStateToProps ({ category, post, comment }) {
  return {
    category,
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
