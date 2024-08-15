import axios, { AxiosResponse } from 'axios'

const http = axios.create({
  baseURL: import.meta.env.DEV
    ? 'http://localhost:3000/'
    : 'https://finanzapp-api-production.up.railway.app/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default http
