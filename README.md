# handle-path

[![Build status][travis-image]][travis-url] [![NPM version][npm-image]][npm-url] [![XO code style][codestyle-image]][codestyle-url]

> A simple route handling tool. Mapping a URL to a handler

## Installation

Install `handle-path` using [npm](https://www.npmjs.com/):

```bash
npm install --save handle-path
```
## Usage

### Module usage

```javascript
const handlePath = require('handle-path');

const {path, pattern, value, params} = handlePath('/item/3', {
	'/home': () => HomeComponent(),
	'/about': () => AboutComponent(),
	'/item/:id': id => ItemComponent({id}),
	'/items': () => ItemListComponent(),
	'*': () => NotFoundComponent()
});
/**
 * path = '/item/3'
 * pattern = '/item/:id'
 * value = ItemComponent({id})
 * params = ['3']
 */
```

## Examples

### Primitive type as handler

```javascript
const handlePath = require('handle-path');

const {path, pattern, value, params} = handlePath('/item/10', {
	'/home': 1,
	'/about': 2,
	'/item/:id': 3,
	'/items': 4,
	'*': 5
});
/**
 * path = '/item/10'
 * pattern = '/item/:id'
 * value = 3
 * params = ['10']
 */
```

### Nested route configuration

```javascript
const handlePath = require('handle-path');

const {path, pattern, value, params} = handlePath('/item/10', {
	'/home': 1,
	'/about': 2,
	'/item': {
		':id': 3
	},
	'/items': 4,
	'*': 5
});
/**
 * path = '/item/10'
 * pattern = '/item/:id'
 * value = 3
 * params = ['10']
 */
```

### Function handler

```javascript
const handlePath = require('handle-path');

const {path, pattern, value, params} = handlePath('/item/10', {
	'/home': () => 1,
	'/about': () => 2,
	'/item': {
		':id': id => id
	},
	'/items': () => 4,
	'*': () => 5
});
/**
 * path = '/item/10'
 * pattern = '/item/:id'
 * value = 10
 * params = ['10']
 */
```

## Related packages

* [`switch-path`](https://www.npmjs.com/package/switch-path) - switch case for URLs, a small tool for routing in JavaScript

The differences between `switch-path` and `handle-path` are:

* `handle-path` always stops on first pattern match, so keep your catch-all's (i.e. `"*"`) in the bottom of the handlers
* `handle-path` uses [`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp) under the hood so you can use all of its pattern features
* `handle-path`'s matching is strict, so `/home/page1` won't be matched by `/home` you have to use a pattern like `/home/*` for that
* `handle-path` allows you to use functions as values even for patterns without parameters, and they will be called without arguments on pattern match

## API

### `handlePath(path, routes)`

| Name | Type | Description |
|------|------|-------------|
| path | `String` | The path to match |
| routes | `Object` | [The routes config](#routes-configuration) |

**Returns:**

```javascript
{
	path: String, // the matched path on match, otherwise `null`
	pattern: String, // the matched pattern, otherwise `null`
	value: Mixed, // the matched value, otherwise `null`
	params: Array<String>, // the matched params, otherwise `null`
}
```

#### Routes configuration

The routes configuration should be an `Object` with [path patterns](https://github.com/pillarjs/path-to-regexp#parameters) as keys and their handlers as values.

A handler can be of any type, a nested route configuration or a function. Functions are called with any matched path parameters and their return values are used as `value` in the `handlePath`'s return value.

## License

MIT © [Joakim Carlstein](http://joakim.beng.se)

[npm-url]: https://npmjs.org/package/handle-path
[npm-image]: https://badge.fury.io/js/handle-path.svg
[travis-url]: https://travis-ci.org/joakimbeng/handle-path
[travis-image]: https://travis-ci.org/joakimbeng/handle-path.svg?branch=master
[codestyle-url]: https://github.com/sindresorhus/xo
[codestyle-image]: https://img.shields.io/badge/code%20style-XO-5ed9c7.svg?style=flat
