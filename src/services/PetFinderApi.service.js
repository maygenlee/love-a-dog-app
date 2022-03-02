// import React from 'react';
const axios = require("axios");
const { key, secret } = require("../assets/api/petfinder.config.json");

const PETFINDER_API = "https://api.petfinder.com/v2";

var isAuthTokenAttached = false;

var api = axios.create({
  baseURL: PETFINDER_API,
  headers: { "content-type": "application/json" },
});
console.log("pet finder api init");

function getDogById(id) {
  return api.get(`/animals/${id}`);
}

function getLotsOfDogs() {
  return api.get(`/animals?type=Dog&location=29412&distance=5`);
}

function getDogsByZipCode(zip) {
  return api.get(`/animals?type=Dog&location=${zip}&distance=10`);
}

function getNewToken() {
  const url = `${PETFINDER_API}/oauth2/token`;
  const data = `grant_type=client_credentials&client_id=${key}&client_secret=${secret}`;

  // console.log(new axios.AxiosRequestConfig())
  // using the 'axios' instance. Not the 'api' instance because the api
  console.log("getting token");
  return axios.post(url, data);
}

function updateAuthToken(token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  isAuthTokenAttached = true;
}

function isReady() {
  return isAuthTokenAttached;
}

function usePetFinderApi() {
  // if we have a token -> return this
  return {
    isReady,
    getDogById,
    getNewToken,
    updateAuthToken,
    getLotsOfDogs,
    getDogsByZipCode,
  };
}

export { usePetFinderApi };
