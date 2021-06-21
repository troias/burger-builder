import axios from "axios"

export const signIn = axios.create({
    baseURL: 'https://react-my-burger-8f966-default-rtdb.firebaseio.com/'
})

export const signUp = axios.create({
    baseURL: 'https://react-my-burger-8f966-default-rtdb.firebaseio.com/'
})

