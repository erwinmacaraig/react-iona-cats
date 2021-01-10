import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.thecatapi.com/v1',
    headers: {
        "x-api-key": 'DEMO-API-KEY',
        "Accept": 'application/json, text/plain, */*'
    }

});