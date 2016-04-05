(function ($) {
	'use strict';

	/**
	 * Module implementation.
	 *
	 * @author {author}
	 * @namespace T.Module
	 * @class {Module}
	 * @extends T.Module
	 */
	T.Module.{Module} = T.createModule({

		/**
		 * executed on application.start()
		 *
		 * @method start
		 * @return {void}
		 * @constructor
		 * @param {Function} resolve the callback after module start
		 */
		start: function(resolve) {

			// bind ctx
			this.$ctx = $(this._ctx);

			// subscribe to event sync
			this._events.on('t.sync', this.sync.bind(this));

			// subscribe to your events
			// this._events.on('myEvent', this.onMyEvent.bind(this));

			// add your code here..

			resolve();
		},

		/**
		 * executed on application.stop()
		 *
		 * @return void
		 */
		stop: function () {

			// Do stuff here or remove method
			//...
		},

		/**
		 * emitted when the start method of all modules has been run
		 *
		 * @return void
		 */
		sync: function () {

			// Do stuff here or remove method
			//...
		}

	});

})(jQuery);
