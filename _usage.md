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
