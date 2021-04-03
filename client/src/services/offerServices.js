import api from './api';

export const getAll = () => {
    return fetch(`${api}offers/`)
        .then(res => res.json())
        .catch(err => console.log(err));
};

export const create = () => {
    return fetch(`${api}offers/`)
        .then(res => res.json())
        .catch(err => console.log(err));
}