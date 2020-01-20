import axios from 'axios'
import config from '@/utils/config'


const request = axios.create({
  baseURL: `https://${config.privateDockerHost}`,
  headers: {
    Accept: 'application/json',
    Authorization: `Basic ${config.privateDockerAuthToken}`,
  },
})


export default {
  getTags(name: string) {
    return request.get(`/v2${name.replace(config.privateDockerHost, '')}/tags/list`)
  },
}
