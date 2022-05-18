import { restClient } from "../utils/rest/RestClient";

function getSongs(callback) {
  restClient.get(`${process.env.REACT_APP_GATEWAY_URI}/songs-api/songs`, {auth: true})
  .then(res => {
    if (res && res.body && res.body.length) {
      callback(res.body);
    }
  }).catch(err => {
    console.log(err);
  });
}

export const songsService = {
  getSongs
}