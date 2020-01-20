import axios from 'axios'
import config from '@/utils/config'


const request = axios.create({
  baseURL: config.dockerhubUrl,
  headers: {
    Accept: 'application/json',
  },
})


export default {
  getTags(name: string) {
    return request.get(`/repositories/${name}/tags`)
  },
}
