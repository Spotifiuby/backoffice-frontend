import { restClient } from "../utils/rest/RestClient";

function getUsers(callback) {
  restClient.get(`${process.env.REACT_APP_GATEWAY_URI}/users-api/users`, {auth: true})
  .then(res => {
    if (res && res.body && res.body.length && res.body.length !== 0) {
      callback(res.body);
    }
  }).catch(err => {
    console.log(err);
  });
}

function getUserByMail(email, callback) {
  restClient.get(`${process.env.REACT_APP_GATEWAY_URI}/users-api/users/${email}`, {auth: true})
  .then(res => {
    if (res && res.body && res.body.length !== 0) {
      callback(res.body);
    }
  }).catch(err => {
    console.log(err);
  });
}

function updateUser(email, payload, callback) {
  restClient.put(`${process.env.REACT_APP_GATEWAY_URI}/users-api/users/${email}`, {auth: true, data: {...payload, email}})
  .then(res => {
    if (res && res.body && res.body.length !== 0) {
      callback(res.body);
    }
  }).catch(err => {
    console.log(err);
  });
}

function createUser(payload, callback) {
  restClient.post(`${process.env.REACT_APP_GATEWAY_URI}/users-api/users`, {auth: true, data: payload})
  .then(res => {
    if (res && res.body && res.body.length !== 0) {
      callback(res.body);
    }
  }).catch(err => {
    console.log(err);
  });
}

export const usersService = {
  getUsers,
  getUserByMail,
  updateUser,
  createUser
}