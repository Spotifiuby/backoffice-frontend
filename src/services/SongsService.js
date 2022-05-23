import { restClient } from "../utils/rest/RestClient";

function getSongs(callback) {
  restClient.get(`${process.env.REACT_APP_GATEWAY_URI}/songs-api/songs`, {auth: true})
  .then(res => {
    if (res && res.body && res.body.length !== 0) {
      callback(res.body);
    }
  }).catch(err => {
    console.log(err);
  });
}

function getSong(id, callback) {
  restClient.get(`${process.env.REACT_APP_GATEWAY_URI}/songs-api/songs/${id}`, {auth: true})
  .then(res => {
    if (res && res.body && res.body.length !== 0) {
      callback(res.body);
    }
  }).catch(err => {
    console.log(err);
  });
}

function updateSong(id, payload, callback) {
  restClient.put(`${process.env.REACT_APP_GATEWAY_URI}/songs-api/songs/${id}`, {auth: true, data: payload})
  .then(res => {
    if (res && res.body && res.body.length !== 0) {
      callback(res.body);
    }
  }).catch(err => {
    console.log(err);
  });
}

export const songsService = {
  getSong,
  getSongs,
  updateSong
}