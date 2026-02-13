import fetch from "node-fetch"

import API_URL from "./apiUrl.js"

const SIGN_IN = `
mutation SignIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password)
}
`

const SIGN_UP = `
mutation SignUp($username: String!, $password: String!) {
  signUp(username: $username, password: $password)
}`



export function signIn(username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_IN,
      variables: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.signIn
    })
    .catch(error => {
      throw error
    })
}

export function signUp(username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_UP,
      variables: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.signUp
    })
    .catch(error => {
      throw error
    })
}


const DELETE_USER = `
mutation DeleteUser($username: String!) {
  deleteUsers(where: { username: $username }) {
    nodesDeleted
  }
}
`;

export function deleteUser(username, token) {
  console.log('Appel de deleteUser avec:', { username, token }); // Log pour vérifier les paramètres
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      query: DELETE_USER,
      variables: {
        username: username
      }
    })
  })
    .then(response => {
      console.log('Réponse de l\'API:', response); // Log pour vérifier la réponse
      return response.json();
    })
    .then(jsonResponse => {
      console.log('Réponse JSON:', jsonResponse); // Log pour vérifier la réponse JSON
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.deleteUsers.nodesDeleted;
    })
    .catch(error => {
      console.error('Erreur dans deleteUser:', error); // Log pour vérifier les erreurs
      throw error;
    });
}

