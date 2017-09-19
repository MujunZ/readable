import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PostForm extends Component {
	state = {
		nameError: false,
		msgError: false,
		titleError: false
	}
	validateAndSubmit = (e,id) => {
		e.preventDefault();
		let { nameError, msgError, titleError } = this.state;

		if (e.target.elements["author"].value === "") {
			nameError = true;
		}

		if (e.target.elements["body"].value === "") {
			msgError = true;
		}

		if (e.target.elements["title"].value === "") {
			titleError = true
		}

		if (!nameError && !msgError && !titleError){
			this.props.onSubmitPost(e,this.props.category);
		}

		this.setState({ nameError, msgError, titleError });
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
	hideTitleError = e => {
		if (e.target.value === "") {
			this.setState({ titleError: true });
		} else {
			this.setState({ titleError: false });
		}
	}
	render () {
		return (
			<div className="comment-form">
				<form onSubmit={(e) => {this.validateAndSubmit(e)}}>
					<div>
						<label htmlFor="title">Title:</label>
						<input type="text" name="title" onChange={e => this.hideTitleError(e)} defaultValue={this.props.author}/>
						{this.state.titleError && (<div className="error-warning">Please create a title</div>)}
					</div>
					<div>
						<label htmlFor="author">Nickname:</label>
						<input type="text" name="author" onChange={e => this.hideNameError(e)} defaultValue={this.props.author}/>
						{this.state.nameError && (<div className="error-warning">Please name yourself.</div>)}
					</div>
					<div>
						<label htmlFor="body">Post:</label>
						<input type="text" name="body" onChange={e => this.hideMsgError(e)} defaultValue={this.props.body}/>
						{this.state.msgError && (<div className="error-warning">Please say something.</div>)}
					</div>
					<button>Submit</button>
					<Link to="/">Cancel</Link>
				</form>
			</div>
		)
	}
}

export default PostForm;