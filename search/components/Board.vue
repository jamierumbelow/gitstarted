<template>
  <section id="board" class="container">
    <div class="row" v-for="row in chunkedRepos">
      <div class="col col-md-4" v-for="(repo, i) in row">

        <div class="card">
          <h3 class="card-title">
            {{ repo.name }}
            <span>{{ repo.open_issues }} open issues</span>
          </h3>
          {{ repo.description }}
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import _ from "lodash"

export default {
  props: {
    language: {
      type: String,
      default: 'all'
    }
  },
  data () {
    return {
      hasLanguages: false,
      hits: []
    }
  },
  mounted () {
    this.$algolia.on('result', (results) => {
      this.hits = results.hits

      if (!this.hasLanguages) {
        this.updateLanguages(results)
      }
    })

    this.reload()
  },
  methods: {
    reload () {
      this.$algolia.clearRefinements()
      if (this.language !== 'all') {
        this.$algolia.addFacetRefinement('language', this.language)
      }
      this.$algolia.search()
    },
    updateLanguages (results) {
      const languageFacet = _.find(results.facets, (facet) => facet.name === 'language')
      const list = _.get(languageFacet, 'data')

      this.$emit('updateLanguages', Object.keys(list))
      this.hasLanguages = true
    }
  },
  computed: {
    chunkedRepos () {
      return _.chunk(this.hits, 3)
    },
    searchParameters () {
      const searchParameters = {}
      if (this.language !== 'all') {
        searchParameters.facetName = 'language'
        searchParameters.facetQuery = this.language
      }
      return searchParameters
    }
  },
  watch: {
    language () {
      this.reload()
    }
  }
}
</script>

<style lang="scss">

</style>
