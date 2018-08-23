import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `https://information-desk-server.herokuapp.com/`,
    //baseURL: `http://localhost:3000`,
    headers: {
        'Content-Type': 'application/json'
    },
  	json: true
  })
}
