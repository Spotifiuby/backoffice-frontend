import { restClient } from "../utils/rest/RestClient";

function getUsers(callback) {
  restClient.get(`${process.env.REACT_APP_GATEWAY_URI}/users-api/users`, {auth: true})
  .then(res => {
    if (res && res.body && res.body.length) {
      callback(res.body);
    }
  }).catch(err => {
    console.log(err);
  });
}

export const usersService = {
  getUsers
}