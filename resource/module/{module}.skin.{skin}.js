(function ($) {
	'use strict';

	/**
	 * {Skin} Skin implementation for the module {Module}.
	 *
	 * @author {author}
	 * @namespace T.Module.{Module}
	 * @class {Skin}
	 * @extends T.Module
	 * @constructor
	 */
	T.Module.{Module}.{Skin} = T.createDecorator({

		/**
		 * executed on application.start()
		 * extended (decorated) lifecycle method
		 *
		 * @method start
		 * @return {void}
		 * @constructor
		 * @param {Function} resolve the callback after module start
		 * @param {Function} reject
		 */
		start : function (resolve, reject) {

			this._parent.start(resolve, reject);

			// add your code here
			// ..

		},


		/**
		 * executed on application.stop()
		 *
		 * @return void
		 */
		stop: function() {

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