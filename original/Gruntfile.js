// Compiler notes
/*jshint node: true */
/*jshint globalstrict: true*/
"use strict";

module.exports = function(grunt) {

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Load npm tasks dynamically

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Grunt config

	grunt.initConfig({

		pkg                         : grunt.file.readJSON('package.json'),

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// App Config

		app: {
			// Banner
			banner: '/*\n * <%= pkg.title || pkg.name %> - <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n */\n',

			// Paths
			paths: {
				styles_lib          : 'web/webroot/WEB-INF/terrific/10-lib/css',
				styles_lib_static   : 'web/webroot/WEB-INF/terrific/10-lib/css-static',
				styles_app_utils    : 'web/webroot/WEB-INF/terrific/20-utils/css',
				styles_app_base     : 'web/webroot/WEB-INF/terrific/30-base/css',
				styles_app_base_definitions: 'web/webroot/WEB-INF/terrific/30-base/css-2-definitions',
				styles_app_base_elements: 'web/webroot/WEB-INF/terrific/30-base/css-elements',
				styles_app_base_groups: 'web/webroot/WEB-INF/terrific/30-base/css-groups',
				styles_app_base_develop: 'web/webroot/WEB-INF/terrific/30-base/css-x-develop',

				scripts_lib         : 'web/webroot/WEB-INF/terrific/10-lib/js',
				scripts_lib_plugins : 'web/webroot/WEB-INF/terrific/10-lib/js-plugins',
				scripts_lib_head    : 'web/webroot/WEB-INF/terrific/10-lib/js-head',
				scripts_lib_static  : 'web/webroot/WEB-INF/terrific/10-lib/js-static',
				scripts_app_utils   : 'web/webroot/WEB-INF/terrific/20-utils/js',
				scripts_app_base    : 'web/webroot/WEB-INF/terrific/30-base/js',

				terrific_all        : 'web/webroot/WEB-INF/terrific',
				modules             : 'web/webroot/WEB-INF/terrific/40-modules',
				templates           : 'web/webroot/WEB-INF/terrific/40-modules',
				assets_static       : 'web/webroot/WEB-INF/terrific/static',

				build               : 'web/webroot/_ui/static/cache',
				temp                : 'web/webroot/_ui/static/cache/tmp',
				build_scripts_static: 'web/webroot/_ui/static/cache/js',
				build_scripts_static_min	: 'web/webroot/_ui/static/cache/js/min',
				build_styles_static : 'web/webroot/_ui/static/cache/css',
				build_sourcemap_src : 'web/webroot/_ui/static/cache/sourcemap_src',
				build_assets_static : 'web/webroot/_ui/static',
				build_i18n          : 'web/webroot/WEB-INF/messages/frontend_base.properties',
				build_log           : 'web/webroot/WEB-INF/terrific',

				generator_resource	: 'web/webroot/WEB-INF/terrific/resources/tcdefault',
				generator_out		: 'web/webroot/WEB-INF/terrific/40-modules',
				generator_out_tag	: 'web/webroot/WEB-INF/tags/terrific/modules'
			},

			// Build Filenames
			build_filenames: {
				styles          : 'main.css',
				styles_min      : 'main.min.css',
				lessimports         : '@import.less',
				scripts_lib         : 'lib.js',
				scripts_lib_min     : 'lib.min.js',
				scripts_lib_map     : 'lib.map.js',
				scripts_app         : 'main.js',
				scripts_app_min     : 'main.min.js',
				scripts_app_map     : 'main.map.js',
				scripts_head        : 'head.js',
				scripts_head_min    : 'head.min.js',
				templates_modules_hbs: 'tmpl-mod-hbs.js',
				templates_modules_dot: 'tmpl-mod-dot.js',
				complexity_report   : 'complexity-report.xml',
				complexity_checkstyle: 'complexity-checkstyle.xml'
			},

			// URLs, Links
			urls: {
				sourcemap_root      : '/_ui/static/cache/sourcemap_src/',
                assets_static_base  : '/_ui/static/'
			}

			// Source Patterns
			,sources: {
				//// Styles
				styles_lib: [ // Lib AND App
					'<%=app.paths.styles_lib%>/*.{less,css}'                // CSS: Lib
				],
				styles_app: [ // Lib AND App
					'<%=app.paths.styles_app_utils%>/*.{less,css}',         // CSS: Utils
					'<%=app.paths.styles_app_base%>/*.{less,css}',          // CSS: Base
					'<%=app.paths.styles_app_base_definitions%>/*.{less,css}',// CSS: Definitions
					'<%=app.paths.styles_app_base_elements%>/*.{less,css}', // CSS: Base - Elements
					'<%=app.paths.styles_app_base_groups%>/*.{less,css}',   // CSS: Base - Groups
					'<%=app.paths.modules%>/**/*.{less,css}'                // CSS: Modules
				],
				styles_develop: [
					'<%=app.paths.styles_app_base_develop%>/*.{less,css}'   // CSS: Base - Develop
				],
				styles_static: [
					'<%=app.paths.styles_lib_static%>/*.css'                // CSS: Static Files (Lib, ...)
				],

				//// Scripts
				scripts_lib: [
					'<%=app.paths.scripts_lib%>/*.js',                      // JS: Lib
					'<%=app.paths.scripts_lib_plugins%>/*.js'               // JS: Lib - Plugins
				],
				scripts_head: [
					'<%=app.paths.scripts_lib_head%>/*.js'                  // JS: Lib - Head
				],
				scripts_static: [
					'<%=app.paths.scripts_lib_static%>/*.js'                // JS: Static Files (Lib, ...)
				],
				scripts_app: [
					'<%=app.paths.scripts_app_utils%>/*.js',                // JS: Utils
					'<%=app.paths.scripts_app_base%>/*.js',                 // JS: Base
					'<%=app.paths.modules%>/**/*.js'                        // JS: Modules
				],

				//// Misc
				templates_modules_hbs: [
					'<%=app.paths.modules%>/**/*.hbs'                       // Module Templates (hbs)
				],
				templates_modules_dot: [
					'<%=app.paths.modules%>/**/*.dot'                       // Module Templates (dot)
				],
				i18n_modules: [
					'<%=app.paths.modules%>/**/*.properties'                // Module I18n Properties
				],
				sourcemap_src_relative: [
					'10-lib/**/*.js',     '10-lib/**/*.less',
					'20-utils/**/*.js',   '20-utils/**/*.less',
					'30-base/**/*.js',    '30-base/**/*.less',
					'40-modules/**/*.js', '40-modules/**/*.less'
				],
				assets_static: [
					'<%=app.paths.assets_static%>/**'
				],
				assets_static_relative: [
					'media/**', 'fonts/**', 'mock/**'
				]

			}

		},

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Tasks Config

		// [grunt-contrib-jshint] Lint files
		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: ['Gruntfile.js']
			},
			scripts_app: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: ['<%=app.sources.scripts_app%>']
			}
		},

		// [grunt-less-imports] LESS, Generate Imports
		less_imports: {
			styles: {
				options: {},
				src     : ['<%=app.sources.styles_lib%>', '<%=app.sources.styles_app%>', '<%=app.sources.styles_develop%>'],
				dest    : '<%=app.paths.temp%>/<%=app.build_filenames.lessimports%>'
			},

			styles_dist: {
				options: {},
				src     : ['<%=app.sources.styles_lib%>', '<%=app.sources.styles_app%>'],
				dest    : '<%=app.paths.temp%>/<%=app.build_filenames.lessimports%>'
			}
		},

		// [grunt-contrib-less] LESS Compile
		less: {
			styles: {
				options: {
					banner: '<%=app.banner%>',
					sourceMap   : false
				},
				files: {
					'<%=app.paths.build%>/<%=app.build_filenames.styles%>': '<%=app.paths.temp%>/<%=app.build_filenames.lessimports%>'
				}
			},

			styles_debug: {
				options: {
					sourceMap               : true,
					sourceMapIncludeSources : false
				},
				files: {
					'<%=app.paths.build%>/<%=app.build_filenames.styles%>': '<%=app.paths.temp%>/<%=app.build_filenames.lessimports%>'
				}
			}
		},

		// [grunt-autoprefixer] CSS Autoprefixer
		autoprefixer: {
			options: {
				cascade: true
			},
			styles: {
				src: ['<%=app.paths.build%>/<%=app.build_filenames.styles%>'],
				dest: '<%=app.paths.build%>/<%=app.build_filenames.styles%>'
			}
		},

		// [grunt-contrib-cssmin] CSS Minify
		cssmin: {
			styles: {
				options: {
					banner: '<%=app.banner%>'
				},
				files: {
					'<%=app.paths.build%>/<%=app.build_filenames.styles_min%>': ['<%=app.paths.build%>/<%=app.build_filenames.styles%>']
				}
			}
		},

		// [grunt-csscss] CssCss
		csscss: {
			options: {
				verbose: true,
				colorize: true,
				outputJson: false
				//minMatch: 2,
				//ignoreProperties: 'padding',
				//ignoreSelectors: '.rule-a'
			},
			dist: {
				src: ['<%=app.paths.build%>/<%=app.build_filenames.styles%>']
			}
		},

		// [grunt-contrib-uglify] Scripts Minify
		uglify: {

			scripts_lib_debug: {
				options: {
					banner: '<%=app.banner%>',
					report: false,
					mangle: false,
					compress: false,
					beautify: true
				},
				src: ['<%=app.sources.scripts_lib%>'],
				dest: "<%=app.paths.build%>/<%=app.build_filenames.scripts_lib%>"
			},

			scripts_app_debug: {
				options: {
					banner: '<%=app.banner%>',
					report: false,
					mangle: false,
					compress: false,
					beautify: false,
					preserveComments: true,
					sourceMap       : true,
					sourceMapIncludeSources: false
				},
				src: ['<%=app.sources.scripts_app%>'],
				dest: "<%=app.paths.build%>/<%=app.build_filenames.scripts_app%>"
			},

			scripts_app_dist: {
				options: {
					banner: '<%=app.banner%>',
					compress: {
						drop_console: true
					}
				},
				src: ['<%=app.sources.scripts_app%>'],
				dest: "<%=app.paths.build%>/<%=app.build_filenames.scripts_app_min%>"
			},

			// minify static js files
			scripts_static_dist: {
				files: [{
					expand: true,
					src: '<%=app.paths.build_scripts_static%>/*.js',
					dest: '<%=app.paths.build_scripts_static_min%>',
					ext: '.min.js',
					extDot: 'last',
					flatten: true,
					filter: 'isFile'
				}]

			}
		},

		concat: {

			scripts_head: {
				options: {
					banner: '<%=app.banner%>'
				},
				src: ['<%=app.sources.scripts_head%>'],
				dest: "<%=app.paths.build%>/<%=app.build_filenames.scripts_head%>"
			},

			scripts_head_dist: {
				options: {
					banner: '<%=app.banner%>'
				},
				src: ['<%=app.sources.scripts_head%>'],
				dest: "<%=app.paths.build%>/<%=app.build_filenames.scripts_head_min%>"
			},

			scripts_lib: {
				options: {
					banner: '<%=app.banner%>'
				},
				src: ['<%=app.sources.scripts_lib%>'],
				dest: "<%=app.paths.build%>/<%=app.build_filenames.scripts_lib%>"
			},

			scripts_lib_dist: {
				options: {
					banner: '<%=app.banner%>'
				},
				src: ['<%=app.sources.scripts_lib%>'],
				dest: "<%=app.paths.build%>/<%=app.build_filenames.scripts_lib_min%>"
			},

			scripts_app: {
				options: {
					banner: '<%=app.banner%>'
				},
				src: ['<%=app.sources.scripts_app%>'],
				dest: "<%=app.paths.build%>/<%=app.build_filenames.scripts_app%>"
			},

			i18n: {
				src: ['<%=app.sources.i18n_modules%>'],
				dest: '<%=app.paths.build_i18n%>'
			}

		},

		// module generator
		module: {
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

		// [grunt-contrib-handlebars] Templates: Handlebars
		handlebars: {
			modules: {
				options: {
					namespace: "mod_tpl_hbs",
					processName: function(filePath) {
						var pieces = filePath.split("/");
						return pieces[pieces.length - 1].replace('.hbs', '');
					}
				},
				src  : ['<%=app.sources.templates_modules_hbs%>'],
				dest : "<%=app.paths.build%>/<%=app.build_filenames.templates_modules_hbs%>"
			}
		},

		// [grunt-dot-compiler]
		dot: {
			modules: {
				options: {
					variable : 'mod_tpl_dot',
					root     : __dirname
				},
				src  : ['<%=app.sources.templates_modules_dot%>'],
				dest : "<%=app.paths.build%>/<%=app.build_filenames.templates_modules_dot%>"
			}
		},

		// [grunt-contrib-watch] Watch Changes
		watch: {
			gruntfile: {
				files: ['Gruntfile.js'],
				tasks: ['build'],
				options: {
					livereload: true
				}
			},

			styles: {
				files: ['<%=app.sources.styles_lib%>','<%=app.sources.styles_app%>'],
				tasks: ['build-styles-all'],
				options: {
					livereload: true
				}
			},

			scripts_lib: {
				files: ['<%=app.sources.scripts_lib%>'],
				tasks: ['build-scripts-lib'],
				options: {
					livereload: true
				}
			},

			scripts_app: {
				files: ['<%=app.sources.scripts_app%>'],
				tasks: ['build-scripts-app'],
				options: {
					livereload: true
				}
			},

			scripts_head: {
				files: ['<%=app.sources.scripts_head%>'],
				tasks: ['build-scripts-head'],
				options: {
					livereload: true
				}
			},

			templates_modules: {
				files: ['<%=app.sources.templates_modules_hbs%>', '<%=app.sources.templates_modules_dot%>'],
				tasks: ['build-templates'],
				options: {
					livereload: true
				}
			},

			assets_static: {
				files: ['<%=app.sources.assets_static%>'],
				tasks: ['build-assets']
			},

			i18n: {
				files: ['<%=app.sources.i18n_modules%>'],
				tasks: ['build-i18n']
			}
		},

		// [grunt-contrib-copy]
		copy: {
			scripts_static: {
				files: [
					{
						expand: true,
						flatten: true,
						src: ['<%=app.sources.scripts_static%>'],
						dest: '<%=app.paths.build_scripts_static%>',
						filter: 'isFile'
					}
				]
			},
			styles_static: {
				files: [
					{
						expand: true,
						flatten: true,
						src: ['<%=app.sources.styles_static%>'],
						dest: '<%=app.paths.build_styles_static%>',
						filter: 'isFile'
					}
				]
			},
			assets_static: {
				files: [
					{
						expand: true,
						cwd: '<%=app.paths.assets_static%>',
						src: ['<%=app.sources.assets_static_relative%>'],
						dest: '<%=app.paths.build_assets_static%>/'
					}
				]
			},
			sourcemap_src: {
				files: [
					{
						expand: true,
						cwd: '<%=app.paths.terrific_all%>',
						src: ['<%=app.sources.sourcemap_src_relative%>'],
						dest: '<%=app.paths.build_sourcemap_src%>/'
					}
				]

			}
		},

		// [grunt-complexity]
		complexity: {
			scripts_app: {
				src: ['<%=app.sources.scripts_app%>'],
				options: {
					breakOnErrors: false,
					jsLintXML: '<%=app.paths.build_log%>/<%=app.build_filenames.complexity_report%>',
					checkstyleXML: '<%=app.paths.build_log%>/<%=app.build_filenames.complexity_checkstyle%>',
					errorsOnly: false,
					cyclomatic: [4, 7, 12],
					halstead: [11, 15, 20],
					maintainability: 100
				}
			}
		},

		// [grunt-text-replace]
		replace: {
			sourcemaps: {
				src: ['<%=app.paths.build%>/**.map'],
				overwrite: true,
				replacements: [{
					from: '../../../WEB-INF/terrific/',
					to  : './sourcemap_src/'
				}]
			}
		},



		// [grunt-concurrent]
		concurrent: {
			build:  ['jshint:gruntfile', 'build-styles', 'build-scripts', 'build-templates', 'build-assets', 'build-staticcopy', 'build-i18n'],
			dist:   ['dist-styles', 'dist-staticcopy', 'dist-scripts', 'dist-templates', 'dist-assets', 'dist-i18n'],
			debug:  ['debug-styles', 'debug-scripts', 'copy:sourcemap_src']
		}

	});

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Define build tasks

	grunt.registerTask('debug-styles-all',      ['less_imports:styles', 'less:styles_debug', 'autoprefixer']);
	grunt.registerTask('debug-scripts-lib',     ['uglify:scripts_lib_debug', 'copy:scripts_static', 'copy:styles_static']);
	grunt.registerTask('debug-scripts-app',     ['jshint:scripts_app', 'uglify:scripts_app_debug']);
	grunt.registerTask('debug-scripts-head',    ['concat:scripts_head']);

	grunt.registerTask('dist-styles-all',       ['less_imports:styles_dist', 'less:styles', 'autoprefixer', 'cssmin:styles']);
	grunt.registerTask('dist-scripts-lib',      ['concat:scripts_lib_dist']);
	grunt.registerTask('dist-scripts-app',      ['uglify:scripts_app_dist']);
	grunt.registerTask('dist-scripts-head',     ['concat:scripts_head_dist']);
	grunt.registerTask('dist-scripts-static',   ['uglify:scripts_static_dist']);
	grunt.registerTask('dist-templates-modules',['handlebars:modules', 'dot:modules']);

	grunt.registerTask('build-styles-all',      ['less_imports:styles', 'less:styles', 'autoprefixer']);
	grunt.registerTask('build-scripts-lib',     ['concat:scripts_lib']);
	grunt.registerTask('build-scripts-app',     ['jshint:scripts_app', 'concat:scripts_app']);
	grunt.registerTask('build-scripts-head',    ['concat:scripts_head']);
	grunt.registerTask('build-templates-modules',['handlebars:modules', 'dot:modules']);

	//------------------------------------------------------------------------------------------------------------------

	grunt.registerTask('debug-styles',      ['debug-styles-all']);
	grunt.registerTask('debug-scripts',     ['debug-scripts-lib', 'debug-scripts-app', 'debug-scripts-head']);
	grunt.registerTask('debug',             ['concurrent:debug', 'replace:sourcemaps']);

	grunt.registerTask('dist-styles',       ['dist-styles-all']);
	grunt.registerTask('dist-scripts',      ['dist-scripts-lib', 'dist-scripts-app', 'dist-scripts-head', 'dist-scripts-static']);
	grunt.registerTask('dist-templates',    ['dist-templates-modules']);
	grunt.registerTask('dist-assets',       ['copy:assets_static']);
	grunt.registerTask('dist-staticcopy',   ['copy:scripts_static', 'copy:styles_static']);
	grunt.registerTask('dist-i18n',         ['concat:i18n']);
	grunt.registerTask('dist',              ['concurrent:dist']);
	grunt.registerTask('minify',            ['dist']);

	grunt.registerTask('build-styles',      ['build-styles-all']);
	grunt.registerTask('build-scripts',     ['build-scripts-lib', 'build-scripts-app', 'build-scripts-head']);
	grunt.registerTask('build-templates',   ['build-templates-modules']);
	grunt.registerTask('build-assets',      ['copy:assets_static']);
	grunt.registerTask('build-staticcopy',  ['copy:scripts_static', 'copy:styles_static']);
	grunt.registerTask('build-i18n',        ['concat:i18n']);
	grunt.registerTask('build',             ['concurrent:build']);

	//------------------------------------------------------------------------------------------------------------------

	grunt.registerTask('default',           ['build', 'watch']);


	//------------------------------------------------------------------------------------------------------------------
	// grunt module
	grunt.registerTask('module', 'generates a module', function(name, skin) {
		new ModuleGenerator({
			grunt: grunt,
			args: arguments
		});
	});


};


