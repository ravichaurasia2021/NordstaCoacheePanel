import React from 'react';
import Axios from 'axios';

const API_URL = process.env.API_URL;
//APP_URL for api front url defined
const AxiosInstance = Axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        //  'Content-Type': 'application/json',
        //  'Accept':'application/json',
        //  "Access-Control-Allow-Origin": "*",
        //  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    },
});
//here axios instance create


const setAuthorizationToken = (token) => {
    AxiosInstance.defaults.withCredentials = token ? true : false;
};

//set token for authorization

async function postMethod(endpoint, data) {
    return new Promise(resolve => {
        var config = {
            method: 'post',
            url: endpoint,
            data: data
        };
        AxiosInstance(config).then(response => {
            resolve(response.data);
        }, error => {
            if (error?.response?.data) {
                resolve(error?.response?.data ? error?.response?.data : { success: false, message: 'failed!' });
            } else {
                resolve({ success: false, message: 'failed!' });
            }
        })
    });
};
//postmethod create function

async function getMethod(path, params = {}) {
    return new Promise(resolve => {
        var config = {
            method: 'get',
            url: path,
            params: params
        };
        AxiosInstance(config).then(response => {
            resolve(response.data)
        }, error => {
            if (!error.response || error.code === 'ECONNABORTED') {
                resolve({ success: false, message: 'error!' })
            } else {
                resolve(error?.response?.data ? error?.response?.data : { success: false, message: 'failed!' });
            }
        })
    })
}
//getmethod create function

async function putMethod(endpoint, data) {
    return new Promise(resolve => {
        var config = {
            credentials: 'include',
            method: 'put',
            url: endpoint,
            data: data,
        };
        AxiosInstance(config).then(response => {
            resolve(response.data)
        }, error => {
            if (!error.response || error.code === 'ECONNABORTED') {
                resolve({ success: false, message: 'error!' })
            } else {
                resolve(error?.response?.data ? error?.response?.data : { success: false, message: 'failed!' });
            }
        })
    })
}

async function deleteMethod(endpoint, data) {
    return new Promise(resolve => {
        var config = {
            method: 'delete',
            url: endpoint
        };
        AxiosInstance(config).then(response => {
            resolve(response.data)
        }, error => {
            resolve(error.response.data)
        })
    })
}
//putmethod create function
export { postMethod, setAuthorizationToken, getMethod, putMethod, API_URL, deleteMethod };
