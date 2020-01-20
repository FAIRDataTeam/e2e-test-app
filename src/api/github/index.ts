import axios from 'axios'
import config from '@/utils/config'


const request = axios.create({
  baseURL: config.githubUrl,
  headers: {
    Accept: 'application/json',
  },
})


export default {
  getBranches(repository: string) {
    return request.get(`/repos/${repository}/branches`)
  },
}
