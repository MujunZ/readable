import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post.js';
import { Link } from 'react-router-dom';

class PostList extends Component {
	render() {
		console.log('PostList Props', this.props);
		const { posts=[] } = this.props.initState;
		const categoryName = this.props.name;
		return(
			<div className={`post-list posts-${categoryName}`}>
			{posts
	          .filter(({ category, deleted }) => category === categoryName && deleted === false )
	          .sort((a, b) => b.voteScore - a.voteScore )
	          .map(({ id, timestamp, title, body, author, category, voteScore}) => (
	          	<div key={id}>
	              <div className={`post__container`}>
	                <div>{voteScore}</div>
	                <Link to={`/post/${id}`}>{title}</Link>
	                <div>{author}</div>
	                <div>{timestamp}</div>
	              </div>
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

export default connect(mapStateToProps)(PostList);
