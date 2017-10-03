import React, { Component } from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import '../App.css';
import { connect } from 'react-redux';
import { fetchAllCategories, fetchAllPosts, addPost } from '../actions/';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Post from './Post.js';
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
    this.props.fetchAllCategories();
    this.props.fetchAllPosts();
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
  breadcrumbs = (match) => {
    const { category, post } = match.params;
    return (
      <div >
        <Link to="/">Home</Link>
        <Link to={`/${category}`}>>{category}</Link>
        <Link to={`/${category}/${post}`}>{post && (`>${post}`)}</Link>
      </div>
    )
  }
  CategoryList = (name) => (
      <section
        key={name}
        className='category__container'
        >
        <div className='category__header'>
        <Link to={`/${name}`}>
            <h1>{name}</h1>
        </Link>
          <Link to='/addPost' onClick={()=>this.setState({ postCategory: name })}><TiPlus /></Link>
        </div>
        <PostList name={name}/>
      </section>
  )
  render() {
    const { categories=[] } = this.props.category;
    const { posts=[] } = this.props.post;
    return (
      <BrowserRouter>
      <div>
        <Route path="/:category/:post?" render={({ match }) => this.breadcrumbs(match)}/>
        <Route exact path='/' render={() => (
          <main className='container'>
            <h1>Readable</h1>
            {categories.map(({ name }) => this.CategoryList(name))}
          </main>
        )}/>
        <div>
          {posts.map(({ id, category }) => (
            <Route key={id} path={`/${category}/post/${id}`} render={({ match })=>(
              <Post id={id} match={match}/>
            )}/>
          ))}
        </div>
        <Route path='/addPost' render={() => (
              <PostForm onSubmitPost={this.addPost} option={this.state.postCategory}/>
            )
          }
        />
        <Route exact path="/:category" render={({ match }) => {
            const name = match.params.category;
            return this.CategoryList(name);
        }}/> 
      </div>
      </BrowserRouter>
    );
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
    fetchAllCategories: () => dispatch(fetchAllCategories()),
    fetchAllPosts: (data) => dispatch(fetchAllPosts(data)),
    addPost: (data) => dispatch(addPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
