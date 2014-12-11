/*
 * grunt-terrific-modules
 * https://github.com/smollweide/grunt-terrific-modules
 *
 * Copyright (c) 2014 Jan Widmer, Simon Mollweide
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	var moduleGenerator = require('./lib/terrific_modules.js').init(grunt);

	grunt.registerTask('terrific_modules', 'A grunt module generator for terrific modules', function () {
		moduleGenerator.run({
			arguments: arguments,
			options: this.options({})
		});
	});

};
