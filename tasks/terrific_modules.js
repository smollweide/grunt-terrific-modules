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

	grunt.registerMultiTask('terrific_modules', 'A grunt module generator for terrific modules', function () {
		// Merge task-specific and/or target-specific options with these defaults.
		var consoleDir, consoleLog,
			options = this.options({
			punctuation: '.',
			separator: ', '
		});

		consoleDir = function (value) {

			var key;

			for (key in value) {
				if (value.hasOwnProperty(key)) {
					grunt.log.writeln(key + ': ' + value[key]);
				}
			}

		};

		consoleLog = function (value) {
			grunt.log.writeln(value);
		};

		consoleLog('this:');
		consoleDir(this.files[0]);

		// Iterate over all specified file groups.
		this.files.forEach(function (f) {
			// Concat specified files.
			var src = f.src.filter(function (filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function (filepath) {
				// Read file source.
				return grunt.file.read(filepath);
			}).join(grunt.util.normalizelf(options.separator));

			// Handle options.
			src += options.punctuation;

			// Write the destination file.
			grunt.file.write(f.dest, src);

			// Print a success message.
			grunt.log.writeln('File "' + f.dest + '" created.');
		});




	});

};
