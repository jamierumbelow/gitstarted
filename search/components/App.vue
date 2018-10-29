<template>
  <div>
    <header>
      <h1>$ git started</h1>
      <h3>contribute to open source projects that need your help</h3>
    </header>

    <Filters
      :language="language"
      :languages="languages"
      @setLanguage="setLanguage"
      @updateSearchQuery="updateSearchQuery" />
    <Board
      :language="language"
      :search-query="searchQuery"
      @updateLanguages="updateLanguages" />
  </div>
</template>

<script>
import Board from "components/Board.vue"
import Filters from "components/Filters.vue"

export default {
  data () {
    return {
      searchQuery: '',
      language: 'all',
      languages: []
    }
  },
  components: {
    Filters,
    Board
  },
  methods: {
    setLanguage (language) {
      this.language = language
    },
    updateSearchQuery (searchQuery) {
      this.searchQuery = searchQuery
    },
    updateLanguages (languages) {
      this.languages = languages
    }
  }
}
</script>

<style lang="scss">
header {
  max-height: 15rem;
}

.panel-outer {
  margin-top: 0;
  background: #fafafa;

  .panel-inner {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: flex-start;

    h5 {
      width: 12%;
      padding: 16px 15px 15px 15px;
    }
  }
}
</style>
