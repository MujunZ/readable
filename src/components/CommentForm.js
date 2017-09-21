import React, { Component } from 'react';
import { connect } from 'react-redux';

class Comment extends Component {
	state = {
		nameError: false,
		msgError: false
	}
	validateAndSubmit = (e,id) => {
		e.preventDefault();
		if (e.target.elements["author"].value === "") {
			this.setState({ nameError: true });
		}

		if (e.target.elements["body"].value === "") {
			this.setState({ msgError: true });
		}
		if (!this.state.nameError && !this.state.msgError){
			this.props.onSubmitComment(e,this.props.id);
		}
	}
	hideNameError = e => {
		if (e.target.value === "") {
			this.setState({ nameError: true });
		} else {
			this.setState({ nameError: false });
		}
	}
	hideMsgError = e => {
		if (e.target.value === "") {
			this.setState({ msgError: true });
		} else {
			this.setState({ msgError: false });
		}
	}
	render () {
		return(
			<div className="comment-form">
				<form onSubmit={(e) => {this.validateAndSubmit(e)}}>
					<div>
						<label htmlFor="author">Nickname:</label>
						<input type="text" name="author" onChange={e => this.hideNameError(e)} defaultValue={this.props.author}/>
						{this.state.nameError && (<div className="error-warning">Please name yourself.</div>)}
					</div>
					<div>
						<label htmlFor="author">Comment:</label>
						<input type="text" name="body" onChange={e => this.hideMsgError(e)} defaultValue={this.props.body}/>
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