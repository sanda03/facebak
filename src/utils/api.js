import axios from "axios";
import Cookies from "js-cookie";

export const HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
};

export function post(url,body,token = 'token') {
    return axios.post(url,body,{
        headers:{
            ...HEADERS,
            Authorization: `Bearer ${Cookies.get(token) || ''}`
        }
    });
}

export function get(url,token = 'token') {
    return axios.get(url,{
        headers:{
            ...HEADERS,
            Authorization: `Bearer ${Cookies.get(token) || ''}` 
        }
    });
}