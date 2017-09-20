const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:5001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllCategories = () =>
	fetch(`${api}/categories`, { headers })
	.then(res => res.json())
	.then(data => data.categories)

export const getPostsOfCategory = (category) =>
	fetch(`${api}/${category}/posts`, { headers })
	.then(res => res.json())

export const getAllPosts = () =>
	fetch(`${api}/posts`, { headers })
	.then(res => res.json())

export const getPostById = (id) =>
	fetch(`${api}/posts/${id}`, { headers })
	.then(res => res.json())

export const getCmtsOfPost = (id) =>
	fetch(`${api}/posts/${id}/comments`, { headers })
	.then(res => res.json())

export const getCmtsById = (id) =>
	fetch(`${api}/comments/${id}`, { headers })
	.then(res => res.json())

export const addPost = (post) =>
	fetch(`${api}/posts`, {
		method: 'POST',
	    headers: {
	      ...headers,
	      'Content-Type': 'application/json'
		},
		body: JSON.stringify(post)
	}).then(res => res.json())

export const addComment = (cmt) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cmt)
  }).then(res => res.json())

export const deleteComment = (cmtId) =>
fetch(`${api}/comments/${cmtId}`, { method: 'DELETE', headers })
  .then(res => res.json())
  .then(data => data.comments)

export const deletePost = (postId) =>
fetch(`${api}/posts/${postId}`, { method: 'DELETE', headers })

export const voteComment = (cmtId, option) =>
fetch(`${api}/comments/${cmtId}`, {
  method: 'POST',
  headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
  body: JSON.stringify({ option })
}).then(res => res.json())
.then(data => data.comments)

export const votePost = (postId, option) =>
fetch(`${api}/posts/${postId}`, {
  method: 'POST',
  headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
  body: JSON.stringify({ option })
}).then(res => res.json())
.then(data => data.comments)

export const editComment = (cmt) =>
  fetch(`${api}/comments/${cmt.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cmt)
 }).then(res => res.json())

export const editPost = (p) =>
  fetch(`${api}/posts/${p.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(p)
 }).then(res => res.json())