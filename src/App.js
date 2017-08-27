import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as ReadableAPI from './utils/readableAPI.js'

class App extends Component {
  componentDidMount() {
    ReadableAPI.getAllCategories().then((categories) => {
      console.log('getAllCategories',categories);
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
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
