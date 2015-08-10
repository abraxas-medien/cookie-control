/**
 * Created by Adrian Tello on 10.08.15.
 */
module.exports = function(config) {
	config.set({
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