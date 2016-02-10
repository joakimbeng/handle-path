'use strict';
var pathToRegexp = require('path-to-regexp');
var isPlainObject = require('is-plain-object');

module.exports = exports = function handlePath(path, routes) {
	return match(path, routes);
};

function match(path, routes, parentPattern) {
	parentPattern = parentPattern || '';
	var patterns = Object.keys(routes);

	for (var i = 0, len = patterns.length; i < len; i++) {
		var pattern = patterns[i];
		var matchPattern = parentPattern + slashify(pattern);
		var re = pathToRegexp(matchPattern);
		var params = re.exec(path);
		var value = routes[pattern];

		if (params !== null) {
			if (typeof value === 'function') {
				return {
					path,
					pattern: matchPattern,
					value: value.apply(null, params.slice(1)),
					params: params.slice(1)
				};
			} else if (isPlainObject(value)) {
				return match(path, value, matchPattern);
			}
			return {
				path,
				pattern: matchPattern,
				value,
				params: params.slice(1)
			};
		} else if (isPlainObject(value)) {
			var child = match(path, value, matchPattern);
			if (child.pattern !== null) {
				return child;
			}
		}
	}

	return {
		path: null,
		pattern: null,
		value: null,
		params: null
	};
}

function slashify(val) {
	if (val[0] !== '/') {
		return '/' + val;
	}
	return val;
}
