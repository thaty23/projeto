import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/",  
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use((tept) => {
    const token = localStorage.getItem('token')
    if (token) {
        tept.headers = {
            ...tept.headers,
            "Authorization": "Bearer " + token,
            "Access-Control-Allow-Origin": "*"
        }
    }
    return tept
});

api.interceptors.response.use((response) => {
    return response
});