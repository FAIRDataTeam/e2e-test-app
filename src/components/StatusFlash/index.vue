<template>
  <div>
    <b-alert
      :variant="variant"
      :show="!status.isDefault()"
      :dismissible="status.isError() || status.isSuccess()"
      fade
    >
      <template v-if="status.isPending() && !noLoading">
        <fa
          :icon="['fas', 'circle-notch']"
          spin
        />
        Loading...
      </template>
      <template v-if="status.message">
        {{ status.message }}
      </template>
    </b-alert>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Status from '@/utils/Status'

@Component
export default class StatusFlash extends Vue {
  @Prop({ type: Status, required: true })
  readonly status: Status

  @Prop({ type: Boolean, default: false })
  readonly noLoading: boolean

  get variant() {
    if (this.status.isError()) {
      return 'danger'
    }

    if (this.status.isSuccess()) {
      return 'success'
    }

    if (this.status.isPending()) {
      return 'light'
    }

    return ''
  }
}
</script>
