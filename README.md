# jasmine-ts

[![Build Status](https://travis-ci.org/svi3c/jasmine-ts.svg?branch=master)](https://travis-ci.org/svi3c/jasmine-ts)

A simplification for running [jasmine](https://www.npmjs.com/package/jasmine) with
[ts-node](https://github.com/TypeStrong/ts-node).

## Installation

```
npm i -D jasmine-ts
```

## Usage

* In your `package.json` file create a test script:

  ```json
  {
    "scripts": {
      "test": "jasmine-ts 'path/to/specs/**/*.spec.ts'"
    }
  }
  ```
* Initialize jasmine

  ```
  node_modules/.bin/jasmine-ts init
  ```

  Note: This module enables the configuration support of
  reporters. For example, if you want to use the
  [jasmine-spec-reporter](https://github.com/bcaudan/jasmine-spec-reporter),
  you can add a reporters array to the `jasmine.json`
  file like this:

  ```json
  {
    "reporters": [
      {
        "name": "jasmine-spec-reporter",
        "options": {
          "displayStacktrace": "all"
        }
      }
    ]
  }
  ```

* Run the tests

  ```
  npm test
  ```

### Note

You still need to install the typings for jasmine to make the typescript-compiler happy about your specs:

```
typings i -DG dt~jasmine
```
