import axios from 'axios'

export default() => {
  return axios.create({
    // baseURL: `https://news-demo-server.firebaseapp.com`
    baseURL: `http://localhost:3000`
  })
}
