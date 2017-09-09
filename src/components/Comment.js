import React, { Component } from 'react';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import uniqid from 'uniqid';
import { addComment } from '../actions/';

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
	render () {
	const { comments=[] } = this.props.comment;
		return(
			<section>
				<div className="card__head">
					<h1>Comments</h1>
				</div>
				{comments
					.filter(({ parentDeleted, deleted }) => parentDeleted === false && deleted === false)
					.sort((a, b) => b.voteScore - a.voteScore )
					.map(({ id, author, body, timestamp, voteScore }) => {
						let time = new Date(timestamp);
						time = time.toDateString();
						return(
							<div key={id}>
								<div className="card__head">
									<div>{voteScore} Liked</div>
									<div>by {author}</div>
									<div>at {time}</div>
								</div>
								<div>{body}</div>
							</div>
						)
					})
				}
				<hr/>
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
    addComment: (data) => dispatch(addComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);