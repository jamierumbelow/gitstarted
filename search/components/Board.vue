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
      hits: []
    }
  },
  mounted () {
    this.$algolia.on('result', (results) => {
      this.hits = results.hits
      this.updateLanguages(results)
    })

    this.reload()
  },
  methods: {
    reload () {
      if (_.get(this.searchParameters, 'facetName')) {
        this.$algolia.searchForFacetValues(
          this.searchParameters.facetName,
          this.searchParameters.facetQuery
        )
      } else {
        this.$algolia.search()
      }
    },
    updateLanguages (results) {
      const languageFacet = _.find(results.facets, (facet) => facet.name === 'language')
      const list = _.get(languageFacet, 'data')
      const languageList = Object.keys(list)

      this.$emit('updateLanguages', _.reduce(languageList, (acc, language) => {
        acc[language] = language
        return acc
      }, {}))
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
