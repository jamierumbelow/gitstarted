# Git Started
### Contribute to open source projects that need your help

Git Started, powered by [Algolia](https://www.algolia.com), is a platform to help you find an open source project that needs your help. Projects are sorted by the number of open issues (and then the number of stars), and we've only included those repositories that have some `good-first-issue` tags.

Choose a language, pick a project, and start coding.

## Technical Details

Git Started is written in JavaScript, using the Vue framework to display and search through repositories, and a custom script behind the scenes to update the repositories. Search and filtering is powered by [Algolia](https://www.algolia.com).

Assets are bundled together using Webpack, and testing is powered by Jest.

## Todo

[ ] **Improve test coverage**: currently only the `indexer/Formatter.js` class has test coverage. Tests should be expanded to include the UI and indexing code.
[ ] **More fine-grained filters**: users can filter by language, but they may perhaps want to sort by something other than the number of issues (and then the number of stars).
[ ] **No repositories state**: if, for some reason, the index is empty, the page doesn't inform the user. A 'no repositories' state could make this clearer.
[ ] **Email alerts**: users could subscribe to repositories, and get email alerts when new `good-first-issues` are opened.
[ ] **Cronjob to update data**: currently, the index has to be updated manually.

## Feedback: Algolia

* I found the instantsearch.js suite of tools to be too rigid, and it wasn't clear how I could properly customise the display and filtering functions. Consequently, I chose to implement the functionality manually.
* Relatedly, instantsearch.js could expose the underlying search helper instance, facilitating this sort of customisation.
* I was surprised to discover that `.search` doesn't reset the search state once it's been initialised. This could be clearer in the documentation.
