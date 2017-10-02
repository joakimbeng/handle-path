import test from 'ava';
import handlePath from '../src';

test('one match', t => {
	const {value} = handlePath('/an/url', {
		'/an': 0,
		'/an/*': 1
	});
	t.is(value, 1);
});

test('one function match', t => {
	t.plan(1);
	handlePath('/an/url', {
		'/an': () => t.fail('Should not match!'),
		'/an/:item': item => t.is(item, 'url')
	});
});

test('one function match multiple params', t => {
	t.plan(2);
	handlePath('/an/url', {
		'/an': () => t.fail('Should not match!'),
		'/:type/:item': (type, item) => {
			t.is(type, 'an');
			t.is(item, 'url');
		}
	});
});

test('two function matches', t => {
	t.plan(1);
	handlePath('/an/url', {
		'/an/:item': item => t.is(item, 'url'),
		'/another/:url': () => t.fail('The first matching handler should be used!')
	});
});

test('returned path for match', t => {
	const {path} = handlePath('/an/url', {
		'/an/:item': item => item
	});
	t.is(path, '/an/url');
});

test('returned pattern for match', t => {
	const {pattern} = handlePath('/an/url', {
		'/an/:item': item => item
	});
	t.is(pattern, '/an/:item');
});

test('returned value for match', t => {
	const {value} = handlePath('/an/url', {
		'/an/:item': item => item
	});
	t.is(value, 'url');
});

test('returned params for match', t => {
	const {params} = handlePath('/an/url', {
		'/an/:item': item => item
	});
	t.deepEqual(params, ['url']);
});

test('returned result for no match', t => {
	const {path, value, pattern, params} = handlePath('/another/url', {
		'/an/:item': item => item
	});
	t.is(path, null);
	t.is(value, null);
	t.is(pattern, null);
	t.is(params, null);
});

test('one nested match', t => {
	t.plan(1);
	handlePath('/an/url', {
		'/an': {
			'/:item': item => t.is(item, 'url')
		}
	});
});

test('one nested base match', t => {
	t.plan(1);
	handlePath('/path', {
		'/path': {
			'/': () => t.pass()
		}
	});
});

test('one nested catch all match', t => {
	t.plan(1);
	handlePath('/path/lorem/ipsum', {
		'/path': {
			'/': () => t.fail('Wrong handler!'),
			'*': () => t.pass()
		}
	});
});

test('nested params match', t => {
	t.plan(3);
	handlePath('/path/lorem/ipsum', {
		'/:a': {
			'/:b': {
				'/:c': (a, b, c) => {
					t.is(a, 'path');
					t.is(b, 'lorem');
					t.is(c, 'ipsum');
				}
			}
		}
	});
});

test('nested routes does not match urls without /', t => {
	t.plan(1);
	handlePath('/pathlorem/ipsum', {
		'/path': {
			'*': () => t.fail('Wrong handler!')
		},
		'/path*': () => t.pass()
	});
});
