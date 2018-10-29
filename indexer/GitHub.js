// Fetch all relevant records from GitHub

const _ = require('lodash')
const fetch = require('node-fetch')
const querystring = require('querystring')
const headerParser = require('parse-link-header')

// Some sensible defaults. We've only really got one use case, so there's no real
// need to override these, but we can through the params object of the GitHub function
// just in case.

DEFAULT_CONDITIONS = {
  per_page: '100',
  q: 'good-first-issues:>2'
}
BASE_URL = 'https://api.github.com/search/repositories'

// Fetch the data from the GitHub API recursively, paging through the results
// until we have a nested promise that will resolve with an array of every parsed record.
const fetcher = (url, allRecords = []) => {
  return fetch(url)
    .then(async (response) => {
      const links = headerParser(response.headers.get('Link'))
      const data = _.get(await response.json(), 'items', [])
      const newAllRecords = allRecords.concat(data)

      if (links.last) {
        return fetcher(links.next.url, newAllRecords)
      } else {
        return newAllRecords
      }
    })
}

// Our 'public interface'. Pass it params and it'll recursively fetch the response.
const GitHub = (params = {}) => {
  const searchConditions = _.assign({}, DEFAULT_CONDITIONS, params)
  const url = `${BASE_URL}?${querystring.stringify(searchConditions)}`

  return fetcher(url)
}

module.exports = GitHub
