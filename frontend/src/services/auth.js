import * as firebase from 'firebase'
import axios from 'axios'
const host = 'http://localhost:3000/auth'

export const signup = (user) => {
    return axios.post(host + '/signup', user, {})
    .then(res => res.data)
    .catch(err => err.response)
}

export const login = (user) => {
return axios.post(host + '/login', user, {withCredentials: true})
    .then(res => res.data)
    .catch(err => err.response)
}

export const profile = () => {
    return axios.get(host + "/profile", {withCredentials:true})
    .then(r => r.data)
    .catch(e => e.response)
}

export const logout = () => {
    return axios.get(host + "/logout")
    .then(r => r.data)
    .catch(e => e.response)
}

export const uploadPhoto = (file) => {
    firebase.storage().ref('userPhotos').child(file.name).put(file)
}