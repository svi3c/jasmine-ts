# jasmine-ts

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

* Run the tests

  ```
  npm test
  ```

### Note

You still need to install the typings for jasmine to make the typescript-compiler happy about your specs:

```
typings i -D --ambient jasmine
```