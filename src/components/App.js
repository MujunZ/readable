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
import TiPlus from 'react-icons/lib/ti/plus';

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
    ReadableAPI.getAllPosts().then((posts) => {
      let getCmtNumOfPosts = [];
      for(let p of posts){
          const getCmtNumOfPost = ReadableAPI.getCmtsOfPost(p.id).then((cmt) => {
              p.cmtNum = cmt.length;
              return p;
          })
          getCmtNumOfPosts.push(getCmtNumOfPost);
      }
      Promise.all(getCmtNumOfPosts).then((posts)=>{this.props.getAllPosts(posts)});
    })
  }
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
    window.location = `../post/${addPostVal.id}`
  }
  render() {
    const { categories=[], posts=[] } = this.props.initState;
    return (
      <BrowserRouter>
      <div>
        <Route exact path='/' render={() => (
          <main className='container'>
            <h1>Readable</h1>
            {categories.map(({ name }) => (
                <section
                  key={name}
                  className='category__container'
                  >
                  <div className='category__header'>
                    <h1>{name}</h1>
                    <Link to='/addPost' onClick={()=>this.setState({ postCategory: name })}><TiPlus /></Link>
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
              <PostForm onSubmitPost={this.addPost} option={this.state.postCategory}/>
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
    addPost: (data) => dispatch(addPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
