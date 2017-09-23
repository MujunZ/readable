import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PostForm extends Component {
	state = {
		nameError: false,
		msgError: false,
		titleError: false
	}
	validateAndSubmit = (e,option) => {
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
			this.props.onSubmitPost(e,option);
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
		let option = this.props.option;
		let toLink = "";
		if(window.location.href.indexOf("addPost") > -1) {
			toLink = "/";
		} else {
			toLink = window.location;
		}
		return (
			<div className="post-form">
				<form onSubmit={(e) => {this.validateAndSubmit(e, option)}}>
					<div className="post-form__title">
						<label htmlFor="title" className="post-form__title-label">Title:</label>
						<input type="text" name="title" onChange={e => this.hideTitleError(e)} defaultValue={this.props.title} className="post-form__title-input"/>
						{this.state.titleError && (<div className="error-warning">Please create a title</div>)}
					</div>
					<div className="post-form__author">
						<label htmlFor="author" className="post-form__author-label">Nickname:</label>
						<input type="text" name="author" onChange={e => this.hideNameError(e)} defaultValue={this.props.author} className="post-form__author-input"/>
						{this.state.nameError && (<div className="error-warning">Please name yourself.</div>)}
					</div>
					<div className="post-form__body">
						<label htmlFor="body" className="post-form__body-label">Post:</label>
						<textarea type="text" name="body" onChange={e => this.hideMsgError(e)} defaultValue={this.props.body} className="post-form__body-input"/>
						{this.state.msgError && (<div className="error-warning">Please say something.</div>)}
					</div>
					<div className="post-form__btn-container">
						<button>Submit</button>
						<Link to={toLink} onClick={this.props.onCancel}>Cancel</Link>
					</div>
				</form>
			</div>
		)
	}
}

export default PostForm;