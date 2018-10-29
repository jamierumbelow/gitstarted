// Small wrapper around Algolia API

const _ = require('lodash')
const algoliasearch = require('algoliasearch')
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SECRET)
const reposIndex = client.initIndex(process.env.INDEX_NAME)

const Algolia = {
  clear () {
    return reposIndex.clearIndex()
  },

  update (records) {
    const chunks = _.chunk(records, 200)
    const promises = _.map(chunks, (chunk) => reposIndex.saveObjects(chunk))

    return Promise.all(promises)
  },

  configure () {
    return reposIndex.setSettings({
      searchableAttributes: [
        'name',
        'language',
        'topics',
        'description'
      ],
      attributesForFaceting: [
        'searchable(language)',
        'searchable(topics)'
      ],
      customRanking: [
        'desc(open_issues)',
        'desc(stars)'
      ]
    })
  }
}

module.exports = Algolia
