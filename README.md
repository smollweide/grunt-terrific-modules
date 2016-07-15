# grunt-terrific-modules

> A grunt module generator for terrific modules

[![Build Status](https://img.shields.io/travis/smollweide/grunt-terrific-modules/master.svg)](https://travis-ci.org/smollweide/grunt-terrific-modules)
[![Dependencies](https://img.shields.io/david/smollweide/grunt-terrific-modules/master.svg)](https://david-dm.org/smollweide/grunt-terrific-modules)
[![npm](https://img.shields.io/npm/v/grunt-terrific-modules.svg)](https://www.npmjs.com/package/grunt-terrific-modules)
[![Codestyle](https://img.shields.io/badge/codestyle-namics-green.svg)](https://github.com/namics/eslint-config-namics)


## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-terrific-modules --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-terrific-modules');
```

The Template Module folder needs to be copied from the
[Github Repository](https://github.com/smollweide/grunt-terrific-modules/tree/master/resource) and placed at
the folder location <pathToResourceFolder>

## The "terrific_modules" task

### Overview
In your project's Gruntfile, add a section named `terrific_modules` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
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
					src: 'pathToResourceFolder',
					dest: 'pathToModulesFolder/T_module',
					template: 'T_module.jsp'
				},
				{
					src: 'pathToResourceFolder',
					dest: 'pathToModulesFolder/T_module',
					template: 'T_module.readme.md'
				},
				{
					src: 'pathToResourceFolder',
					dest: 'pathToModulesFolder/T_module/js',
					template: 'T_module.js'
				},
				{
					src: 'pathToResourceFolder',
					dest: 'pathToModulesFolder/T_module/css',
					template: 'T_module.less'
				},
				{
					src: 'pathToResourceFolder',
					dest: 'pathToModulesFolder/T_module/i18n',
					template: 'T_module.properties'
				},
				{
					src: 'pathToResourceFolder',
					dest: 'pathToTags',
					template: 'T_module.tag'
				}
			],
			skin: [
				{
					src: 'pathToResourceFolder',
					dest: 'pathToModulesFolder/T_module/js',
					template: 'T_module.skin.T_skin.js'
				},
				{
					src: 'pathToResourceFolder',
					dest: 'pathToModulesFolder/T_module/css',
					template: 'T_module.skin.T_skin.less'
				}
			],
			template: [
				{
					src: 'pathToResourceFolder',
					dest: 'pathToModulesFolder/T_module',
					template: 'T_module-T_template.jsp',
					enrichWith: {
						src: 'pathToTags/T_module.tag',
						// use UTF8 code for % (U+0025)
						placeholder: '<U+0025-- outlet.template --U+0025>',
						template: 'pathToResourceFolder/T_module.template.tag'
					}
				}
			]
		},
		triggerFile: '<path>/triggerfile',
		complete: function (data) {

		}
	  }
  },
});
```

### Options

#### options.placeholder
Type: `object`

A object with all placeholders used throughout the templates

#### options.files
Type: `array`

This array defines all file objects which are needed for generation of a "module", "skin" or "template".
All files defined in this array need to exist in the resource directory.

## Convention

### Terrific:
- http://terrifically.org/
- https://github.com/brunschgi/terrificjs
- https://github.com/brunschgi/terrific-composer
- https://github.com/namics/terrific-micro
- https://github.com/smollweide/terrific-micro-grunt

### Grunt task arguments:
- help
	(grunt terrific_modules)
- module name
	(grunt terrific_modules:example-module)
- skin name
	(grunt terrific_modules:example-module:example-skin)
- template name
	(grunt terrific_modules:example-module:%example-template)
- author
	(grunt terrific_modules:example-module:@example-author)


### Recommended placeholder names:
(can be changed but is not recommended because you have to change all resource file-names)

- module lowercase: T_module
- module camelcase: T_Module
- skin lowercase: T_skin
- skin camelcase: T_Skin
- template lowercase: T_template
- template camelcase: T_Template
- author lowercase: T_author
- author camelcase: T_Author


## License
[MIT License](https://github.com/smollweide/grunt-terrific-modules/blob/master/LICENSE)


## Changelog
Please see the [CHANGELOG.md](https://github.com/smollweide/grunt-terrific-modules/blob/master/CHANGELOG.md)
















