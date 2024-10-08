const login = ({ email, password }) => {
  const request = new Request(`${process.env.REACT_APP_AUTH_ENDPOINT}/auth/signin`, {
    method: 'POST',
    body: JSON.stringify({
      formFields: [{
        "id": "email",
        "value": email,
      }, {
        "id": "password",
        "value": password,
      }]
    }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  });

  return fetch(request)
  .then(response => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText);
    }

    localStorage.setItem('st', response.headers.get("st-access-token"));
    console.log(response.headers);
    return response.json();
  })
  .then(auth => {
    localStorage.setItem('auth', JSON.stringify(auth));
  })
  .catch(() => {
    throw new Error('Network error')
  });
}

const signup = ({ email, password }) => {
  const request = new Request(`${process.env.REACT_APP_AUTH_ENDPOINT}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify({
      formFields: [{
        "id": "email",
        "value": email,
      }, {
        "id": "password",
        "value": password,
      }]
    }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  });

  return fetch(request)
  .then(response => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText);
    }
    return response.json();
  })
  .then(auth => {
    localStorage.setItem('auth', JSON.stringify(auth));
  })
  .catch(() => {
    throw new Error('Network error')
  });
}

const checkAuth = () => {
  const raw = localStorage.getItem('auth')
  const auth = JSON.parse(raw)

  if (auth === null) {
    return Promise.reject()
  }

  const { status } = auth;
  return status === "OK" ? Promise.resolve() : Promise.reject()
}

const logout = () => {
  localStorage.removeItem('auth');
  return Promise.resolve();
}

const checkError = (error) => {
  const status = error.status;
  if (status === 401 || status === 403) {
    localStorage.removeItem('auth');
    return Promise.reject();
  }
  // other error code (404, 500, etc): no need to log out
  return Promise.resolve();
}

const getIdentity = () => {
  const raw = localStorage.getItem('auth');
  const auth = JSON.parse(raw);

  if (auth === null) {
    return Promise.reject();
  }

  const { status } = auth;

  if (status !== "OK") {
    return Promise.reject();
  }

  const { user: { id, email }} = auth;
  return Promise.resolve({ id, user: email });
}

const resetPassword = ({ email }) => {
  const request = new Request(`${process.env.REACT_APP_AUTH_ENDPOINT}/auth/user/password/reset/token`, {
    method: 'POST',
    body: JSON.stringify({
      formFields: [{
        "id": "email",
        "value": email,
      }]
    }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  });

  return fetch(request)
  .then(response => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText);
    }
    return response.json();
  })
  .catch(() => {
    throw new Error('Network error')
  });
}

const resetPasswordToken = ({ password, token }) => {
  const request = new Request(`${process.env.REACT_APP_AUTH_ENDPOINT}/auth/user/password/reset`, {
    method: 'POST',
    body: JSON.stringify({
      method: "token",
      formFields: [{
        "id": "password",
        "value": password,
      }],
      token,
    }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  });

  return fetch(request)
  .then(response => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText);
    }
    return response.json();
  })
  .catch(() => {
    throw new Error('Network error')
  });
}

const authProvider = {
  login,
  signup,
  logout,
  checkAuth,
  checkError,
  getIdentity,
  getPermissions: () => Promise.resolve(''),
};

export default authProvider;
export {
  login,
  signup,
  resetPassword,
  resetPasswordToken,
  checkAuth,
  getIdentity,
  logout,
};
