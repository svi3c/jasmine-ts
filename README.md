# jasmine-ts

![CI](https://github.com/svi3c/jasmine-ts/workflows/Node.js%20CI/badge.svg)

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
      "test": "jasmine-ts \"path/to/specs/**/*.spec.ts\""
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
  which provides a nice output, you can add a reporters array to the `jasmine.json`
  file like this:

  ```json
  {
    "reporters": [
      {
        "name": "jasmine-spec-reporter#SpecReporter",
        "options": {
          "displayStacktrace": "all"
        }
      }
    ]
  }
  ```
  If the reporters are not the default export of the module,
  you can reference another export by using the `#` separator.

* Run the tests

  ```
  npm test
  ```
  
### Running with istanbul coverage

You can use [nyc](https://github.com/istanbuljs/nyc) to check your test coverage.

Example `package.json`:
```json
{
  "scripts": {
    "test": "nyc  -r lcov -e .ts -x \"*.spec.ts\" jasmine-ts \"path/to/specs/**/*.spec.ts\""
  }
}
```

### Note

You still need to install the typings for jasmine to make the typescript-compiler happy about your specs:

TypeScript 2:
```
npm i -D @types/jasmine
```

TypeScript 1:
```
typings i -DG dt~jasmine
```

Since `0.1.3` [ts-node options](https://www.npmjs.com/package/ts-node#configuration-options) are passed through to ts-node.
