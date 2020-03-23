import axios from 'axios'
import config from '@/utils/config'


const request = axios.create({
  baseURL: config.githubUrl,
  headers: {
    Accept: 'application/json',
  },
})

request.interceptors.request.use((oldConfig) => {
  const newConfig = { ...oldConfig }

  if (config.token) {
    newConfig.headers.common.Authorization = `token ${config.token}`
  }

  return newConfig
})


export default {
  getBranches(repository: string) {
    return request.get(`/repos/${repository}/branches`)
  },

  triggerBuild(event: string, payload: object) {
    return request.post(`/repos/${config.repository}/dispatches`, {
      event_type: event,
      client_payload: payload,
    }, {
      headers: {
        Accept: 'application/vnd.github.everest-preview+json',
      },
    })
  },
}
