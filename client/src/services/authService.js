import axios from 'axios';

const API_URL = 'http://localhost:6001/auth'; // Replace with your API URL

export const registerUser = (firstname, lastname, number, password) => {
  return axios.post(`${API_URL}/register`, {
    firstname:firstname,
    lastname:lastname,
    number: number,
    password:password
  });
};

export const loginUser = (number, password) => {
  return axios.post(`${API_URL}/login`, {
    number: number,
    password :  password
    
  });
};
export const logoutUser = (user) => {
  return axios.post(`${API_URL}/logout`, {
   ...user
    
  });
};