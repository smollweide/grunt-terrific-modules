(function($) {
	'use strict';

	/**
	 * Module implementation.
	 *
	 * @author {author}
	 * @namespace Tc.Module
	 * @class {Module}
	 * @extends Tc.Module
	 */
	Tc.Module.{Module} = Tc.Module.extend({

		/**
		 * Initialize.
		 *
		 * @method init
		 * @return {void}
		 * @constructor
		 * @param {jQuery} $ctx the jquery context
		 * @param {Sandbox} sandbox the sandbox to get the resources from
		 * @param {Number} id the unique module id
		 */
		init: function($ctx, sandbox, id) {
			// call base constructor
			this._super($ctx, sandbox, id);

			// subscribe to channel 1
			//this.sandbox.subscribe(1, this);

			// unsubscribe from channel 1
			//this.sandbox.unsubscribe(1, this);

			// set module variables
		},

		/**
		 * Hook function to do all of your module stuff.
		 *
		 * @method on
		 * @param {Function} callback function
		 * @return void
		 */
		on: function(callback) {

			// set variables
			var mod = this,
				$ctx = mod.$ctx
			;

			// bind event handler
			//$('.classname', $ctx).on('click', $.proxy(mod.$clickSomething, mod));

			// init functions

			callback();
		},


		/**
		 * Hook function to trigger your events.
		 *
		 * @method after
		 * @return void
		 */
		after: function() {
			// Do stuff here or remove after method
			//...
		}

	});

})(Tc.$);
