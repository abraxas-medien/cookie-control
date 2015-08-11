
/**
 * Created by Adrian Tello on 10.08.15.
 */
module.exports = function(config) {
	var customLaunchers = {
		'PhantomJS_custom': {
			base: 'PhantomJS'
		}
	};

	config.set({
		phantomjsLauncher: {
			// Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
			exitOnResourceError: true
		},
		reporters: ['dots'],
		sauceLabs: {
			testName: 'axs-cookie-control tests'
		},
		browserDisconnectTimeout: 10000,
		browserDisconnectTolerance: 2,
		browserNoActivityTimeout: 30000,
		captureTimeout: 120000,
		customLaunchers: customLaunchers,
		browsers: Object.keys(customLaunchers),
		files: [
			'bower_components/jquery/dist/jquery.js',
			'bower_components/jquery-ui/jquery-ui.js',
			'bower_components/jquery-cookie/jquery.cookie.js',
			'src/js/*.js',
			'tests/*.js'
		],
		frameworks: ['jasmine']
	});
};