/**
 *
 * @class ModuleGenerator
 * @author smollweide
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
		self.config = self.options.grunt.config.data;
		self.configMod = self.options.grunt.config.data.module;

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
			placeholder = self.configMod.options.placeholder,
			moduleFiles = self.configMod.filesModule
			;

		if (typeof(moduleFiles) !== 'object') {
			return this;
		}

		self._console('log', 'write module: ' + module.nameU);
		self._console('log', '-----------------------------');

		self._for(moduleFiles, function () {
			self.writeFile({
				src: self._getGruntConfig(this.src),
				dest: self._getGruntConfig(this.dest),
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
			placeholder = self.configMod.options.placeholder,
			skinFiles = self.configMod.filesSkin
			;

		if (typeof(skinFiles) !== 'object') {
			return this;
		}

		self._console('log', 'write skin: ' + skin.nameU + ' ('  + module.nameU + ')');
		self._console('log', '-----------------------------');

		self._for(skinFiles, function () {
			self.writeFile({
				src: self._getGruntConfig(this.src),
				dest: self._getGruntConfig(this.dest),
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
			placeholder = self.configMod.options.placeholder,
			filesTemplate = self.configMod.filesTemplate
			;

		if (typeof(filesTemplate) !== 'object') {
			return this;
		}

		self._console('log', 'write template: ' + template.nameU + ' ('  + module.nameU + ')');
		self._console('log', '-----------------------------');

		self._for(filesTemplate, function () {
			self.writeFile({
				src: self._getGruntConfig(this.src),
				dest: self._getGruntConfig(this.dest),
				folder: this.folder,
				name: module.nameU,
				template: this.template,
				author: author,
				belongsTo: this.belongsTo,
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
			placeholder = self.configMod.options.placeholder,
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

		// write belongsTo
		self.writeBelongsTo(options);

		return this;
	},

	/**
	 *
	 * @method writeBelongsTo
	 *
	 * @param {object} options
	 * @returns {*}
	 */
	writeBelongsTo: function (options) {

		var self = this,
			grunt = self.options.grunt,
			pathSrc,
			pathTemplate,
			outlet,
			content,
			pattern,
			pattern2
			;

		if (typeof(options.belongsTo) !== 'object') {
			return this;
		}

		pathSrc = self._getGruntConfig(options.belongsTo.src);
		pathTemplate = self._getGruntConfig(options.belongsTo.template);
		outlet = grunt.file.read(pathTemplate);

		self._for(options.replacement, function () {
			pattern = new RegExp(this._that, 'g');
			pathSrc = pathSrc.replace(pattern, this._with);
			outlet = outlet.replace(pattern, this._with);
		});

		pattern2 = new RegExp(options.belongsTo.placeholder, 'g');

		if (!grunt.file.exists(pathSrc)) {
			return this;
		}

		content = grunt.file.read(pathSrc);

		if (content.search(pattern2) <= 0) {
			self._console('log', 'placeholder (' + options.belongsTo.placeholder + ') not found in file "' + pathSrc + '"');
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
	 * @method _getGruntConfig
	 *
	 * @param {string} value
	 * @returns {*}
	 * @private
	 */
	_getGruntConfig: function (value) {

		var self = this,
			pattern = /<%=([a-zA-Z0-9.-_]*)%>/,
			result = pattern.exec(value),
			resultSpl,
			poi = self.config;

		if (result.length < 1) {
			return value;
		}

		resultSpl = result[1].split('.');

		self._for(resultSpl, function () {
			poi = poi[this];
		});

		if (typeof(poi) !== 'string') {
			return value;
		}

		return value.replace(pattern, poi);
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

