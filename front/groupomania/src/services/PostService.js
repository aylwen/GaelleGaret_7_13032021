import authHeader from '../authHeader';
const apiUrl = "http://localhost:3000/api"

const postService = {
  getAllPosts,
  getPostSingle,
  getComments,
  createComment,
  createPost,
  deleteComment,
  delete: _delete
};

function _delete(id) {
  const requestOptions = {
      method: 'DELETE',
      headers: authHeader()
  };

  return fetch(`${apiUrl}/posts/${id}`, requestOptions).then(handleResponse);
}

function deleteComment(commentId) {
  const requestOptions = {
      method: 'DELETE',
      headers: authHeader()
  };

  return fetch(`${apiUrl}/posts/comment/${commentId}`, requestOptions).then(handleResponse);
}

function getAllPosts() {
  const requestOptions = {
      method: 'GET',
      headers: authHeader()
  };

  return fetch(`${apiUrl}/posts`, requestOptions).then(handleResponse).then(
    posts => {
      return posts
    } 
  );
}

function getComments(id) {
  const requestOptions = {
      method: 'GET',
      headers: authHeader(),
  };

  return fetch(`${apiUrl}/posts/comments/${id}`, requestOptions).then(handleResponse).then(
    comments => {
        return comments
      });  
}

function getPostSingle(id) {
  const requestOptions = {
      method: 'GET',
      headers: authHeader()
  };

  return fetch(`${apiUrl}/posts/`+id, requestOptions).then(handleResponse).then(
    post => {
        return post
      });  
}

function createPost(image, post) {
  const form_data = new FormData();
  form_data.append("image", image)
  form_data.append("post", JSON.stringify(post))
  const requestOptions = {
      method: 'POST',
      headers: authHeader(),
      body: form_data
    }
  return fetch(`${apiUrl}/posts`, requestOptions).then(handleResponse);
}

function createComment(comment, postId) {
  const requestOptions = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(comment)
    }
  return fetch(`${apiUrl}/posts/comment/${postId}`, requestOptions).then(handleResponse);
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          if (response.status === 401) {
              // auto logout if 401 response returned from api
              logout();
              location.reload(true);
          }

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }

      return data;
  });
}

export default postService;