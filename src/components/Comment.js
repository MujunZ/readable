import React, { Component } from 'react';
import { connect } from 'react-redux';

class Post extends Component {
	render () {
	const { comments=[] } = this.props.comment;
		return(
			<section>
				<h1>Comments</h1>
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
			</section>
		)
	}
}

function mapStateToProps ({ comment }) {
  return {
    comment
  }
}

export default connect(mapStateToProps)(Post);