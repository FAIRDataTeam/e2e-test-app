import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as fas from '@fortawesome/free-solid-svg-icons'
import * as fab from '@fortawesome/free-brands-svg-icons'

// @ts-ignore
library.add(fab.faDocker)
library.add(fas.faExternalLinkAlt)
library.add(fas.faKey)
library.add(fas.faPlay)
library.add(fas.faCircleNotch)

Vue.component('fa', FontAwesomeIcon)
