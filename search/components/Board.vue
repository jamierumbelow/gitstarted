<template>
  <section id="board">
    <div class="row" v-for="row in chunkedRepos">
      <div class="col col-md-4" v-for="repo in row">

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
import _chunk from "lodash/chunk"

export default {
  data () {
    return {
      hits: []
    }
  },
  mounted () {
    this.$algolia.on('result', (results) => {
      this.hits = results.hits
    })
    this.$algolia.search()
  },
  computed: {
    chunkedRepos () {
      return _chunk(this.hits, 3)
    }
  }
}
</script>

<style lang="scss">

</style>
