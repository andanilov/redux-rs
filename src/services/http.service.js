import axios from 'axios';

const httpService = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});

export default httpService;
