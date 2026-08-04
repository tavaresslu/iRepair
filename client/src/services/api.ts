import axios from 'axios'

const api = axios.create({
  baseURL: 'https://trainee.fidelis.workers.dev/api',
  headers: {
    Authorization: `Bearer 1c4a2da0-acf4-496d-821c-7b806e8a96d2`,
  },
})

export default api