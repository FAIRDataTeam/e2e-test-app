<template>
  <div class="container container-full">
    <b-row class="d-flex align-items-center mb-4 mt-2">
      <b-col
        cols="12"
        md="6"
      >
        <h1>E2E Test App</h1>
      </b-col>
      <b-col
        cols="12"
        md="6"
        class="links"
      >
        <a
          :href="`https://github.com/${repository}/actions`"
          class="mr-3"
          target="_blank"
        >
          <fa :icon="['fas', 'play-circle']" />
          GitHub Actions
        </a>
        <a
          :href="`https://dashboard.cypress.io/projects/${cypressProjectId}/runs`"
          class="mr-3"
          target="_blank"
        >
          <fa :icon="['fas', 'copyright']" />
          Cypress Dashboard
        </a>
      </b-col>
    </b-row>
    <status-flash
      :status="status"
    />
    <form
      v-if="ready"
      class="form"
      @submit.prevent="submit"
    >
      <div class="form-group form-inline">
        <label>Test Branch</label>
        <select
          v-model="selectedBranch"
          class="form-control"
        >
          <option
            v-for="branch in branches"
            :key="branch"
            :value="branch"
          >
            {{ branch }}
          </option>
        </select>
      </div>
      <b-card-group
        deck
        class="mb-4"
      >
        <b-card
          v-for="(repository, index) in repositories"
          :key="repository.name"
        >
          <template v-slot:header>
            <fa
              :icon="['fab', 'docker']"
              class="mr-1"
            />
            {{ repository.name }}
          </template>
          <b-form-group>
            <b-input
              v-model="repositories[index].value"
              placeholder="select tag"
            />
          </b-form-group>

          <template v-if="repository.publicTags.length > 0">
            <strong>Public Tags</strong>
            <ul class="recent-tags">
              <li
                v-for="tag in repository.publicTags"
                :key="`${repository.name}-${tag}`"
              >
                <a
                  href="#"
                  @click.prevent="selectImage(index, repository.public, tag)"
                >{{ tag }}</a>
              </li>
            </ul>
          </template>

          <template v-if="repository.privateTags.length > 0">
            <strong>Private Tags</strong>
            <ul class="recent-tags">
              <li
                v-for="tag in repository.privateTags"
                :key="`${repository.name}-${tag}`"
              >
                <a
                  href="#"
                  @click.prevent="selectImage(index, repository.private, tag)"
                >{{ tag }}</a>
              </li>
            </ul>
          </template>
        </b-card>
      </b-card-group>
      <b-btn
        variant="primary"
        size="lg"
        :disabled="!canSubmit"
        class="btn-full-sm mb-5"
        type="submit"
      >
        <fa
          :icon="['fas', 'play']"
          class="mr-2"
        />
        Run tests
      </b-btn>
    </form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import _ from 'lodash'
import axios from 'axios'
import api from '@/api'
import config from '@/utils/config'
import StatusFlash from '@/components/StatusFlash/index.vue'
import Status from '@/utils/Status'
import localStorage from '@/utils/localStorage'

@Component({
  components: {
    StatusFlash,
  },
})
export default class Repository extends Vue {
  repositories: Array<any> = []

  branches: Array<string> = []

  status: Status = new Status()

  selectedBranch: string = null

  ready: boolean = false

  created() {
    this.fetchData()
  }

  selectImage(index, image, tag): void {
    this.repositories[index].value = `${image}:${tag}`
  }

  get canSubmit(): boolean {
    return this.repositories.every(r => !!r.value)
      && !!this.selectedBranch
      && !this.status.isPending()
  }

  get repository(): string {
    return config.githubRepo
  }

  get cypressProjectId(): string {
    return config.cypressProjectId
  }

  async submit() {
    try {
      this.status.setPending()

      this.repositories.forEach((r) => {
        localStorage.setSelectedImage(r.name, r.value)
      })
      localStorage.setSelectedBranch(this.selectedBranch)

      const ref = this.selectedBranch
      const inputs = this.repositories.reduce((acc, r) => ({ [r.env]: r.value, ...acc }), {})
      await api.github.triggerBuild(ref, inputs)

      this.status.setDone('Build has been started!')
    } catch (error) {
      this.status.setError('Unable to start the build.')
    }
  }

  async fetchData() {
    try {
      this.status.setPending()
      this.selectedBranch = localStorage.getSelectedBranch()
      const branchesResponse = await api.github.getBranches()
      this.branches = branchesResponse.data.map(b => b.name)

      const responses = await axios.all(config.repositories.flatMap(r => ([
        this.createPublicRequest(r),
        this.createPrivateRequest(r),
      ])))

      this.repositories = _.zipWith(config.repositories, _.chunk(responses, 2),
        (repository, [publicResponse, privateResponse]) => ({
          ...repository,
          publicTags: this.createPublicTagsFromResponse(publicResponse),
          privateTags: this.createPrivateTagsFromResponse(privateResponse),
          value: localStorage.getSelectedImage(repository.name),
        }))

      this.ready = true
      this.status.setDone()
    } catch (error) {
      this.status.setError('Unable to get repository data.')
    }
  }

  createPublicRequest(repository): Promise<any> {
    return repository.public
      ? api.dockerhub.getTags(repository.public)
      : Promise.resolve()
  }

  createPrivateRequest(repository): Promise<any> {
    return repository.private
      ? api.privateDocker.getTags(repository.private)
      : Promise.resolve()
  }

  createPublicTagsFromResponse(response): Array<string> {
    return _.get(response, 'data.results', [])
      .map(t => t.name)
      .filter(t => !t.match(/^([0-9a-f]{40})$/))
  }

  createPrivateTagsFromResponse(response): Array<string> {
    return _.get(response, 'data.tags', [])
      .filter(t => !t.match(/^([0-9a-f]{40}|master|v\d\.\d\.\d.*|release-.+)$/))
      .sort()
  }

  parseTag(value: string): string {
    return _.last(value.split(':'))
  }
}
</script>
