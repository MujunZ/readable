import React, { Component } from 'react';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import uniqid from 'uniqid';
import { addComment, deleteComment, voteComment } from '../actions/';
import TiDelete from 'react-icons/lib/ti/delete';
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up';
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down';
import * as ReadableAPI from '../utils/readableAPI';

class Comment extends Component {
	state = {
		comments: this.props.comment,
	}
	addComment = e => {
		e.preventDefault();
		let addCommentVal = serialize(e.target, { hash: true });
		addCommentVal = {
			...addCommentVal,
			timestamp: Date(),
			id: uniqid(),
			parentId: this.props.parentId
		}
		this.props.addComment(addCommentVal);
		this.setState({comments: addCommentVal});
		e.target.reset();
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
		return(
			<section>
				<div className="card__head">
					<h1>Comments</h1>
				</div>
				<div className="comment-form">
					<form onSubmit={this.addComment}>
						<div>
							<label htmlFor="author">Nickname:</label>
							<input type="text" name="author"/>
						</div>
						<div>
							<label htmlFor="author">Comment:</label>
							<input type="text" name="body"/>
						</div>
						<button>submit</button>
					</form>
				</div>
				<hr/>
				<div>
				{comments
					.filter(({ parentDeleted, deleted }) => parentDeleted === false && deleted === false)
					.sort((a, b) => b.voteScore - a.voteScore )
					.map(({ id, author, body, timestamp, voteScore }) => {
						let time = new Date(timestamp);
						time = time.toDateString();
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
									<div onClick={()=>{this.props.deleteComment(id)}}><TiDelete /></div>
								</div>
								<div>{body}</div>
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
    deleteComment: (data) => dispatch(deleteComment(data)),
    voteComment: (data) => dispatch(voteComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);