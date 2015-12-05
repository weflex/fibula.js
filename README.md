# Fibula.js

[![Build Status](https://travis-ci.org/weflex/fibula.svg)](https://travis-ci.org/weflex/fibula)

A **fixtures** library to integrate with other test frameworks like [mocha](https://mochajs.org). Fibula.js will be helping
you to write your test based on data you defined.

Usually in developing products at [WeFlex](https://github.com/weflex), we borrow the LoopBack, the powerful RESTFul
framework, to build our API service, and making test case in [Mochajs](https://mochajs.org). With growing up of our
bussiness logic, the more we write, the more complcate we have test cases, and especially some of test case is not 
idempotent and not indenpendent.

So Fubila.js saved us, [the WeFlex team](https://github.com/weflex), from the hell of writing dependencies specs.

## Install

```sh
$ npm install fibula
```

## Usage

See [test/fixtures](test/fixtures) and [test/parallel](test/parallel).

### Write a fixture

```json
{
  "adapter": "mongo",
  "data": [
    {
      "name": "bar"
    },
    {
      "name": "foo"
    }
  ]
}
```

### Using the fixture

```js
fixtures.use('case1');
```

Then you will get the `data` in your database.

### Typed fixture

Usually the fixutures seems to be consist of `.json` files, namely only string can be defined. Fibula.js as well
as supports a flexible to let you define types by parsing `.js` file. see [test/fixtures/js-file](test/fixtures/js-file)
to see the usage.

## License

[MIT](./LICENSE)
