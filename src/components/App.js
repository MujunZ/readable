import React, { Component } from 'react';
import '../App.css';
import * as ReadableAPI from '../utils/readableAPI';
import { connect } from 'react-redux';
import { addPost, editPost } from '../actions/';

class App extends Component {
  state = {
    categories: [],
    posts: [],
  }
  componentDidMount() {
    ReadableAPI.getAllCategories().then((categories) => {
      console.log('getAllCategories',categories);
      this.setState({ categories });
    })
    ReadableAPI.getPostsOfCategory('react').then((post) => {
      console.log('getPostsOfCategory',post);
    })
    ReadableAPI.getAllPosts().then((posts) => {
      console.log('getAllPosts',posts);
    })
    ReadableAPI.getPostById('8xf0y6ziyjabvozdd253nd').then((post) => {
      console.log('getPostById',post);
    })
    ReadableAPI.getCmtsOfPost('8xf0y6ziyjabvozdd253nd').then((cmt) => {
      console.log('getCmtsOfPost',cmt);
    })
    ReadableAPI.getCmtsById('894tuq4ut84ut8v4t8wun89g').then((cmt) => {
      console.log('getCmtsById',cmt);
    })
  }
  render() {
    console.log('Props', this.props)
    return (
      <main className='container'>
        {this.state.categories.map(({ name }) => (
            <section
              key={name}
              className='category__container'
              >{name}</section>
          ))}
      </main>
    );
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    editPost: (data) => dispatch(editPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
