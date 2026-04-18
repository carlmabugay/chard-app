// @ts-ignore
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
})

function getCookie(name: string) {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='))
    ?.split('=')[1]
}

apiClient.interceptors.request.use((config: { headers: { [x: string]: string } }) => {
  const token = getCookie('XSRF-TOKEN')

  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token)
  }

  return config
})