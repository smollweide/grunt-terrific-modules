'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

var _string = 'string',
	_emptyString = '',
	_undefined,
	_null = null,
	_function = function () {},
	_object = {},
	_array = [],
	_number = 1,
	_numberMinus = -10,
	_integer = 12,
	_integerMinus = -14,
	_float = 1.2,
	_floatMinus = -13.2,
	alltypes = [
		_string, _emptyString, _undefined, _null,
		_function, _object, _array, _number,
		_numberMinus, _integer, _integerMinus,
		_float, _floatMinus
	]
;




exports.terrific_modules = {
	setUp: function (done) {

		done();
	},
	toCamelCase: function (test) {

		var instance = getPrototype(),
			actualArr = [],
			expectedArr = []
		;

		actualArr.push('test');
		expectedArr.push('Test');

		actualArr.push('äsdasdfa');
		expectedArr.push('äsdasdfa');

		actualArr.push('?dfdsfs');
		expectedArr.push('?dfdsfs');

		_for(alltypes, function (i) {
			if (alltypes[i] !== 'string') {
				actualArr.push(alltypes[i]);
				expectedArr.push(alltypes[i]);
			}
		});

		_for(actualArr, function (i) {
			test.equal(expectedArr[i], instance._toCamelCase(actualArr[i]), actualArr[i] + ' -> ' + expectedArr[i]);
		});

		test.done();
	},
	toUnderscore: function (test) {

		var instance = getPrototype(),
			actualArr = [],
			expectedArr = []
			;

		actualArr.push('testTest');
		expectedArr.push('test-test');

		actualArr.push('TestTest');
		expectedArr.push('test-test');

		actualArr.push('Test-Test');
		expectedArr.push('test-test');

		actualArr.push('äsdasdfa');
		expectedArr.push('äsdasdfa');

		actualArr.push('?dfdsfs');
		expectedArr.push('?dfdsfs');

		_for(alltypes, function (i) {
			if (alltypes[i] !== 'string') {
				actualArr.push(alltypes[i]);
				expectedArr.push(alltypes[i]);
			}
		});

		_for(actualArr, function (i) {
			test.equal(expectedArr[i], instance._toUnderscore(actualArr[i]), actualArr[i] + ' -> ' + expectedArr[i]);
		});

		test.done();
	},
	detectArgs: function (test) {

		var _class = getClass(),
			argsArray = [];

		argsArray.push({
			args: ['modulename'],
			module: 'modulename',
			skin: undefined,
			template: undefined,
			author: undefined
		});

		argsArray.push({
			args: ['modulename', '@authorname'],
			module: 'modulename',
			skin: undefined,
			template: undefined,
			author: 'authorname'
		});

		argsArray.push({
			args: ['modulename', '@authorname', 'skinname', '%templatename'],
			module: 'modulename',
			skin: 'skinname',
			template: 'templatename',
			author: 'authorname'
		});

		argsArray.push({
			args: ['modulename', '@authorname', '%templatename', 'skinname'],
			module: 'modulename',
			skin: 'skinname',
			template: 'templatename',
			author: 'authorname'
		});

		argsArray.push({
			args: ['modulename', '%templatename', '@authorname', 'skinname'],
			module: 'modulename',
			skin: 'skinname',
			template: 'templatename',
			author: 'authorname'
		});

		argsArray.push({
			args: ['modulename', '%templatename', 'skinname', '@authorname'],
			module: 'modulename',
			skin: 'skinname',
			template: 'templatename',
			author: 'authorname'
		});

		_for(argsArray, function (i) {

			var item = argsArray[i],
				instance = new _class({
				grunt: grunt,
				args: item.args,
				options: {}
			});

			instance.detectArgs();
			test.equal(instance._data.module.name, item.module, 'detectArgs');
			if (item.skin !== undefined) {
				test.equal(instance._data.skin.name, item.skin, 'detectArgs');
			}
			if (item.template !== undefined) {
				test.equal(instance._data.template.name, item.template, 'detectArgs');
			}
			if (item.author !== undefined) {
				test.equal(instance._data.author, item.author, 'detectArgs');
			}

		});

		test.done();
	}
};

var getPrototype = function () {
	var ModuleGenerator = require('../tasks/lib/terrific_modules.js').init(grunt);
	return ModuleGenerator.getPrototype();
};

var getClass = function () {
	var ModuleGenerator = require('../tasks/lib/terrific_modules.js').init(grunt);
	return ModuleGenerator.getClass();
};

var _for = function (array, callback) {
	var i = 0,
		len = array.length
		;

	for (i; i < len; i += 1) {
		callback.call(array[i], i);
	}

};
