<template>
  <section id="board" class="container">
    <div class="row" v-for="row in chunkedRepos">
      <div class="col col-md-4" v-for="(repo, i) in row">

        <div class="card" @click="clickCard(repo.url)">
          <h3 class="card-title">
            <span class="title">{{ repo.name.split('/')[1] }}</span>
            <span class="issues" :class="issuesClass(repo.open_issues)">
              <span class="fa fa-info-circle"></span>
              {{ repo.open_issues }}
            </span>
          </h3>
          {{ repo.description }}
          <footer>{{ repo.name }}</footer>
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
    },
    clickCard (url) {
      window.open(url, '_blank').open()
    },
    issuesClass (issuesCount) {
      if (issuesCount > 1000) {
        return 'bad'
      } else if (issuesCount > 500) {
        return 'medium'
      }
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
.card {
  .card-title {
    overflow: auto;

    .title {
      font-size: 0.9em;
      display: block;
      width: 75%;
      float: left;
    }

    .issues {
      float: left;
      font-size: 0.7em;
      display: block;
      text-align: right;
      margin-top: 14px;
      width: 25%;
      line-height: 1;

      &.bad { color: #D01919; }
      &.medium { color: #D09F19; }
    }
  }

  footer {
    padding: 0;
    background: 0;
    margin-top: 25px;
    font-style: italic;
  }

  &:hover {
    cursor: pointer;
    background: #fafafa;
  }
}
</style>
