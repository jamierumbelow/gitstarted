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

    <div class="row" v-if="page * perPage < totalRepos">
      <div class="col col-md-2 pagination">
        <button class="button-primary" @click="loadMore">
          <template v-if="loading"><span class="fa fa-spinner fa-spin"></span></template>
          <template v-else>More</template>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import _ from "lodash"

const PER_PAGE = 20

export default {
  props: {
    searchQuery: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'all'
    }
  },
  data () {
    return {
      page: 1,
      totalRepos: 0,
      loading: false,
      initialLoad: false,
      hits: []
    }
  },
  mounted () {
    this.$algolia.on('result', (results) => {
      this.hits = results.hits
      this.loading = false
      this.totalRepos = results.nbHits

      if (!this.initialLoad) {
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
      this.$algolia.setQueryParameter('hitsPerPage', this.page * PER_PAGE)

      this.$algolia.setQuery(this.searchQuery)
      this.$algolia.search()
    },
    updateLanguages (results) {
      const languageFacet = _.find(results.facets, (facet) => facet.name === 'language')
      const list = _.get(languageFacet, 'data')

      this.$emit('updateLanguages', Object.keys(list))
      this.initialLoad = true
    },
    loadMore () {
      this.loading = true
      this.page = this.page + 1
      this.reload()
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
    },
    perPage () {
      return PER_PAGE
    }
  },
  watch: {
    language () {
      this.reload()
    },
    searchQuery () {
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

.pagination {
  margin: 25px auto 0 auto;

  button {
    font-size: 1.2em;
    width: 100%;
    height: 50px;
  }
}
</style>
