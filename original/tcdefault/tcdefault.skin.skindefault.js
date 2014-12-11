(function($) {
	'use strict';

	/**
	 * Skindefault Skin implementation for the module Tcdefault.
	 *
	 * @author {author}
	 * @namespace Tc.Module.Default
	 * @class Skindefault
	 * @extends Tc.Module
	 * @constructor
	 */
	Tc.Module.Tcdefault.Skindefault = function (parent) {

		/**
		 * override the appropriate methods from the decorated module (ie. this.get = function()).
		 * the former/original method may be called via parent.<method>()
		 */
		this.on = function (callback) {
			// calling parent method
			parent.on(callback);

			// set variables

			// set module variables

			// bind event handler

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
