import axios from "axios"

const { FIREBASE_API } = process.env;

export const signIn = axios.create({
    baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API}`
})

export const signUp = axios.create({
    baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API}`
})

