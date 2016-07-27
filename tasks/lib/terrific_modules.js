/*
 * grunt-terrific-modules
 * https://github.com/smollweide/grunt-terrific-modules
 *
 * Copyright (c) 2014 Jan Widmer, Simon Mollweide
 * Licensed under the MIT license.
 */

/* eslint complexity: 0 */

/**
 *
 * generates a Module
 *
 * @constructor ModuleGenerator
 * @author Simon Mollweide
 * @namespace grunt
 * @param {Object} options - the class options
 * @returns {void}
 */
function ModuleGenerator(options) {
	this.init(options);
}

ModuleGenerator.prototype = {

	constructor: ModuleGenerator,

	/**
	 *
	 * called by constructor
	 *
	 * @method init
	 * @param {Object} options - the class options
	 * @returns {*} returns context
	 */
	init: function (options) {

		var _this = this;

		_this.options = options;
		_this.args = _this.options.args;
		_this.taskPlaceholder = _this.options.options.placeholder;
		_this.taskFiles = _this.options.options.files;
		_this.triggerFile = _this.options.options.triggerFile;
		_this.complete = _this.options.options.complete;

		_this._data = {};

		return this;
	},


	/**
	 *
	 * @method detectArgs
	 * @returns {*} returns context
	 */
	detectArgs: function () {
		var _this = this,
			args = _this.args,
			argLen = args.length,
			patternTemplate = /^%/,
			patternAuthor = /^@/,
			patternType = /^-/,
			name,
			item,
			i = 1;

		_this._data = {};

		if (argLen <= 0) {
			_this.errorArgs();
			return this;
		}

		_this._console('log', '');
		_this._console('log', '');
		_this._console('log', '----- generator-module -----');
		_this._console('log', '');

		name = args[0];

		_this._data.module = {
			name: name,
			nameU: _this._toUnderscore(name),
			nameC: _this._toCamelCase(name)
		};

		_this._data.type = {
			name: 'atoms',
			nameU: _this._toUnderscore('atoms'),
			nameC: _this._toCamelCase('atoms')
		};

		if (argLen <= 1) {
			return this;
		}

		for (i; i < argLen; i += 1) {
			item = args[i];

			if (item.search(patternAuthor) >= 0) {
				_this._data.author = item.replace(patternAuthor, '');
			} else if (item.search(patternTemplate) >= 0) {

				name = item.replace(patternTemplate, '');

				_this._data.template = {
					name: name,
					nameU: _this._toUnderscore(name),
					nameC: _this._toCamelCase(name)
				};
			} else if (item.search(patternType) >= 0) {

				name = item.replace(patternType, '');

				_this._data.type = {
					name: name,
					nameU: _this._toUnderscore(name),
					nameC: _this._toCamelCase(name)
				};

			} else {

				name = item;

				_this._data.skin = {
					name: name,
					nameU: _this._toUnderscore(name),
					nameC: _this._toCamelCase(name)
				};
			}
		}

		_this._data = _this.attachCustomReplacements(_this._data);

		return this;
	},

	/**
	 * @method attachCustomReplacements
	 * @param {Object} obj the object where custom attributes should be attached
	 * @returns {Object} the object where custom attributes were attached
	 */
	attachCustomReplacements: function (obj) {

		var _this = this;

		this._forIn(obj, function (key, value) {

			var val = value,
				underscoreCustom,
				camelCaseCustom;

			if (!_this.taskPlaceholder[key]) {
				val.nameUCustom = val.nameU;
				val.nameCCustom = val.nameC;
			}

			if (!_this.taskPlaceholder[key].underscoreCustom) {
				val.nameUCustom = val.nameU;
			} else {
				underscoreCustom = _this.taskPlaceholder[key].underscoreCustom;
				val.nameUCustom = underscoreCustom[1][val.nameU];
			}

			if (!_this.taskPlaceholder[key].camelCaseCustom) {
				val.nameCCustom = val.nameC;
			} else {
				camelCaseCustom = _this.taskPlaceholder[key].camelCaseCustom;
				val.nameCCustom = camelCaseCustom[1][val.nameC];
			}

		});

		return obj;
	},

	/**
	 *
	 * @method write
	 * @returns {*} returns context
	 */
	write: function () {

		var _this = this;

		if (typeof(_this._data.module) !== 'object') {
			return this;
		}

		_this.writeModule(_this._data.module, _this._data.author);

		if (typeof(_this._data.skin) === 'object') {
			_this.writeSkin(_this._data.module, _this._data.skin, _this._data.author);
		}

		if (typeof(_this._data.template) === 'object') {
			_this.writeTemplate(_this._data.module, _this._data.template, _this._data.author);
		}

		if (typeof(_this.triggerFile) === 'string') {
			_this.options.grunt.file.write(_this.triggerFile, '');
			_this._console('log', 'write file: ' + new Date());
		}

		if (typeof(_this.complete) === 'function') {
			_this.complete.call(_this, _this._data);
		}

		return this;
	},

	/**
	 * @method enrichWithReplacement
	 * @param {string} name of the replace part
	 * @param {Array} arr - the array which should be enriched
	 * @returns {void}
	 */
	enrichWithReplacement: function (name, arr) {
		var placeholder = this.taskPlaceholder,
			obj = this._data[name];

		if (!obj || !obj.name || !placeholder[name]) {
			return;
		}

		arr.push({
			_that: placeholder[name].underscore,
			_with: obj.nameU
		});

		arr.push({
			_that: placeholder[name].camelCase,
			_with: obj.nameC
		});

		if (placeholder[name].underscoreCustom) {
			arr.push({
				_that: placeholder[name].underscoreCustom[0],
				_with: placeholder[name].underscoreCustom[1][obj.nameU]
			});
		}

		if (placeholder[name].camelCaseCustom) {
			arr.push({
				_that: placeholder[name].camelCaseCustom[0],
				_with: placeholder[name].camelCaseCustom[1][obj.nameC]
			});
		}
	},

	/**
	 * @method getReplacements
	 * @returns {Array} array filled with the replacement objects
	 */
	getReplacements: function () {

		var out = [];

		this.enrichWithReplacement('module', out);
		this.enrichWithReplacement('type', out);
		this.enrichWithReplacement('skin', out);
		this.enrichWithReplacement('template', out);

		return out;
	},

	/**
	 *
	 * @method writeModule
	 * @param {Object} module - the module object
	 * @param {string} author - the given author
	 * @returns {*} returns context
	 */
	writeModule: function (module, author) {

		var _this = this,
			moduleFiles = _this.taskFiles.module;

		if (typeof(moduleFiles) !== 'object') {
			return this;
		}

		_this._console('log', 'write module: ' + module.nameU);
		_this._console('log', '-----------------------------');

		_this._for(moduleFiles, function () {
			_this.writeFile({
				src: this.src,
				dest: this.dest,
				folder: this.folder,
				name: module.nameU,
				template: this.template,
				enrichWith: this.enrichWith,
				author: author,
				replacement: _this.getReplacements()
			});
		});

		_this._console('log', '-----------------------------');
		_this._console('log', '');

		return this;
	},

	/**
	 *
	 * @method writeSkin
	 *
	 * @param {Object} module - the module object
	 * @param {Object} skin - the skin object
	 * @param {string} author - the author name
	 * @returns {*} returns context
	 */
	writeSkin: function (module, skin, author) {

		var _this = this,
			skinFiles = _this.taskFiles.skin;

		if (typeof(skinFiles) !== 'object') {
			return this;
		}

		_this._console('log', 'write skin: ' + skin.nameU + ' (' + module.nameU + ')');
		_this._console('log', '-----------------------------');

		_this._for(skinFiles, function () {
			_this.writeFile({
				src: this.src,
				dest: this.dest,
				folder: this.folder,
				name: module.nameU,
				template: this.template,
				enrichWith: this.enrichWith,
				author: author,
				replacement: _this.getReplacements()
			});
		});

		_this._console('log', '-----------------------------');
		_this._console('log', '');

		return this;

	},

	/**
	 *
	 * @method writeTemplate
	 * @param {Object} module - the module object
	 * @param {Object} template - the template object
	 * @param {string} author - the author name
	 * @returns {*} returns context
	 */
	writeTemplate: function (module, template, author) {

		var _this = this,
			filesTemplate = _this.taskFiles.template;

		_this._console('log', 'writeTemplate');

		if (typeof(filesTemplate) !== 'object') {
			return this;
		}

		_this._console('log', 'write template: ' + template.nameU + ' (' + module.nameU + ')');
		_this._console('log', '-----------------------------');

		_this._for(filesTemplate, function () {
			_this.writeFile({
				src: this.src,
				dest: this.dest,
				folder: this.folder,
				name: module.nameU,
				template: this.template,
				author: author,
				enrichWith: this.enrichWith,
				replacement: _this.getReplacements()
			});
		});

		_this._console('log', '-----------------------------');
		_this._console('log', '');

		return this;
	},

	/**
	 *
	 * @method writeFile
	 * @param {Object} options - the given options
	 * @returns {*} returns context
	 */
	writeFile: function (options) {

		var _this = this,
			placeholder = _this.taskPlaceholder,
			grunt = _this.options.grunt,
			path = options.dest + '/' + options.template,
			templatePath = options.src + '/' + options.template,
			content = '',
			pattern;


		// add author if exist
		if (typeof(options.author) === 'string') {
			options.replacement.push({
				_that: placeholder.author,
				_with: options.author
			});
		}

		// replace file path and content
		content = grunt.file.read(templatePath);
		_this._for(options.replacement, function () {
			pattern = new RegExp(this._that, 'g');
			path = path.replace(pattern, this._with);
			content = content.replace(pattern, this._with);
		});

		// check file exist
		if (grunt.file.exists(path)) {
			_this._console('log', 'file exist: ' + path);
			return this;
		}

		// write file
		_this._console('log', 'write file: ' + path);
		grunt.file.write(path, content);

		// write enrichWith
		_this.enrichWith(options);

		return this;
	},

	/**
	 *
	 * enrich "enrichWith.src" with "enrichWith.template" at position "enrichWith.placeholder"
	 *
	 * @method enrichWith
	 * @param {Object} options - the given options
	 * @returns {*} returns context
	 */
	enrichWith: function (options) {

		var _this = this,
			grunt = _this.options.grunt,
			pathSrc,
			pathTemplate,
			outlet,
			content,
			pattern,
			pattern2;

		if (typeof(options.enrichWith) !== 'object') {
			return this;
		}

		pathSrc = options.enrichWith.src;
		pathTemplate = options.enrichWith.template;
		outlet = grunt.file.read(pathTemplate);

		_this._for(options.replacement, function () {
			pattern = new RegExp(this._that, 'g');
			pathSrc = pathSrc.replace(pattern, this._with);
			outlet = outlet.replace(pattern, this._with);
		});

		pattern2 = new RegExp(options.enrichWith.placeholder.replace(/U\+0025/g, '%'), 'g');

		if (!grunt.file.exists(pathSrc)) {
			return this;
		}

		content = grunt.file.read(pathSrc);
		if (content.search(pattern2) < 0) {
			_this._console('log', 'placeholder (' + options.enrichWith.placeholder + ') not found in file "' + pathSrc + '"');
			return this;
		}
		content = content.replace(pattern2, outlet);

		grunt.file.write(pathSrc, content);
		_this._console('log', 'change file : ' + pathSrc);

		return this;

	},

	/**
	 *
	 * @method errorArgs
	 * @returns {*} returns context
	 */
	errorArgs: function () {

		this._console('log', '');
		this._console('log', '');
		this._console('log', '---------- error ----------');
		this._console('log', 'terrific-modules: no arguments');
		this._console('log', '');
		this._console('log', '---------- help -----------');
		this._console('log', 'add module');
		this._console('log', 'grunt terrific_modules:moduleName:@authorName');
		this._console('log', 'or add skin');
		this._console('log', 'grunt terrific_modules:moduleName:@authorName:skinName');
		this._console('log', 'or add template');
		this._console('log', 'grunt terrific_modules:moduleName:@authorName:%templateName');
		this._console('log', 'or add type');
		this._console('log', 'grunt terrific_modules:moduleName:-typeName:@authorName');
		this._console('log', 'or add all');
		this._console('log', 'grunt terrific_modules:moduleName:-typeName:@authorName:skinName:%templateName');

		return this;
	},

	/**
	 *
	 * @method _console
	 *
	 * @param {string} type - console type (error|log|success)
	 * @param {*} value - the console value
	 * @returns {*} returns context
	 * @private
	 */
	_console: function (type, value) {

		var _this = this,
			log = function (val) {
				_this.options.grunt.log.writeln(val);
			};

		if (type === 'dir') {
			log(JSON.stringify(value));
			return this;
		}

		log(value);
		return this;
	},

	/**
	 *
	 * @method _for
	 * @param {Array} array - the loop array
	 * @param {function} onLoop - loop callback
	 * @returns {void}
	 * @private
	 */
	_for: function (array, onLoop) {
		var i = 0,
			len = array.length;

		for (i; i < len; i += 1) {
			onLoop.call(array[i], i);
		}

	},

	/**
	 *
	 * @method _forIn
	 * @param {Object} obj - object that should be looped
	 * @param {function} onLoop returns key value pair
	 * @returns {void}
	 * @private
	 */
	_forIn: function (obj, onLoop) {
		/* eslint-disable */
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				onLoop.call(this, key, obj[key]);
			}
		}
		/* eslint-enable */
	},

	/**
	 *
	 * @method _toCamelCase
	 *
	 * @param {string} value - the value
	 * @returns {string} camelCase value
	 * @private
	 */
	_toCamelCase: function (value) {

		var val = value;

		if (typeof(value) !== 'string') {
			return value;
		}

		val = val.replace(/^[a-z]/, function () {
			return arguments[0].toUpperCase();
		});
		return val.replace(/-[a-z]/g, function () {
			return arguments[0].toUpperCase().replace('-', '');
		});
	},

	/**
	 *
	 * @method _toUnderscore
	 *
	 * @param {string} value - the value
	 * @returns {string} Underscore value
	 * @private
	 */
	_toUnderscore: function (value) {

		if (typeof(value) !== 'string') {
			return value;
		}

		return value
			.replace(/[A-Z]/g, '-$&')
			.toLowerCase()
			.replace(/^-/, '')
			.replace(/--/g, '-');
	}
};

exports.init = function (grunt) {

	var exports = {},
		moduleGenerator;

	exports.run = function (options) {
		moduleGenerator = new ModuleGenerator({
			grunt: grunt,
			args: options.arguments,
			options: options.options
		});

		moduleGenerator.detectArgs();
		moduleGenerator.write();
	};

	exports.getPrototype = function () {
		return ModuleGenerator.prototype;
	};

	exports.getClass = function () {
		return ModuleGenerator;
	};

	return exports;
};
