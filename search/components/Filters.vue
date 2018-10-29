<template>
  <aside class="filter-outer">
    <div class="panel panel-outer">
      <div class="panel-inner">
        <div class="panel-footer filters">
          <template v-if="!isTinyScreen">
            <button :class="(language === 'all') ? 'button-primary' : 'button-primary-text'" @click="$emit('setLanguage', 'all')">All</button>
            <button :class="(language === l) ? 'button-primary' : 'button-primary-text'" v-for="l in buttonLanguages" @click="$emit('setLanguage', l)">{{ l }}</button>
          </template>

          <select @change="selectLanguageFromDropdown">
            <template v-if="isTinyScreen">
              <option disabled selected>- filter by language -</option>
              <option :value="l" v-for="l in languages" :selected="language === l">{{ l }}</option>
            </template>
            <template v-else>
              <option disabled selected>- more -</option>
              <option :value="l" v-for="l in dropdownLanguages" :selected="language === l">{{ l }}</option>
            </template>
          </select>
        </div>
      </div>
    </div>
    <div class="search-filter">
      <input type="text" placeholder="Type to Search..." v-model="searchQuery">
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    language: {
      type: String,
      default: ''
    },
    languages: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      searchQuery: '',
      windowWidth: window.innerWidth,
      numButtonLanguages: 9
    }
  },
  created () {
    window.addEventListener("resize", this.handleResize)
  },
  destroyed () {
    window.removeEventListener("resize", this.handleResize)
  },
  methods: {
    selectLanguageFromDropdown (event) {
      event.preventDefault()
      this.$emit('setLanguage', event.target.value)
    },
    handleResize () {
      this.windowWidth = window.innerWidth

      if (this.isSmallScreen) {
        this.numButtonLanguages = 5
      } else {
        this.numButtonLanguages = 9
      }
    }
  },
  computed: {
    buttonLanguages () {
      return this.languages.slice(0, this.numButtonLanguages)
    },
    dropdownLanguages () {
      return this.languages.slice(this.numButtonLanguages)
    },
    isSmallScreen () {
      return this.windowWidth <= 760
    },
    isTinyScreen () {
      return this.windowWidth <= 400
    }
  },
  watch: {
    searchQuery () {
      this.$emit('updateSearchQuery', this.searchQuery)
    }
  }
}
</script>

<style lang="scss">
.filters {
  select {
    text-transform: uppercase;
    width: fit-content;
    display: inline;
  }
}

.search-filter {
  padding: 0 15px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

@media screen and (max-width: 401px) {
  .filters {
    width: 100%;

    select {
      width: 100%;
      display: block;
    }
  }
}
</style>
