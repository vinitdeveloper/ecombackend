/*
Export test variable
*/
// export const API_URL = "http://localhost:7070/";

import axios from 'axios';
axios.defaults.baseURL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:7070/' : 'http://208.109.15.122:7070/';

export const API_URL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:7070/' : 'http://208.109.15.122:7070/';;

