import axios from 'axios'
import config from '@/utils/config'


const request = axios.create({
  baseURL: config.travisUrl,
  headers: {
    Accept: 'application/json',
  },
})


request.interceptors.request.use((oldConfig) => {
  const newConfig = { ...oldConfig }

  if (config.travisToken) {
    newConfig.headers.common.Authorization = `token ${config.travisToken}`
    newConfig.headers.common['Travis-API-Version'] = 3
  }

  return newConfig
}, null)


export default {
  triggerBuild(repoId: string, branch: string, env: string) {
    return request.post(`/repo/${repoId}/requests`, {
      request: {
        branch,
        config: {
          env,
        },
      },
    })
  },
}
