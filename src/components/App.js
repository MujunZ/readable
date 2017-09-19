import React, { Component } from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import '../App.css';
import * as ReadableAPI from '../utils/readableAPI';
import { connect } from 'react-redux';
import { initCategories, addPost, editPost, getAllPosts } from '../actions/';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Post from './Post.js';
import Modal from 'react-modal';
import serialize from 'form-serialize';
import uniqid from 'uniqid';

class App extends Component {
  state = {
    showAddPostForm: false,
    addPostId: null,
    postCategory: null
  }
  componentDidMount() {
    ReadableAPI.getAllCategories().then((categories) => {
      this.props.initCategories(categories);
    })
    // ReadableAPI.getPostsOfCategory('react').then((post) => {
    //   console.log('getPostsOfCategory',post);
    // })
    ReadableAPI.getAllPosts().then((posts) => {
      this.props.getAllPosts(posts)
    })
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

  //openAddPostForm = () => this.setState(() => ({showAddPostForm: true}));
  //clossAddPostForm = () => this.setState(() => ({showAddPostForm: false}));
  addPost = (e, category) => {
    e.preventDefault();
    let addPostVal = serialize(e.target, { hash: true });
    addPostVal = {
      ...addPostVal,
      timestamp: Date.now(),
      id: uniqid(),
      category
    }
    this.props.addPost(addPostVal);
    this.setState({});
    e.target.reset();
    window.location = "../"
  }
  render() {
    console.log('Props', this.props);
    const { categories=[], posts=[] } = this.props.initState;
    return (
      <BrowserRouter>
      <div>
        <Route exact path='/' render={() => (
          <main className='container'>
            {categories.map(({ name }) => (
                <section
                  key={name}
                  className='category__container'
                  >
                  <div className='category__header'>
                    <h1>{name}</h1>
                    <Link to='/addPost' onClick={()=>this.setState({ postCategory: name })}>+</Link>
                  </div>
                  <PostList name={name}/>
                </section>
            ))}
          </main>
        )}/>
        <div>
          {posts.map(({ id }) => (
            <Route key={id} path={`/post/${id}`} render={()=>(
              <Post id={id} />
            )}/>
          ))}
        </div>
        <Route path='/addPost' render={() => (
              <PostForm onSubmitPost={this.addPost} category={this.state.postCategory}/>
            )
          }
        />
      </div>
      </BrowserRouter>
    );
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
    initCategories: (data) => dispatch(initCategories(data)),
    getAllPosts: (data) => dispatch(getAllPosts(data)),
    addPost: (data) => dispatch(addPost(data)),
    editPost: (data) => dispatch(editPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
