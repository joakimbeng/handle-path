
The differences between `switch-path` and `handle-path` are:

* `handle-path` always stops on first pattern match, so keep your catch-all's (i.e. `"*"`) in the bottom of the handlers
* `handle-path` uses [`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp) under the hood so you can use all of its pattern features
* `handle-path`'s matching is strict, so `/home/page1` won't be matched by `/home` you have to use a pattern like `/home/*` for that
* `handle-path` allows you to use functions as values even for patterns without parameters, and they will be called without arguments on pattern match
