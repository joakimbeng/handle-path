
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
