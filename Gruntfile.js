/*
 * grunt-terrific-modules
 * https://github.com/smollweide/grunt-terrific-modules
 *
 * Copyright (c) 2014 Jan Widmer, Simon Mollweide
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({

		paths: {
			root: 'web/webroot/WEB-INF',
			terrific: '<%=paths.root%>/terrific',
			modules: '<%=paths.terrific%>/modules',
			tags: '<%=paths.root%>/tags',
			resource: 'resource'
		},

		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		// Configuration to be run (and then tested).
		terrific_modules: {
			options: {
				placeholder: {
					module: {
						underscore: '{module}',
						camelCase: '{Module}'
					},
					skin: {
						underscore: '{skin}',
						camelCase: '{Skin}'
					},
					template: {
						underscore: '{template}',
						camelCase: '{Template}'
					},
					author: '{author}'
				}
			},
			files: {
				module: [
					{
						src: '<%=paths.resource%>',
						dest: '<%=paths.modules%>/{module}',
						template: '{module}.jsp'
					},
					{
						src: '<%=paths.resource%>',
						dest: '<%=paths.modules%>/{module}',
						template: '{module}.readme.md'
					},
					{
						src: '<%=paths.resource%>',
						dest: '<%=paths.modules%>/{module}/js',
						template: '{module}.js'
					},
					{
						src: '<%=paths.resource%>',
						dest: '<%=paths.modules%>/{module}/css',
						template: '{module}.less'
					},
					{
						src: '<%=paths.resource%>',
						dest: '<%=paths.modules%>/{module}/i18n',
						template: '{module}.properties'
					},
					{
						src: '<%=paths.resource%>',
						dest: '<%=paths.tags%>',
						template: '{module}.tag'
					}
				]
			}
		},



		/*



		 */

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'terrific_modules', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
