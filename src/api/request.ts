import _ from 'lodash'
import axios from 'axios'

const request = axios.create({
  baseURL: _.get(window, 'config.publicPath', 'http://localhost:3000'),
  headers: {
    Accept: 'application/json',
  },
})

request.interceptors.request.use((oldConfig) => {
  const config = { ...oldConfig }

  if (oldConfig.url.includes('github')) {
    return config
  }

  const token = localStorage.getItem('token')
  if (token) {
    config.headers.common.Authorization = `token ${token}`
    config.headers.common['Travis-API-Version'] = 3
  }

  return config
}, null)

export default request
