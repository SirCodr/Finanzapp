import axios from "axios";
console.log(import.meta.env);
const http = axios.create({
  baseURL: import.meta.env.DEV ? 'http://localhost:3000/' : 'https://finanzapp-api.vercel.app/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default http