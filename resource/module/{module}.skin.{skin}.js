(function($) {
	'use strict';

	/**
	 * {Skin} Skin implementation for the module {Module}.
	 *
	 * @author {author}
	 * @namespace Tc.Module.{Module}
	 * @class {Skin}
	 * @extends Tc.Module
	 * @constructor
	 */
	Tc.Module.{Module}.{Skin} = function (parent) {

		/**
		 * override the appropriate methods from the decorated module (ie. this.get = function()).
		 * the former/original method may be called via parent.<method>()
		 */
		this.on = function (callback) {
			// calling parent method
			parent.on(callback);

			// set variables
			var mod = this,
				$ctx = mod.$ctx;

			// set module variables

			// bind event handler
			//$('.classname', $ctx).on('click', $.proxy(mod.$clickSomething, mod));

			// init functions
		};

		this.after = function () {
			// calling parent method
			parent.after();

			// Do stuff here
			//...
		};

	};

})(Tc.$);
