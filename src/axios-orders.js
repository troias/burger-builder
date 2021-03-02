import axios from "axios"

const instance = axios.create({
    baseURL: 'https://react-my-burger-8f966-default-rtdb.firebaseio.com/'
})


export default instance