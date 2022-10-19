/* eslint-disable */
import { get } from 'lodash'
import { apiBase } from '../config'

// import success from './success.json'

// const getToken = (currentState) => {
//   const pureToken = get(currentState, ['auth', 'user', 'data', 'token'], '')
//   return `${pureToken}`
// }

function fetchData (endpoint, method, body, token = '') {
  return fetch(`${apiBase}/api/${endpoint}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      authorization: token
    },
    method,
    body: JSON.stringify(body),
})
.then(response => response.json().then(json => ({ json, response })))
.then(({ json, response }) => {
  if (!response.ok) {
    return Promise.reject(json)
  }
  return json
})
.then(
  response => response,
  error => error
)
}

export default function callApi(endpoint, method = 'get', body) {
  if (localStorage.token) {
    const token = JSON.parse(localStorage.token)
    return fetchData(endpoint, method, body, token)
  } else {
    return fetchData(endpoint, method, body)
  }
}

// const fetchWithTokenAdapter = (req) => {
//   var userData = JSON.parse(localStorage.getItem('reduxPersist:auth')).user.data.token
//   if (userData.user && userData.user.data && userData.user.data.token) {
//     var token = userData.user.data.token
//     const { endpoint } = req
//     const newHeaders = {
//       ...req.headers,
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       authorization: token
//     }
//     return fetch(endpoint, { ...req, headers: newHeaders }).then(res => res.json())
//   } else {

//   }
// }

// export const apiMiddlewareHook = createAPIMiddleware(fetchWithTokenAdapter)

export const authentication = {
  // submitLoginMock: () => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       return resolve(success)
  //     }, 1000)
  //   })
  // },
  submitLogin: (username, password) => {
    return fetch(`${apiBase}/api/public/auth/login`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      }
    ).then(response => response.json())
  },
  submitRegister: (username, email, password) => {
    return fetch(`${apiBase}/api/public/register`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      }
    ).then(response => response.json())
  }
}
