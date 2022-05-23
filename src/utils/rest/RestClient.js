import superagent from 'superagent';
import {authenticationService} from "../../services/AuthenticationService";
import {handleResponse} from "../../helpers/HandleResponse";

function get(path, opts) {
  return superagent
    .get(path)
    .set("Accept", "application/json")
    .set("x-api-key", process.env.REACT_APP_API_KEY)
    .set("x-user-id", authenticationService.currentUserValue.email)
    .auth(opts && opts.auth && authenticationService.currentUserValue.token, { type:'bearer' })
    .on('error', handleResponse);
}

function post(path, opts) {
  return superagent.post(path)
    .send(JSON.stringify(opts && opts.data))
    .set("Accept", "application/json")
    .set('Content-Type', 'application/json')
    .set("x-api-key", process.env.REACT_APP_API_KEY)
    .set("x-user-id", authenticationService.currentUserValue.email)
    .auth(opts && opts.auth && authenticationService.currentUserValue.token, { type:'bearer' })
    .on('error', handleResponse);
}

function put(path, opts) {
  return superagent.put(path)
    .send(JSON.stringify(opts && opts.data))
    .set("Accept", "application/json")
    .set('Content-Type', 'application/json')
    .set("x-api-key", process.env.REACT_APP_API_KEY)
    .set("x-user-id", authenticationService.currentUserValue.email)
    .auth(opts && opts.auth && authenticationService.currentUserValue.token, { type:'bearer' })
    .on('error', handleResponse);
}

export const restClient = {
  get,
  post,
  put,
}