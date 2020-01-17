<template>
  <div>
    <status-flash :status="status" />
    <page title="E2E Test App">
      <template v-slot:content>
        <form
          class="form"
          @submit.prevent="submit"
        >
          <div
            v-for="branch in branches"
            :key="branch.name"
          >
            {{ branch.name }}
          </div>

          <button class="btn btn-primary btn-rounded">
            Run tests
          </button>
        </form>
      </template>
    </page>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import _ from 'lodash'
import api from '../../api'
import Page from '../../components/Page/index.vue'
import StatusFlash from '../../components/StatusFlash/index.vue'
import Status from '../../utils/Status'


@Component({
  components: {
    StatusFlash,
    Page,
  },
})
export default class Repository extends Vue {
  branches: any = null

  status: Status = new Status()

  created() {
    this.fetchData()
  }

  async submit() {
    try {
      this.status.setPending()

      const travisRepoId = _.get(window, 'config.travisRepoId')
      const response = await api.travis.triggerBuild(travisRepoId, 'develop')
      console.log(response)

      this.status.setDone()
    } catch (error) {
      this.status.setError('Unable to get repository data.')
    }
  }

  async fetchData() {
    try {
      this.status.setPending()

      const githubRepoOwner = _.get(window, 'config.githubRepoOwner')
      const githubRepoName = _.get(window, 'config.githubRepoName')
      const response = await api.github.getBranches(githubRepoOwner, githubRepoName)
      this.branches = response.data

      this.status.setDone()
    } catch (error) {
      this.status.setError('Unable to get repository data.')
    }
  }
}
</script>
