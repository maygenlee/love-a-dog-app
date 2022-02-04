// import React from 'react';
const axios = require("axios");
const { key, secret } = require("../assets/api/petfinder.config.json");

const PETFINDER_API = "https://api.petfinder.com/v2";

var api = axios.create({
  baseURL: PETFINDER_API
});

getNewToken();

function usePetFinderApi() {
  return {
    getDogById,
    getNewToken,
  };
}

function getDogById(id) {
  return api.get(`/animals/${id}`);
}

function getNewToken() {
  const url = `${PETFINDER_API}/oauth2/token`;
  const data = `grant_type=client_credentials&client_id=${key}&client_secret=${secret}`;

  // console.log(new axios.AxiosRequestConfig())
  // using the 'axios' instance. Not the 'api' instance because the api
  axios
    .post(url, data)
    .then((res) => {
      updateAuthToken(res.data.access_token);
    })
    .catch((err) => {
      console.error(err, "error getting token");
    });
}

function updateAuthToken(token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export { usePetFinderApi };
