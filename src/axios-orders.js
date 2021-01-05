import axios from 'axios'

const instance = axios.create({
    baseURL:'https://react-my-burger-120b5-default-rtdb.firebaseio.com/'
})

export default instance;