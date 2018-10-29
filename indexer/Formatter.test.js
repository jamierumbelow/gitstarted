const Formatter = require('./Formatter.js')
const repos = require('../support/fixtures.json')

describe('Formatter', () => {

  it('formats an array of results', () => {
    const results = Formatter(repos.page1.items)
    expect(results).toBeInstanceOf(Array)
    expect(results.length).toBe(2)

    const vue = results[0]
    const react = results[1]

    expect(vue.objectId).toBe(11730342)
    expect(vue.name).toBe('vuejs/vue')
    expect(vue.url).toBe('https://github.com/vuejs/vue')
    expect(vue.language).toBe('javascript')
    expect(vue.topics).toBe('framework,frontend,javascript,vue')
    expect(vue.description).toBe('🖖 A progressive, incrementally-adoptable JavaScript framework for building UI on the web.')
    expect(vue.open_issues).toBe(271)
    expect(vue.stars).toBe(117568)
    expect(vue.last_updated_at).toBe('2018-10-26T16:28:48Z')

    expect(react.objectId).toBe(10270250)
    expect(react.name).toBe('facebook/react')
    expect(react.url).toBe('https://github.com/facebook/react')
    expect(react.language).toBe('javascript')
    expect(react.description).toBe('A declarative, efficient, and flexible JavaScript library for building user interfaces.')
    expect(react.open_issues).toBe(456)
    expect(react.stars).toBe(114217)
    expect(react.topics).toBe('declarative,frontend,javascript,library,react,ui')
    expect(react.last_updated_at).toBe('2018-10-29T06:36:59Z')
  })

  it('ignores rows without a language', () => {
    const results = Formatter([ { id: 123 } ])
    expect(results).toBeInstanceOf(Array)
    expect(results.length).toBe(0)
  })

})
