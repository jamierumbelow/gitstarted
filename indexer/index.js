/**
 * Algolia GitHub Open Source Interview Thing
 *
 * Indexer: Run at the command line. Fetches all the relevant public repos from the
 *          GitHub API, formats and passes into Algolia.
 */

require('dotenv').config()

const fs = require('fs')
const GitHub = require('./GitHub.js')
const Formatter = require('./Formatter.js')

const REPO_CACHE = './cache/repositories.json'

async function main () {
  let records
  if (fs.existsSync(REPO_CACHE)) {
    console.log('No need to go to GitHub; cached repositories found in cache/repositories.json')
    records = JSON.parse(fs.readFileSync(REPO_CACHE))
  } else {
    console.log('Fetching repositories from GitHub...')
    records = await GitHub()
    fs.writeFileSync(REPO_CACHE, JSON.stringify(records))
    console.log(`Done! Fetched ${records.length} records and wrote them to ./cache/repositories.json`)
  }

  const formattedRecords = Formatter(records)

  console.log(`Clearing index`)
  await Algolia.clear()
  console.log(`Index cleared!`)

  console.log(`Rebuilding index`)
  await Algolia.build(formattedRecords)
  console.log(`Index built!`)
  console.log(`All done!`)
}

main()
  .catch((e) => console.error(e))
