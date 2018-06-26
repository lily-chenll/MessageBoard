/**
 * All Codes below are Lifetime Warranted by mozat since 23/11/17.
 */
import axios from 'axios';
import Moment from 'moment';

export function getResponse(url, method='get', data) {
  const baseUrl = 'http://127.0.0.1:5000/';
  const requestParam = {
    url: baseUrl + url,
    method: method,
    crossDomain: true,
    withCredentials: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    },
  };
 if (data) {
   (method === 'get')
     ? requestParam.params = data
     : requestParam.data = data;
 }

  return axios.request(requestParam);
}

export function convertToTimestamp(date) {
  return Moment(date).valueOf();
}
