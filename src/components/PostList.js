import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TiDelete from 'react-icons/lib/ti/delete';
import { deletePost } from '../actions/';

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
	          .map(({ id, timestamp, title, body, author, category, voteScore}) => {
	          	let time = new Date(timestamp);
	          	time = time.toUTCString();
	          	return(
		          	<div key={id}>
		              <div className="card__head">
		                <div>{voteScore} Liked</div>
		                <Link to={`/post/${id}`}>{title}</Link>
		                <div>{author}</div>
		                <div>{time}</div>
		                <div onClick={()=>{this.props.deletePost(id)}}><TiDelete /></div>
		              </div>
		          	</div>
	            )}
	          )}
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
    deletePost: (data) => dispatch(deletePost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
