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

export const updateIncome = (id, data) => {
    console.log(data)
    return axios.post(host + "newIncome/" + id, data, {})
    .then(res => res.data)
    .catch(err => err.response)
}

export const updateOutcome = (id, data) => {
    console.log(data)
    return axios.post(host + "newOutcome/" + id, data, {})
    .then(res => res.data)
    .catch(err => err.response)
}

export const newResidence = (residence) => {
    return axios.post(host + "new-residence", residence, {})
    .then(res => res.data)
    .catch(err => err.response)
}