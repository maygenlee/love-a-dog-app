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
  addDogToSavedList: (id) => {
    return axios.put(`${URL}/dogs/savedList/${id}`);
  },
  renameDog: (dogName, id) => {
    return axios.put(`${URL}/dogs/savedList/dog/${id}`, { dogName });
  },
  addDogToLovedList: (dog) => {
    return axios.post(`${URL}/dogs`, dog);
  },
  deleteDogFromList: (id) => {
    return axios.delete(`${URL}/dogs/${id}`);
  },
};

function useApi() {
  return api;
}

export { useApi };
