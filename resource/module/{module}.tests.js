(function ($) {
	'use strict';

	test('{Module}', function() {

		var result,
			expected,
			message,
			TModule = T.Module.{Module}.prototype;

		module('install', {
			setup: function() {
				TModule = T.Module.{Module}.prototype;
			}, 
			teardown: function() {
				result = null;
				expected = null;
				message = null;
				TModule = null;
			}
		});

		// test 1
		result  = TModule.start(function () {});
		expected = undefined;
		message = '';
		deepEqual(result, expected, message);
		// end test
	});

}(jQuery));
