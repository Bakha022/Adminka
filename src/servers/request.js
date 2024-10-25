import axios from 'axios'
const request = axios.create({
	baseURL: 'https://6718e2bf7fc4c5ff8f4b8741.mockapi.io/',
	timeout: 70000,
})


export default request