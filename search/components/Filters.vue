<template>
  <div class="panel panel-outer">
    <div class="panel-inner">
      <!-- <div class="panel-head">
        <p class="panel-title">Panel Example</p>
      </div>
      <div class="panel-body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ipsam omnis repellat, dolor incidunt, illo recusandae? Ducimus magnam, illo modi eum amet ratione numquam debitis voluptatem! Possimus, aliquid, doloribus. Commodi assumenda facilis nemo delectus eos, doloremque quasi, harum quidem molestias ex quod facere alias temporibus veritatis qui. Eligendi impedit eum assumenda iure dolorum adipisci doloribus.</p>
      </div> -->
      <!-- <h5>Language</h5> -->
      <div class="panel-footer filters">
        <button :class="(language === 'all') ? 'button-primary' : 'button-primary-text'" @click="$emit('setLanguage', 'all')">All</button>
        <button :class="(language === l) ? 'button-primary' : 'button-primary-text'" v-for="l in buttonLanguages" @click="$emit('setLanguage', l)">{{ l }}</button>
        <select @change="selectLanguageFromDropdown">
          <option :value="l" v-for="l in dropdownLanguages" :selected="language === l">{{ l }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
const NUM_BUTTON_LANGUAGES = 9

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
  methods: {
    selectLanguageFromDropdown (event) {
      event.preventDefault()
      this.$emit('setLanguage', event.target.value)
    }
  },
  computed: {
    buttonLanguages () {
      return this.languages.slice(0, NUM_BUTTON_LANGUAGES)
    },
    dropdownLanguages () {
      return this.languages.slice(NUM_BUTTON_LANGUAGES)
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
</style>
