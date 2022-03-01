const axios = require("axios");
const URL = `http://localhost:8080/api`;

const api = {
  login: (user) => {
    return axios.post(`${URL}/login`, user);
  },
  getUserByEmail: (email) => {
    return axios.get(`${URL}/user/${email}`);
  },
  createNewUser: (user) => {
    return axios.post(`${URL}/signup`, user);
  },
  updateUser: (user) => {
    return axios.put(`${URL}/users/${user.id}`, user);
  },
  getLovedDogsByUserId: (userId) => {
    return axios.get(`${URL}/dogs/lovedList/${userId}`);
  },
  addDogToLovedList: (dog) => {
    return axios.post(`${URL}/dogs`, dog);
  },
};

function useApi() {
  return api;
}

export { useApi };
