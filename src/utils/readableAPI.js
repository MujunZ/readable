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

export const getPost = (category) =>
	fetch(`${api}/${category}/posts`, { headers })
	.then(res => res.json())