
import { ToastContainer, toast } from "react-toastify";
let API_HOST = process.env.REACT_APP_API_HOST;
export const postFetch = async (url, body) => {
    let accessToken = JSON.parse(localStorage.getItem("userInfo")).accessToken;
    try {
        let dataFetch = await fetch(`${API_HOST}${url}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json;charset=utf-8",
                'x-access-token': accessToken
            },
            body: JSON.stringify(body)
        });
        let data = await dataFetch.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const putFetch = async (url, body) => {
    let accessToken = JSON.parse(localStorage.getItem("userInfo")).accessToken;
    let dataFetch = await fetch(`${API_HOST}${url}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json;charset=utf-8",
            'x-access-token': accessToken
        },
        body: JSON.stringify(body)
    });
    let data = await dataFetch.json();
    console.log(data);
    return data;
}

export const getFetch = async (url) => {
    let accessToken = JSON.parse(localStorage.getItem("userInfo")).accessToken;
    let dataFetch = await fetch(`${API_HOST}${url}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json;charset=utf-8",
            'x-access-token': accessToken
        },
    });
    let data = await dataFetch.json();
    return data;
}

export const deleteFetch = async (url, body) => {
    try {
        let accessToken = JSON.parse(localStorage.getItem("userInfo")).accessToken;
        let dataFetch = await fetch(`${API_HOST}${url}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json;charset=utf-8",
                'x-access-token': accessToken
            },
            body: JSON.stringify(body)
        });
        let data = await dataFetch.json();
        return data;
    } catch (error) {
        throw Error(error)
    }
}