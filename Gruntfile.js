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
			resource: 'resource/module'
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
					author: 'T_author'
				},
				files: {
					module: [
						{
							src: '<%=paths.resource%>',
							dest: '<%=paths.modules%>/T_module',
							template: 'T_module.jsp'
						},
						{
							src: '<%=paths.resource%>',
							dest: '<%=paths.modules%>/T_module',
							template: 'T_module.readme.md'
						},
						{
							src: '<%=paths.resource%>',
							dest: '<%=paths.modules%>/T_module/js',
							template: 'T_module.js'
						},
						{
							src: '<%=paths.resource%>',
							dest: '<%=paths.modules%>/T_module/css',
							template: 'T_module.less'
						},
						{
							src: '<%=paths.resource%>',
							dest: '<%=paths.modules%>/T_module/i18n',
							template: 'T_module.properties'
						},
						{
							src: '<%=paths.resource%>',
							dest: '<%=paths.tags%>',
							template: 'T_module.tag'
						}
					],
					skin: [
						{
							src: '<%=paths.resource%>',
							dest: '<%=paths.modules%>/T_module/js',
							template: 'T_module.skin.T_skin.js'
						},
						{
							src: '<%=paths.resource%>',
							dest: '<%=paths.modules%>/T_module/css',
							template: 'T_module.skin.T_skin.less'
						}
					],
					template: [
						{
							src: '<%=paths.resource%>',
							dest: '<%=paths.modules%>/T_module',
							template: 'T_module-T_template.jsp',
							enrichWith: {
								src: '<%=paths.tags%>/T_module.tag',
								// use UTF8 code for % (U+0025)
								placeholder: '<U+0025-- outlet.template --U+0025>',
								template: '<%=paths.resource%>/T_module.template.tag'
							}
						}
					]
				},
				triggerFile: 'triggerfile',
				complete: function (data) {

				}
			}
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
