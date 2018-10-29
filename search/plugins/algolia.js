import algoliasearch from "algoliasearch"
import algoliasearchHelper from "algoliasearch-helper"

export default {
  install (Vue, options) {
    const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY)
    const helper = algoliasearchHelper(client, process.env.INDEX_NAME)

    Vue.prototype.$algolia = helper
    Vue.algolia = helper
  }
}
