import _ from 'lodash'


class Repository {
  name: string

  shortName: string

  public?: string

  private ?: string

  env?: string
}


class Config {
  dockerhubUrl: string

  privateDockerHost: string

  privateDockerAuthToken: string

  githubRepo: string

  githubToken: string

  githubWorkflowId: string

  githubUrl: string

  cypressProjectId: string

  repositories: Array<Repository>
}


function loadConfig(): Config {
  const config = new Config()
  config.dockerhubUrl = _.get(window, 'config.dockerhubUrl', '/dockerhub')
  config.privateDockerHost = _.get(window, 'config.privateDockerHost')
  config.privateDockerAuthToken = _.get(window, 'config.privateDockerAuthToken')
  config.githubRepo = _.get(window, 'config.githubRepo')
  config.githubToken = _.get(window, 'config.githubToken')
  config.githubWorkflowId = _.get(window, 'config.githubWorkflowId')
  config.githubUrl = _.get(window, 'config.githubUrl', 'https://api.github.com')
  config.cypressProjectId = _.get(window, 'config.cypressProjectId')
  config.repositories = _.get(window, 'config.repositories', []).map((rConfig) => {
    const repository = new Repository()
    repository.name = _.get(rConfig, 'name')
    repository.shortName = _.get(rConfig, 'shortName')
    repository.public = _.get(rConfig, 'public')
    repository.private = _.get(rConfig, 'private')
    repository.env = _.get(rConfig, 'env')
    return repository
  })
  return config
}


const config = loadConfig()

export default config
