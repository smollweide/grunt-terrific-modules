# grunt-terrific-modules

> A grunt module generator for terrific modules

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
		},
		files: {
			module: [
				{
					src: 'pathToResourceFolder',
					dest: 'pathToModulesFolder/{module}',
					template: '{module}.jsp'
				},
				{
					src: 'pathToResourceFolder',
					dest: 'pathToModulesFolder/{module}',
					template: '{module}.readme.md'
				},
				{
					src: 'pathToResourceFolder',
					dest: 'pathToModulesFolder/{module}/js',
					template: '{module}.js'
				},
				{
					src: 'pathToResourceFolder',
					dest: 'pathToModulesFolder/{module}/css',
					template: '{module}.less'
				},
				{
					src: 'pathToResourceFolder',
					dest: 'pathToModulesFolder/{module}/i18n',
					template: '{module}.properties'
				},
				{
					src: 'pathToResourceFolder',
					dest: 'pathToTags',
					template: '{module}.tag'
				}
			],
			skin: [
				{
					src: 'pathToResourceFolder',
					dest: 'pathToModulesFolder/{module}/js',
					template: '{module}.skin.{skin}.js'
				},
				{
					src: 'pathToResourceFolder',
					dest: 'pathToModulesFolder/{module}/css',
					template: '{module}.skin.{skin}.less'
				}
			],
			template: [
				{
					src: 'pathToResourceFolder',
					dest: 'pathToModulesFolder/{module}',
					template: '{module}-{template}.jsp',
					enrichWith: {
						src: 'pathToTags/{module}.tag',
						// use UTF8 code for % (U+0025)
						placeholder: '<U+0025-- outlet.template --U+0025>',
						template: 'pathToResourceFolder/{module}.template.tag'
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

- module lowercase: {module}
- module camelcase: {Module}
- skin lowercase: {skin}
- skin camelcase: {Skin}
- template lowercase: {template}
- template camelcase: {Template}
- author lowercase: {author}
- author camelcase: {Author}


## License
[MIT License](https://github.com/smollweide/grunt-terrific-modules/blob/master/LICENSE)


## Changelog
Please see the [CHANGELOG.md](https://github.com/smollweide/grunt-terrific-modules/blob/master/CHANGELOG.md)
















