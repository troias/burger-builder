import axios from "axios"

const { REACT_APP_FIREBASE_API, FIREBASE_SERVER_KEY } = process.env;

export const signIn = axios.create({
    baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${REACT_APP_FIREBASE_API}`, 
    // headers: { 'Authorization': 'Bearer ' + FIREBASE_SERVER_KEY }
})

export const signUp = axios.create({
    baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${REACT_APP_FIREBASE_API}`, 
    // headers: { 'Authorization': 'Bearer ' + FIREBASE_SERVER_KEY }
})

