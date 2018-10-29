// Small wrapper around Algolia API

const _ = require('lodash')
const algoliasearch = require('algoliasearch')
const client = algoliasearch(process.env.ALGOLIA_KEY, process.env.ALGOLIA_SECRET)
const reposIndex = client.initIndex('repos')

const Algolia = {
  update (records) {
    const chunks = _.chunk(records, 200)
    const promises = _.map(chunks, (chunk) => reposIndex.addObjects(chunk))

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
        'language',
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
