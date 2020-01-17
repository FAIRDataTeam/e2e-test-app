import request from '../request'

export default {

  triggerBuild(repoId: string, branch: string) {
    return request.post(`https://api.travis-ci.org/repo/${repoId}/requests`, {
      request: {
        branch,
        config: {
          env: [],
        },
      },
    })
  },

}
