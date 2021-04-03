import api from './api';

export const login = (email, password, role) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
    };
    return fetch(`${api}users/login`, requestOptions)
        .then(res => res.json())
        .catch(err => console.log(err));
};

export const logout = () => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${api}users/logout`, requestOptions)
        .then(res => res.json())
        .catch(err => console.log(err));
};

export const register = (address, email, username, password, role) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, email, username, password, role })
    };
    return fetch(`${api}users/register`, requestOptions)
        .then(res => res.json())
        .catch(err => console.log(err));
};