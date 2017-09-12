import React, { Component } from 'react';
import { connect } from 'react-redux';

class Comment extends Component {
	state = {
		nameError: false,
		msgError: false
	}
	validateForm = e => {
		e.preventDefault();
		if (e.target.elements["author"].value === "") {
			this.setState({ nameError: true });
		}

		if (e.target.elements["body"].value === "") {
			this.setState({ msgError: true });
		}
		if (!this.state.nameError && !this.state.msgError){
			this.props.onAddComment(e);
		}
	}
	hideNameError = () => {
		this.setState({ nameError: false });
	}
	hideMsgError = () => {
		this.setState({ msgError: false });
	}
	render () {
		return(
			<div className="comment-form">
				<form onSubmit={e => this.validateForm(e)}>
					<div>
						<label htmlFor="author">Nickname:</label>
						<input type="text" name="author" onChange={this.hideNameError}/>
						{this.state.nameError && (<div className="error-warning">Please name yourself.</div>)}
					</div>
					<div>
						<label htmlFor="author">Comment:</label>
						<input type="text" name="body" onChange={this.hideMsgError}/>
						{this.state.msgError && (<div className="error-warning">Please say something.</div>)}
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