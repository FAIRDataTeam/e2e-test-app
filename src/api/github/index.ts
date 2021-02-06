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

  if (config.githubToken) {
    newConfig.headers.common.Authorization = `token ${config.githubToken}`
  }

  return newConfig
})


export default {
  getBranches() {
    return request.get(`/repos/${config.githubRepo}/branches`)
  },

  triggerBuild(event: string, ref: string, inputs: object) {
    return request.post(`/repos/${config.githubRepo}/actions/workflows/${config.githubWorkflowId}/dispatches`, {
      event_type: event,
      client_payload: {
        ref,
        inputs,
      },
    }, {
      headers: {
        Accept: 'application/vnd.github.everest-preview+json',
      },
    })
  },
}
