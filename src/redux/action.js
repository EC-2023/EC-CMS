export const userPostFetch = user => {
    return dispatch => {
      return fetch("https://ec-api.herokuapp.com/api/v1/users", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({user})
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
          } else {
            localStorage.setItem("token", data.jwt)
            dispatch(loginUser(data.user))
          }
        })
    }
  }
  
  const loginUser = userObj => ({
      type: 'LOGIN_USER',
      payload: userObj
  })

  export const userLoginFetch = user => {
    return dispatch => {
      return fetch("https://ec-api.herokuapp.com/api/v1/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(user)
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
          } else {
            localStorage.setItem("token", data.jwt)
            dispatch(loginUser(data.user))
          }
        })
    }
  }

  export const getProfileFetch = () => {
    return dispatch => {
      const token = localStorage.token;
      if (token) {
        return fetch("http://localhost:3000/api/v1/profile", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
          .then(resp => resp.json())
          .then(data => {
            if (data.message) {
              localStorage.removeItem("token")
            } else {
              dispatch(loginUser(data.user))
            }
          })
      }
    }
  }