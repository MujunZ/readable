import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TiDelete from 'react-icons/lib/ti/delete';
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up';
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down';
import TiEdit from 'react-icons/lib/ti/edit';
import { deletePost, votePost } from '../actions/';

class PostList extends Component {
	state = {
		sort: "byVote"
	}

	selectSort = e => {
		switch (e.target.value) {
			case "byVote":
				this.setState({ sort: "byVote" })
				break;
			case "byTime":
				this.setState({ sort: "byTime" })
				break;
			default:
				break;
		}
	}

	sortPosts = (a, b) => {
		switch (this.state.sort) {
			case "byVote":
				return b.voteScore - a.voteScore;
			case "byTime":
				return b.timestamp - a.timestamp;
			default:
				return b.voteScore - a.voteScore;
		}
	}

	voteUp = (id, voteScore) => {
		voteScore++;
		this.props.votePost({id, voteScore})
	}
	voteDown = (id, voteScore) => {
		voteScore--;
		this.props.votePost({id, voteScore})
	}
	
	render() {
		const { posts=[] } = this.props.post;
		const categoryName = this.props.name;
		return(
			<div className={`post-list posts-${categoryName}`}>
			<div className="sort-posts">
				Sort by
				<select onChange={ e => this.selectSort(e)}>
				  <option value="byVote">Hightest Score</option>
				  <option value="byTime">Latest</option>
				</select>
			</div>
			{posts
	          .filter(({ category, deleted }) => category === categoryName && deleted === false )
	          .sort((a,b) => this.sortPosts(a,b))
	          .map(({ id, cmt, timestamp, title, body, author, category, voteScore}) => {
	          	let time = new Date(timestamp);
	          	time = time.toUTCString();
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
		                <div className="title">
		                	<Link to={`/${category}/post/${id}`}>{title}</Link>
		                </div>
		                <div className="author">{author}</div>
		                <div className="time">{time}</div>
		                <div className="cmt-num">{cmt.length} Comments</div>
		                <Link
											to={{
												pathname: `/${category}/post/${id}`,
  											hash: '#edit'
											}}
										><TiEdit/></Link>
		                <div onClick={()=>{this.props.deletePost(id)}} className="delete"><TiDelete /></div>
		              </div>
		          	</div>
	            )}
	          )}
            </div>
		)
	}
}

function mapStateToProps ({ category, post }) {
  return {
    category,
    post
  }
}

function mapDispatchToProps (dispatch) {
  return {
		deletePost: (data) => dispatch(deletePost(data)),
		votePost: (data) => dispatch(votePost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
