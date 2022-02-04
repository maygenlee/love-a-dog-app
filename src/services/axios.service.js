const axios = require("axios");
const URL = `http://localhost:8080/api`;

exports.login = (user) => {
  return axios.post(`${URL}/users/login`, user);
};

exports.createNewUser = (user) => {
  return axios.post(`${URL}/users`, user);
};

const updateUser = (user) => {
  return axios.put(`${URL}/users/${user.id}`, user);
};

exports.getSavedListByUserId = (userId) => {
  return axios.get(`${URL}/dogs/savedList/${userId}`);
};

exports.getLovedListByUserId = (userId) => {
  return axios.get(`${URL}/dogs/lovedList/${userId}`);
};
