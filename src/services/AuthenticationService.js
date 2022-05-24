import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../helpers/HandleResponse';
import superagent from 'superagent';
import { logoutFirebase } from "../firebase";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
  login,
  logout,
  isValidSession,
  loginFirebase,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue () { return currentUserSubject.value }
};

const storageName = "currentUser";

function setItemToStorage(body) {
  localStorage.setItem(storageName, JSON.stringify(body));
}

function login(username, password) {
  return superagent.post(`${process.env.REACT_APP_SERVER_BASE_URI}/api/login`)
    .send(JSON.stringify({ email: username, password }))
    .set('Content-Type', 'application/json')
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      setItemToStorage(user.body);
      currentUserSubject.next(user.body);

      return user;
    });
}

function loginFirebase(user) {
  setItemToStorage(user);
  currentUserSubject.next(user);

  return isValidSession();
}

async function isValidSession() {
  return superagent.get(`${process.env.REACT_APP_GATEWAY_URI}/users-api/users/${currentUserSubject.value.email}`)
    .send(JSON.stringify({ email: currentUserSubject.value.email }))
    .auth(currentUserSubject.value.token, { type:'bearer' })
    .set("x-api-key", process.env.REACT_APP_API_KEY)
    .set('Content-Type', 'application/json')
    .then(user => {
      if (user.body.user_type !== 'admin') {
        logoutFirebase();
        return;
      }
      setItemToStorage({...currentUserSubject.value, ...user.body});
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
  logoutFirebase();
  window.location.reload();
}