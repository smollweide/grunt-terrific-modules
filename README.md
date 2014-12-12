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

## Release History
- 0.1.0 general functionality
- 0.1.1 outsourced logic to lib folder
- 0.1.2 implement enrichWith functionality
- 0.1.3 bugfixing
- 0.1.4 important notice

## Convention

### Terrific:
- http://terrifically.org/
- https://github.com/brunschgi/terrificjs
- https://github.com/namics/terrific-micro
- https://github.com/brunschgi/terrific-composer/

### Grunt task arguments:
- module name
	(grunt terrific_modules:example-module)
- skin name
	(grunt terrific_modules:example-module:example-skin)
- template name
	(grunt terrific_modules:example-module:%example-template)
- author
	(grunt terrific_modules:example-module:@example-author)
- help
	(grunt terrific_modules)

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

License
=======

Copyright (c) 2014 Jan Widmer, Simon Mollweide

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.















