import axios from 'axios'
export class HttpAdapter {
  private http

  constructor() {
    this.http = axios.create({
      baseURL: import.meta.env.DEV
        ? 'http://localhost:3000/'
        : 'https://finanzapp-api-production.up.railway.app/',
      headers: {
        'Content-Type': 'application/json'
      },
      
    })
  }

  async get(url: string) {
    const response = await this.http.get(url)
    return response.data
  }

  async post(url: string, data: unknown) {
    const response = await this.http.post(url, data)
    return response.data
  }
}
