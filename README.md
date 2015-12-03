# Fibula.js

A **fixtures** framework for Node.js

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

## License

[MIT](./LICENSE)
