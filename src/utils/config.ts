import _ from 'lodash'


class Repository {
  name: string

  public?: string

  private ?: string

  env?: string
}


class Config {
  dockerhubUrl: string

  privateDockerHost: string

  privateDockerAuthToken: string

  repository: string

  githubUrl: string

  travisUrl: string

  travisRepoId: string

  travisToken: string

  repositories: Array<Repository>
}


function loadConfig(): Config {
  const config = new Config()
  config.dockerhubUrl = _.get(window, 'config.dockerhubUrl', '/dockerhub')
  config.privateDockerHost = _.get(window, 'config.privateDockerHost')
  config.privateDockerAuthToken = _.get(window, 'config.privateDockerAuthToken')
  config.repository = _.get(window, 'config.repository')
  config.githubUrl = _.get(window, 'config.githubUrl', 'https://api.github.com')
  config.travisUrl = _.get(window, 'config.travisUrl', 'https://api.travis-ci.org')
  config.travisRepoId = _.get(window, 'config.travisRepoId')
  config.travisToken = _.get(window, 'config.travisToken')
  config.repositories = _.get(window, 'config.repositories', []).map((rConfig) => {
    const repository = new Repository()
    repository.name = _.get(rConfig, 'name')
    repository.public = _.get(rConfig, 'public')
    repository.private = _.get(rConfig, 'private')
    repository.env = _.get(rConfig, 'env')
    return repository
  })
  return config
}


const config = loadConfig()

export default config
