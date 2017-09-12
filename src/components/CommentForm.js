import React, { Component } from 'react';
import { connect } from 'react-redux';

class Comment extends Component {
	render () {
		return(
			<div className="comment-form">
				<form onSubmit={this.props.onAddComment}>
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
		)
	}
}

function mapStateToProps ({ comment }) {
  return {
    comment
  }
}

export default connect(mapStateToProps)(Comment);