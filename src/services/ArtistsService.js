import { restClient } from "../utils/rest/RestClient";

function getArtists(searchValue, callback) {
  const query = searchValue && { q: searchValue };
  restClient.get(`${process.env.REACT_APP_GATEWAY_URI}/songs-api/artists`, {auth: true, query})
  .then(res => {
    if (res && res.body && res.body.length !== 0) {
      callback(res.body);
    }
  }).catch(err => {
    console.log(err);
  });
}

function getArtist(id, callback) {
  restClient.get(`${process.env.REACT_APP_GATEWAY_URI}/songs-api/artists/${id}`, {auth: true})
  .then(res => {
    if (res && res.body && res.body.length !== 0) {
      callback(res.body);
    }
  }).catch(err => {
    console.log(err);
  });
}

function updateArtist(id, payload, callback) {
  restClient.put(`${process.env.REACT_APP_GATEWAY_URI}/songs-api/artists/${id}`, {auth: true, data: payload})
  .then(res => {
    if (res && res.body && res.body.length !== 0) {
      callback(res.body);
    }
  }).catch(err => {
    console.log(err);
  });
}

export const artistsService = {
  getArtist,
  getArtists,
  updateArtist
}