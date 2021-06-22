import axios from "axios"

export const signIn = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBo5ZKdi2f1enIP10Py-8YLMFTzLHi3r58'
})

export const signUp = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBo5ZKdi2f1enIP10Py-8YLMFTzLHi3r58'
})

