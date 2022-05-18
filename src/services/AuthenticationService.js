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

function login(username, password) {
  return superagent.post(`${process.env.REACT_APP_SERVER_BASE_URI}/api/login`)
    .send(JSON.stringify({ email: username, password }))
    .set('Content-Type', 'application/json')
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user.body));
      currentUserSubject.next(user.body);

      return user;
    });
}

function loginFirebase(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    currentUserSubject.next(user);

    return user;
}

async function isValidSession() {
  return superagent.post(`${process.env.REACT_APP_SERVER_BASE_URI}/api/validate-session`)
    .send(JSON.stringify({ email: currentUserSubject.value.email }))
    .auth(currentUserSubject.value.token, { type:'bearer' })
    .set('Content-Type', 'application/json');
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
  logoutFirebase();
  window.location.reload();
}