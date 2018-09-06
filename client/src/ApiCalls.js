import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const request = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:4000';

const encode = encodeURIComponent;
const responseBody = res => res.body;
const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;

const requests = {
  del: url =>
    request.del(`${API_ROOT}${url}`).then(responseBody),
  get: url =>
    request.get(`${API_ROOT}${url}`).then(responseBody),
  put: (url, body) =>
    request.put(`${API_ROOT}${url}`, body).then(responseBody),
  post: (url, body) =>
    request.post(`${API_ROOT}${url}`, body).then(responseBody)
};

export const fetchUsers = ({query= '', page= 1, per_page= 20}) => {
    return fetch(`/api/search-github-users/?username=${query}&page=${page}&per_page=${per_page}`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
}

export const Player = {
    all: page =>
        requests.get(`/players?${limit(10, page)}`),
    create: player => 
        requests.post(`/players`, {player}),
    update: player => 
        requests.put(`/players/${player.id}`, {player}),
    delete: playerId => 
        requests.del(`/players/${playerId}`),
    show: playerId => 
        requests.get(`/players/${playerId}`)
};

export const User = {
    all: (page_limit, page) => 
      requests.get(`/users?${limit(page_limit, page)}`)
    ,
    create: player => 
        requests.post(`/users`, {player}),
    update: player => 
        requests.put(`/users/${player.id}`, {player}),
    delete: playerId => 
        requests.del(`/users/${playerId}`),
    show: playerId => 
        requests.get(`/users/${playerId}`) 
}


export const AdminApi = {
    uploadUserListFile: file => 
        // console.log('api call file', file);
        // var formData = new FormData();
        // formData.append('data-file', file);
        request.post('http://localhost:4000/upload')
        .attach('data-file', file)
        // .send('data-file', file)
        // .then(responseBody)
    
}