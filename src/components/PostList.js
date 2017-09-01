import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initCategories, addPost, editPost, getAllPosts } from '../actions/';

class Post extends Component {
	render() {
		console.log('Post Props', this.props);
		const { posts=[] } = this.props.initState;
		const categoryName = this.props.name;
		return(
			<div className={`post-list posts-${categoryName}`}>
			{posts
	          .filter(({ category, deleted }) => category === categoryName && deleted === false )
	          .sort((a, b) => b.voteScore - a.voteScore )
	          .map(({ id, timestamp, title, body, author, category, voteScore}) => (
	              <div key={id} className={`post__container`}>
	                <div>{voteScore}</div>
	                <div>{title}</div>
	                <div>{author}</div>
	                <div>{timestamp}</div>
	              </div>
	            ))}
            </div>
		)
	}
}

function mapStateToProps ({ initState, post }) {
  return {
    initState,
    post
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    editPost: (data) => dispatch(editPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
