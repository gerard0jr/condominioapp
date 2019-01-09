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

export const updateIncome = (id, income) => {
    return axios.post(host + "newIncome/" + id, income, {})
    .then(res => res.data)
    .catch(err => err.response)
}

export const updateOutcome = (id, outcome) => {
    return axios.post(host + "newOutcome/" + id, outcome, {})
    .then(res => res.data)
    .catch(err => err.response)
}

export const newResidence = (residence) => {
    return axios.post(host + "new-residence", residence, {})
    .then(res => res.data)
    .catch(err => err.response)
}

export const updateTotalIncome = (id,income) => {
    return axios.post(host + "totalIncome/" + id, income, {} )
    .then(res => res.data)
    .catch(err => err.response)
}

export const updateTotalOutcome = (id,outcome) => {
    return axios.post(host + "totalOutcome/" + id, outcome, {})
    .then(res => res.data)
    .catch(err => err.response)
}