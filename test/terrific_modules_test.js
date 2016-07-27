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


var grunt = require('grunt');
var ModuleGenerator = require('../tasks/lib/terrific_modules.js').init(grunt);
var _string = 'string';
var _emptyString = '';
var _undefined = undefined;
var _null = null;
var _function = function () {};
var _object = {};
var _array = [];
var _number = 1;
var _numberMinus = -10;
var _integer = 12;
var _integerMinus = -14;
var _float = 1.2;
var _floatMinus = -13.2;
var allTypes = [
	_string, _emptyString, _undefined, _null,
	_function, _object, _array, _number,
	_numberMinus, _integer, _integerMinus,
	_float, _floatMinus
];
var placeholder = {
	module: {
		underscore: 'T_module',
		camelCase: 'T_Module'
	},
	skin: {
		underscore: 'T_skin',
		camelCase: 'T_Skin'
	},
	template: {
		underscore: 'T_template',
		camelCase: 'T_Template'
	},
	type: {
		underscore: 'T_type',
		underscoreCustom: [
			'T_customType',
			{
				atoms: 'a',
				molecules: 'm',
				organisms: 'o'
			}
		],
		camelCase: 'T_Type',
		camelCaseCustom: [
			'T_CustomType',
			{
				Atoms: 'a',
				Molecules: 'm',
				Organisms: 'o'
			}
		]
	},
	author: 'T_author'
};
var getPrototype = function () {
	return ModuleGenerator.getPrototype();
};

var getClass = function () {
	return ModuleGenerator.getClass();
};

var _for = function (array, callback) {
	var i = 0,
		len = array.length;

	for (i; i < len; i += 1) {
		callback.call(array[i], i);
	}
};

exports.terrific_modules = {
	setUp: function (done) {

		done();
	},
	toCamelCase: function (test) {

		var instance = getPrototype();
		var actualArr = [];
		var expectedArr = [];

		actualArr.push('test');
		expectedArr.push('Test');

		actualArr.push('äsdasdfa');
		expectedArr.push('äsdasdfa');

		actualArr.push('?dfdsfs');
		expectedArr.push('?dfdsfs');

		_for(allTypes, function (i) {
			if (allTypes[i] !== 'string') {
				actualArr.push(allTypes[i]);
				expectedArr.push(allTypes[i]);
			}
		});

		_for(actualArr, function (i) {
			test.equal(expectedArr[i], instance._toCamelCase(actualArr[i]), actualArr[i] + ' -> ' + expectedArr[i]);
		});

		test.done();
	},
	toUnderscore: function (test) {

		var instance = getPrototype();
		var actualArr = [];
		var expectedArr = [];

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

		_for(allTypes, function (i) {
			if (allTypes[i] !== 'string') {
				actualArr.push(allTypes[i]);
				expectedArr.push(allTypes[i]);
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

		argsArray.push({
			args: ['modulename', '%templatename', 'skinname', '@authorname', '-type'],
			module: 'modulename',
			skin: 'skinname',
			template: 'templatename',
			author: 'authorname',
			type: 'type'
		});

		argsArray.push({
			args: ['modulename', '-type', '%templatename', 'skinname', '@authorname'],
			module: 'modulename',
			skin: 'skinname',
			template: 'templatename',
			author: 'authorname',
			type: 'type'
		});

		_for(argsArray, function (i) {

			var item = argsArray[i];
			var instance = new _class({
				grunt: grunt,
				args: item.args,
				options: {
					placeholder: placeholder
				}
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
			if (item.type !== undefined) {
				test.equal(instance._data.type.name, item.type, 'detectArgs');
			}

		});

		test.done();
	}
};
