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
						underscore: 'tcdefault',
						camelCase: 'Tcdefault'
					},
					skin: {
						underscore: 'skindefault',
						camelCase: 'Skindefault'
					},
					template: {
						underscore: 'templatedefault',
						camelCase: 'Templatedefault'
					},
					author: '{author}'
				}
			},
			filesModule: [
				{
					src: '<%=app.paths.generator_resource%>',
					dest: '<%=app.paths.generator_out%>/tcdefault',
					template: 'tcdefault.jsp'
				},
				{
					src: '<%=app.paths.generator_resource%>',
					dest: '<%=app.paths.generator_out%>/tcdefault',
					template: 'tcdefault.readme.md'
				},
				{
					src: '<%=app.paths.generator_resource%>',
					dest: '<%=app.paths.generator_out%>/tcdefault/js',
					template: 'tcdefault.js'
				},
				{
					src: '<%=app.paths.generator_resource%>',
					dest: '<%=app.paths.generator_out%>/tcdefault/css',
					template: 'tcdefault.less'
				},
				{
					src: '<%=app.paths.generator_resource%>',
					dest: '<%=app.paths.generator_out%>/tcdefault/i18n',
					template: 'tcdefault.properties'
				},
				{
					src: '<%=app.paths.generator_resource%>',
					dest: '<%=app.paths.generator_out_tag%>',
					template: 'tcdefault.tag'
				}
			],
			filesSkin: [
				{
					src: '<%=app.paths.generator_resource%>',
					dest: '<%=app.paths.generator_out%>/tcdefault/js',
					template: 'tcdefault.skin.skindefault.js'
				},
				{
					src: '<%=app.paths.generator_resource%>',
					dest: '<%=app.paths.generator_out%>/tcdefault/css',
					template: 'tcdefault.skin.skindefault.less'
				}
			],
			filesTemplate: [
				{
					src: '<%=app.paths.generator_resource%>',
					dest: '<%=app.paths.generator_out%>/tcdefault',
					template: 'tcdefault-templatedefault.jsp',
					belongsTo: {
						src: '<%=app.paths.generator_out_tag%>/tcdefault.tag',
						placeholder: '<%-- outlet.template --%>',
						template: '<%=app.paths.generator_resource%>/tcdefault.template.tag'
					}
				}
			]
		},

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
