import Vue from "vue"
import App from "components/App.vue"
import Algolia from "plugins/algolia"

Vue.use(Algolia)

const components = {
  App
}

const app = new Vue({
  el: '#app',
  components,
  render: (h) => {
    return h(App)
  }
})
