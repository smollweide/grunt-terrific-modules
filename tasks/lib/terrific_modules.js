/*
 * grunt-terrific-modules
 * https://github.com/smollweide/grunt-terrific-modules
 *
 * Copyright (c) 2014 Jan Widmer, Simon Mollweide
 * Licensed under the MIT license.
 */

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

		var self = this;

		self.options = options;
		self.args = self.options.args;
		self.taskPlaceholder = self.options.options.placeholder;
		self.taskFiles = self.options.options.files;
		self.triggerFile = self.options.options.triggerFile;
		self.complete = self.options.options.complete;

		self._data = {};

		return this;
	},


	/**
	 *
	 * @method detectArgs
	 * @returns {*} returns context
	 */
	detectArgs: function () {
		var self = this,
			args = self.args,
			argLen = args.length,
			patternTemplate = /^%/,
			patternAuthor = /^@/,
			patternType = /^-/,
			name,
			item,
			i = 1;

		self._data = {};

		if (argLen <= 0) {
			self.errorArgs();
			return this;
		}

		self._console('log', '');
		self._console('log', '');
		self._console('log', '----- generator-module -----');
		self._console('log', '');

		name = args[0];

		self._data.module = {
			name: name,
			nameU: self._toUnderscore(name),
			nameC: self._toCamelCase(name)
		};

		self._data.type = {
			name: 'atoms',
			nameU: self._toUnderscore('atoms'),
			nameC: self._toCamelCase('atoms')
		};

		if (argLen <= 1) {
			return this;
		}

		for (i; i < argLen; i += 1) {
			item = args[i];

			if (item.search(patternAuthor) >= 0) {
				self._data.author = item.replace(patternAuthor, '');
			} else if (item.search(patternTemplate) >= 0) {

				name = item.replace(patternTemplate, '');

				self._data.template = {
					name: name,
					nameU: self._toUnderscore(name),
					nameC: self._toCamelCase(name)
				};
			} else if (item.search(patternType) >= 0) {

				name = item.replace(patternType, '');

				self._data.type = {
					name: name,
					nameU: self._toUnderscore(name),
					nameC: self._toCamelCase(name)
				};

			} else {

				name = item;

				self._data.skin = {
					name: name,
					nameU: self._toUnderscore(name),
					nameC: self._toCamelCase(name)
				};
			}
		}

		return this;
	},

	/**
	 *
	 * @method write
	 * @returns {*} returns context
	 */
	write: function () {

		var self = this;

		if (typeof(self._data.module) !== 'object') {
			return this;
		}

		self.writeModule(self._data.module, self._data.author);

		if (typeof(self._data.skin) === 'object') {
			self.writeSkin(self._data.module, self._data.skin, self._data.author);
		}

		if (typeof(self._data.template) === 'object') {
			self.writeTemplate(self._data.module, self._data.template, self._data.author);
		}

		if (typeof(self.triggerFile) === 'string') {
			self.options.grunt.file.write(self.triggerFile, '');
			self._console('log', 'write file: ' + new Date());
		}

		if (typeof(self.complete) === 'function') {
			self.complete.call(self, self._data);
		}

		return this;
	},

	/**
	 *
	 * @method writeModule
	 * @param {Object} module - the module object
	 * @param {string} author - the given author
	 * @returns {*} returns context
	 */
	writeModule: function (module, author) {

		var self = this,
			placeholder = self.taskPlaceholder,
			type = self._data.type,
			moduleFiles = self.taskFiles.module;

		if (typeof(moduleFiles) !== 'object') {
			return this;
		}

		self._console('log', 'write module: ' + module.nameU);
		self._console('log', '-----------------------------');

		self._for(moduleFiles, function () {
			self.writeFile({
				src: this.src,
				dest: this.dest,
				folder: this.folder,
				name: module.nameU,
				template: this.template,
				enrichWith: this.enrichWith,
				author: author,
				replacement: [
					{
						_that: placeholder.module.underscore,
						_with: module.nameU
					},
					{
						_that: placeholder.module.camelCase,
						_with: module.nameC
					},
					{
						_that: placeholder.type.underscore,
						_with: type.name
					}
				]
			});
		});

		self._console('log', '-----------------------------');
		self._console('log', '');

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

		var self = this,
			placeholder = self.taskPlaceholder,
			type = self._data.type,
			skinFiles = self.taskFiles.skin;

		if (typeof(skinFiles) !== 'object') {
			return this;
		}

		self._console('log', 'write skin: ' + skin.nameU + ' (' + module.nameU + ')');
		self._console('log', '-----------------------------');

		self._for(skinFiles, function () {
			self.writeFile({
				src: this.src,
				dest: this.dest,
				folder: this.folder,
				name: module.nameU,
				template: this.template,
				enrichWith: this.enrichWith,
				author: author,
				replacement: [
					{
						_that: placeholder.module.underscore,
						_with: module.nameU
					},
					{
						_that: placeholder.module.camelCase,
						_with: module.nameC
					},
					{
						_that: placeholder.skin.underscore,
						_with: skin.nameU
					},
					{
						_that: placeholder.skin.camelCase,
						_with: skin.nameC
					},
					{
						_that: placeholder.type.underscore,
						_with: type.name
					}
				]
			});
		});

		self._console('log', '-----------------------------');
		self._console('log', '');

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

		var self = this,
			placeholder = self.taskPlaceholder,
			type = self._data.type,
			filesTemplate = self.taskFiles.template;

		self._console('log', 'writeTemplate');

		if (typeof(filesTemplate) !== 'object') {
			return this;
		}

		self._console('log', 'write template: ' + template.nameU + ' (' + module.nameU + ')');
		self._console('log', '-----------------------------');

		self._for(filesTemplate, function () {
			self.writeFile({
				src: this.src,
				dest: this.dest,
				folder: this.folder,
				name: module.nameU,
				template: this.template,
				author: author,
				enrichWith: this.enrichWith,
				replacement: [
					{
						_that: placeholder.module.underscore,
						_with: module.nameU
					},
					{
						_that: placeholder.module.camelCase,
						_with: module.nameC
					},
					{
						_that: placeholder.template.underscore,
						_with: template.nameU
					},
					{
						_that: placeholder.template.camelCase,
						_with: template.nameC
					},
					{
						_that: placeholder.type.underscore,
						_with: type.name
					}
				]
			});
		});

		self._console('log', '-----------------------------');
		self._console('log', '');

		return this;
	},

	/**
	 *
	 * @method writeFile
	 * @param {Object} options - the given options
	 * @returns {*} returns context
	 */
	writeFile: function (options) {

		var self = this,
			placeholder = self.taskPlaceholder,
			grunt = self.options.grunt,
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
		self._for(options.replacement, function () {
			pattern = new RegExp(this._that, 'g');
			path = path.replace(pattern, this._with);
			content = content.replace(pattern, this._with);
		});

		// check file exist
		if (grunt.file.exists(path)) {
			self._console('log', 'file exist: ' + path);
			return this;
		}

		// write file
		self._console('log', 'write file: ' + path);
		grunt.file.write(path, content);

		// write enrichWith
		self.enrichWith(options);

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

		var self = this,
			grunt = self.options.grunt,
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

		self._for(options.replacement, function () {
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
			self._console('log', 'placeholder (' + options.enrichWith.placeholder + ') not found in file "' + pathSrc + '"');
			return this;
		}
		content = content.replace(pattern2, outlet);

		grunt.file.write(pathSrc, content);
		self._console('log', 'change file : ' + pathSrc);

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

		var self = this,
			log = function (val) {
				self.options.grunt.log.writeln(val);
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
