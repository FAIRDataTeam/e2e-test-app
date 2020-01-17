import request from '../request'

export default {

  getBranches(owner: string, repository: string) {
    return request.get(`https://api.github.com/repos/${owner}/${repository}/branches`)
  },

}
