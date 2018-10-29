import Vue from "vue"
import App from "components/App.vue"

const components = {
  App
}

console.log('yo')

const app = new Vue({
  el: '#app',
  components,
  render: (h) => {
    console.log('yo')
    return h(App)
  }
})
