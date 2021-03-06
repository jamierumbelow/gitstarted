// Take the 'raw' GitHub response and turn it into something we can index

const _ = require('lodash')

const FormatRow = (row) => {
  return {
    objectID: row.id,
    name: row.full_name,
    url: row.html_url,
    language: row.language.toLowerCase(),
    topics: row.topics ? row.topics.join(',') : null,
    description: row.description,
    open_issues: row.open_issues,
    stars: row.stargazers_count,
    last_updated_at: row.pushed_at
  }
}

const Formatter = (rows) => _(rows)
  .map((row) => !!row.language && FormatRow(row))
  .filter()
  .value()

module.exports = Formatter
