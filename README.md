# Fibula.js

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][david-image]][david-url]
[![Downloads][downloads-image]][downloads-url]

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

### Write fixtures

Write the below as our first fixture named as "name/model1.json"

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

If you want to access to variables which you puts to databases, then you should use `fixture.get` instead of
loading them manually.

```js
const data = fixtures.get('model1');
console.log(data);
```

The above code would output:

```
[
  {
    "name": "bar"
  },
  {
    "name": "foo"
  }
]
```

which is defined at [Write fixtures](#write-fixtures) by us.

### Async method

Calling `fixtures.use` in above way will do actions with adapters like MongoDB in a blocking way, that means you will need
more time to complete your operations. To address this problem, Fibula.js as well as provides non-blocking method.

An example to show how non-blocking code works with Mocha or Jasmine:

```
beforeEach(function (next) {
  fixtures.use('case1', next);
});
```

As the above lines looks, you should pass a callback as 2nd of `.use` arguments, but in async mode, developers should
take more care of stuffs in concurrent.

### Typed fixture

Usually the fixutures seems to be consist of `.json` files, namely only string can be defined. Fibula.js as well
as supports a flexible to let you define types by parsing `.js` file. see [test/fixtures/js-file](test/fixtures/js-file)
to see the usage.

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/fibula.svg?style=flat-square
[npm-url]: https://npmjs.org/package/fibula
[travis-image]: https://img.shields.io/travis/weflex/fibula.js.svg?style=flat-square
[travis-url]: https://travis-ci.org/weflex/fibula.js
[david-image]: http://img.shields.io/david/weflex/fibula.js.svg?style=flat-square
[david-url]: https://david-dm.org/weflex/fibula.js
[downloads-image]: http://img.shields.io/npm/dm/fibula.js.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/fibula.js

