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
      <div class="panel-footer">
        <button :class="(language === 'all') ? 'button-primary' : 'button-primary-text'" @click="$emit('setLanguage', 'all')">All</button>
        <button :class="(language === key) ? 'button-primary' : 'button-primary-text'" v-for="(title, key) in languages" @click="$emit('setLanguage', key)">{{ title }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    language: {
      type: String,
      default: ''
    },
    languages: {
      type: Object,
      default: () => {}
    }
  }//,
  // computed: {
    // buttonLanguages ()
  // }
}
</script>
