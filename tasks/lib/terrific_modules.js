/*
 * grunt-terrific-modules
 * https://github.com/smollweide/grunt-terrific-modules
 *
 * Copyright (c) 2014 Jan Widmer, Simon Mollweide
 * Licensed under the MIT license.
 */

'use strict';

exports.init = function (grunt) {

	var exports = {};

	exports.run = function (options) {
		new ModuleGenerator({
			grunt: grunt,
			args: options.arguments,
			options: options.options
		});
	};

	return exports;
};


/**
 *
 * @class ModuleGenerator
 * @author Simon Mollweide
 * @namespace grunt
 * @param {object} options
 * @constructor
 *
 * generates a Module
 */
function ModuleGenerator(options) {
	this.init(options);
}

ModuleGenerator.prototype = {
	constructor : ModuleGenerator,

	/**
	 *
	 * @method init
	 * called by constructor
	 * @param {object} options
	 */
	init: function (options) {

		var self = this;

		self.options = options;
		self.args = self.options.args;
		self.taskPlaceholder = self.options.options.placeholder;
		self.taskFiles = self.options.options.files;

		self.detectArgs();

		return this;
	},

	/**
	 *
	 * @method detectArgs
	 *
	 * @returns {*}
	 */
	detectArgs: function () {
		var self = this,
			args = self.args,
			argLen = args.length,
			patternTemplate = /^%/,
			patternAuthor = /^@/,
			data = {},
			name,
			i = 1
			;

		if (argLen <= 0) {
			self.errorArgs();
			return this;
		}

		self._console('log', '');
		self._console('log', '');
		self._console('log', '----- generator-module -----');
		self._console('log', '');

		name = args[0];

		data.module = {
			name: name,
			nameU: self._toUnderscore(name),
			nameC: self._toCamelCase(name)
		};

		//self._console('dir', data.module.nameU);

		if (argLen <= 1) {
			self.filterData(data);
			return this;
		}

		for (i; i < argLen; i += 1) {
			var item = args[i];
			if (item.search(patternAuthor) >= 0) {
				data.author = item.replace(patternAuthor, '');
			} else if (item.search(patternTemplate) >= 0) {

				name = item.replace(patternTemplate, '');

				data.template = {
					name: name,
					nameU: self._toUnderscore(name),
					nameC: self._toCamelCase(name)
				};
			} else {

				name = item;

				data.skin = {
					name: name,
					nameU: self._toUnderscore(name),
					nameC: self._toCamelCase(name)
				};
			}
		}

		self.filterData(data);

		return this;
	},

	/**
	 *
	 * @method filterData
	 *
	 * @param {object} data
	 * @returns {*}
	 */
	filterData: function (data) {

		var self = this;

		self._console('log', 'filterData');

		if (typeof(data.module) !== 'object') {
			return this;
		}

		self.writeModule(data.module, data.author);

		if (typeof(data.skin) === 'object') {
			self.writeSkin(data.module, data.skin, data.author);
		}

		if (typeof(data.template) === 'object') {
			self.writeTemplate(data.module, data.template, data.author);
		}

		return this;
	},

	/**
	 *
	 * @method writeModule
	 *
	 * @param {object} module
	 * @param {string} author
	 * @returns {*}
	 */
	writeModule: function (module, author) {

		var self = this,
			placeholder = self.taskPlaceholder,
			moduleFiles = self.taskFiles.module
			;

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
				author: author,
				replacement: [
					{
						_that: placeholder.module.underscore,
						_with: module.nameU
					},
					{
						_that: placeholder.module.camelCase,
						_with: module.nameC
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
	 * @param {object} module
	 * @param {object} skin
	 * @param {string} author
	 * @returns {*}
	 */
	writeSkin: function (module, skin, author) {

		var self = this,
			placeholder = self.taskPlaceholder,
			skinFiles = self.taskFiles.skin
			;

		if (typeof(skinFiles) !== 'object') {
			return this;
		}

		self._console('log', 'write skin: ' + skin.nameU + ' ('  + module.nameU + ')');
		self._console('log', '-----------------------------');

		self._for(skinFiles, function () {
			self.writeFile({
				src: this.src,
				dest: this.dest,
				folder: this.folder,
				name: module.nameU,
				template: this.template,
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
	 *
	 * @param {object} module
	 * @param {object} template
	 * @param {string} author
	 * @returns {*}
	 */
	writeTemplate: function (module, template, author) {

		var self = this,
			placeholder = self.taskPlaceholder,
			filesTemplate = self.taskFiles.template
			;

		self._console('log', 'writeTemplate');

		if (typeof(filesTemplate) !== 'object') {
			return this;
		}

		self._console('log', 'write template: ' + template.nameU + ' ('  + module.nameU + ')');
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
	 *
	 * @param {object} options
	 * @returns {*}
	 */
	writeFile: function (options) {

		var self = this,
			placeholder = self.taskPlaceholder,
			grunt = self.options.grunt,
			path = options.dest + '/' + options.template,
			templatePath = options.src + '/' + options.template,
			content = '',
			pattern
			;


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
	 * @method enrichWith
	 *
	 * @description enrich "enrichWith.src" with "enrichWith.template" at position "enrichWith.placeholder"
	 * @param {object} options
	 * @returns {*}
	 */
	enrichWith: function (options) {

		var self = this,
			grunt = self.options.grunt,
			pathSrc,
			pathTemplate,
			outlet,
			content,
			pattern,
			pattern2
		;

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

		if (content.search(pattern2) <= 0) {
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
	 *
	 * @returns {*}
	 */
	errorArgs: function() {

		this._console('log', '');
		this._console('log', '');
		this._console('log', '---------- error ----------');
		this._console('log', 'generator-module: no arguments');
		this._console('log', '');
		this._console('log', '---------- help -----------');
		this._console('log', 'grunt module:moduleName');
		this._console('log', 'or');
		this._console('log', 'grunt module:moduleName:skinName');

		return this;
	},

	/**
	 *
	 * @method _console
	 *
	 * @param {string} type
	 * @param {*} value
	 * @returns {*}
	 * @private
	 */
	_console: function (type, value) {

		var self = this,
			key,
			log = function (value) {
				self.options.grunt.log.writeln(value);
			};

		if (type === 'dir') {
			for(key in value) {
				if (value.hasOwnProperty(key)) {
					log(key + ': ' + value[key]);
				}
			}
			return this;
		}

		log(value);
		return this;
	},

	/**
	 *
	 * @method _for
	 *
	 * @param {array} array
	 * @param {object} callback
	 * @private
	 */
	_for: function (array, callback) {
		var i = 0,
			len = array.length
			;

		for (i; i < len; i += 1) {
			callback.call(array[i], i);
		}

	},

	/**
	 *
	 * @method _toCamelCase
	 *
	 * @param {string} name
	 * @returns {string}
	 * @private
	 */
	_toCamelCase: function (name) {
		name = name.replace(/^[a-z]/, function () {
			return arguments[0].toUpperCase();
		});
		return name.replace(/-[a-z]/g, function () {
			return arguments[0].toUpperCase().replace('-', '');
		});
	},

	/**
	 *
	 * @method _toUnderscore
	 *
	 * @param {string} name
	 * @returns {string}
	 * @private
	 */
	_toUnderscore: function (name) {
		return name.replace(/[A-Z]/g, '-$&').toLowerCase();
	}
};
