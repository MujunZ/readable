import React, { Component } from 'react';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import uniqid from 'uniqid';
import { addComment, editComment, deleteComment, voteComment } from '../actions/';
import TiDelete from 'react-icons/lib/ti/delete';
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up';
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down';
import TiEdit from 'react-icons/lib/ti/edit';
import CommentForm from './CommentForm'

class Comment extends Component {
	state = {
		showForm: {}
	}
	addComment = e => {
		e.preventDefault();
		let addCommentVal = serialize(e.target, { hash: true });
		addCommentVal = {
			...addCommentVal,
			timestamp: Date.now(),
			id: uniqid(),
			parentId: this.props.parentId
		}
		this.props.addComment(addCommentVal);
		this.setState({});
		e.target.reset();
	}
	editComment = (e, id) => {
		e.preventDefault();
		let addCommentVal = serialize(e.target, { hash: true });
		addCommentVal = {
			...addCommentVal,
			timestamp: Date.now(),
			id,
			parentId: this.props.parentId
		}
		this.props.editComment(addCommentVal);
		this.setState({
			showForm: {
				[id]: false
			}
		});
	}
	voteUp = (id, voteScore) => {
		voteScore++;
		this.props.voteComment({id, voteScore})
	}
	voteDown = (id, voteScore) => {
		voteScore--;
		this.props.voteComment({id, voteScore})
	}
	render () {
	const { comments=[] } = this.props.comment;
	let showForm = {};
		return(
			<section>
				<div className="card__head comment-form">
					<h1>Comments</h1>
				</div>
				<CommentForm onSubmitComment={this.addComment}/>
				<hr/>
				<div className="comment-list">
				{comments
					.filter(({ parentDeleted, deleted }) => parentDeleted === false && deleted === false)
					.sort((a, b) => b.voteScore - a.voteScore )
					.map(({ id, author, body, timestamp, voteScore }) => {
						let time = new Date(timestamp);
						time = time.toUTCString();
						showForm[id] = false;
						return(
							<div key={id}>
								<div className="card__head">
									<div className="vote-container">
										<div>{voteScore} Liked</div>
										<div>
											<div onClick={()=>{this.voteUp(id, voteScore)}}><TiThumbsUp /></div>
											<div onClick={()=>{this.voteDown(id, voteScore)}}><TiThumbsDown /></div>
										</div>
									</div>
									<div>by {author}</div>
									<div>at {time}</div>
									<div>
										<div onClick={()=>{this.props.deleteComment(id)}}><TiDelete /></div>
										<div onClick={() => {
											showForm[id] = true;
											this.setState({ showForm });
										}}><TiEdit /></div>
									</div>
								</div>
								<div className="card__body">{body}</div>
								{ this.state.showForm[id] && (<CommentForm onSubmitComment={(e,id) => this.editComment(e,id)} id={id} author={author} body={body}/>)}
							</div>
						)
					})
				}
				</div>
			</section>
		)
	}
}

function mapStateToProps ({ comment }) {
  return {
    comment
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addComment: (data) => dispatch(addComment(data)),
    editComment: (data) => dispatch(editComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    voteComment: (data) => dispatch(voteComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);