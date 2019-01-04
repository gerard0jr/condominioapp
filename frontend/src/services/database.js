import axios from 'axios'
const host = 'http://localhost:3000/db/'

export const getResidences = () => {
    return axios.get(host + "residences")
    .then(res => res.data)
    .catch(err => err.response)
}

export const getResidence = (id) => {
    return axios.get(host + "residence/" + id)
    .then(res => res.data)
    .catch(err => err.response)
}

export const updateData = (id, data) => {
    return axios.post(host + "newData/" + id, data, {})
    .then(res => res.data)
    .catch(err => err.response)
}

export const newResidence = (residence) => {
    return axios.post(host + "new-residence", residence, {})
    .then(res => res.data)
    .catch(err => err.response)
}