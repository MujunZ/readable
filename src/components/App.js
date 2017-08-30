import React, { Component } from 'react';
import '../App.css';
import * as ReadableAPI from '../utils/readableAPI';
import { connect } from 'react-redux';
import { initCategories, addPost, editPost } from '../actions/';

class App extends Component {
  state = {
    categories: [],
    posts: [],
  }
  componentDidMount() {
    ReadableAPI.getAllCategories().then((categories) => {
      console.log('getAllCategories',categories);
      this.props.initCategories({categories});
      this.setState({ categories });
    })
    // ReadableAPI.getPostsOfCategory('react').then((post) => {
    //   console.log('getPostsOfCategory',post);
    // })
    // ReadableAPI.getAllPosts().then((posts) => {
    //   console.log('getAllPosts',posts);
    //   this.setState({ posts });
    // })
    // ReadableAPI.getPostById('8xf0y6ziyjabvozdd253nd').then((post) => {
    //   console.log('getPostById',post);
    // })
    // ReadableAPI.getCmtsOfPost('8xf0y6ziyjabvozdd253nd').then((cmt) => {
    //   console.log('getCmtsOfPost',cmt);
    // })
    // ReadableAPI.getCmtsById('894tuq4ut84ut8v4t8wun89g').then((cmt) => {
    //   console.log('getCmtsById',cmt);
    // })
  }

  // postElements ( categoryName ) {
  //   let { title, author, voteScore, timestamp }
  //         = this.state.posts
  //           .filter(({ category, deleted }) => category === categoryName && deleted === false);
  //   return { title, author, voteScore, timestamp }
  // }
  render() {
    console.log('Props', this.props);
    const { categories=[] } = this.props.category;
    return (
        <main className='container'>
          {categories.map(({ name }) => (
              <section
                key={name}
                className='category__container'
                >
                <h1>{name}</h1>
              </section>
            ))}
        }
        </main>);
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
    initCategories: (data) => dispatch(initCategories(data)),
    addPost: (data) => dispatch(addPost(data)),
    editPost: (data) => dispatch(editPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
