# E2E Test App


[![Build Status](https://travis-ci.org/FAIRDataTeam/e2e-test-app.svg?branch=master)](https://travis-ci.org/FAIRDataTeam/FAIRDataPoint-client.svg?branch=master)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

A simple UI for running customized [FAIRDataPoint E2E Tests](https://github.com/FAIRDataTeam/FAIRDataPoint-E2E-Tests) in Travis. It allows to choosing custom Docker Images for the [FAIRDataPoint](https://github.com/FAIRDataTeam/FAIRDataPoint), [FAIRDataPoint-client](https://github.com/FAIRDataTeam/FAIRDataPoint-client) and [OpenRefine-metadata-extension](https://github.com/FAIRDataTeam/OpenRefine-metadata-extension) which the E2E tests should run against.

## Configuration

Create a `.htpasswd` file with usernames and passwords and mount it to `/usr/share/nginx/.htpasswd` for basic auth.

Create a `config.js` file and mount it to `/usr/share/nginx/html/config.js`.

Example configuration file:

```js
window.config = {
  // GitHub repository with the tests
  repository: 'FAIRDataTeam/FAIRDataPoint-E2E-Tests',
  
  // Repository ID used for Travis API calls
  travisRepoId: '12345678',
  
  // Travis token for API calls
  travisToken: 'abcdefghijklmnop',

  // Private Docker registry host if you use it (optional)
  privateDockerHost: 'registry.example.com',

  // Private Docker registry auth token (optional)
  privateDockerAuthToken: 'dXNlcjpwYXNzd29yZA==',

  // Configuration of repositories for images used in E2E tests
  repositories: [{
    // Name of the repository
    name: 'FAIR Data Point',

    // Image name in the public Docker Hub (optional)
    public: 'fairdata/fairdatapoint',
    
    // Image name in the private Docker Hub (optional)
    private: 'registry.example.com/fairdatapoint',
    
    // ENV variable that will be set for the E2E tests Travis build
    env: 'SERVER_IMAGE',
  }, {
    public: 'fairdata/fairdatapoint-client',
    env: 'CLIENT_IMAGE',
  }, {
    public: 'fairdata/openrefine-metadata-extension',
    env: 'OPEN_REFINE_IMAGE',
  }],
}
```

You need to configure the Travis repository where the actual E2E tests are and token for Travis API calls.

You can also configure private Docker registry if you use one. Then, for each repository you can configure `public`, `private` or both image names in `repositories` section.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for more details.
