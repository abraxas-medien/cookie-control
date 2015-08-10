/**
 * Created by tello on 10.08.15.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var fs = require('fs');

//Settings
var outputName = 'axs-cookie-control';

var cssFolderName = 'css';
var jsFolderName = 'js';

var srcFolder = 'src/';
var srcCssFolder = srcFolder + cssFolderName + '/';
var srcJsFolder = srcFolder + jsFolderName + '/';

var distFolder = 'dist/';
var distCssFolder = distFolder + cssFolderName + '/';
var distJsFolder = distFolder + jsFolderName + '/';

//Tasks definition
gulp.task('default', ['build:js', 'build:css']);

gulp.task('build:css', ['prepare:css'], function(){
	return gulp.src(srcCssFolder + '*.css')
		.pipe(concatCss(outputName + '.css'))
		.pipe(gulp.dest(distCssFolder));
});

gulp.task('build:js', ['prepare:js'], function(){
	return gulp
		.src(srcJsFolder + '*.js')
		.pipe(concat(outputName + '.js'))
		.pipe(gulp.dest(distJsFolder));
});

gulp.task('prepare', ['prepare:main', 'prepare:css', 'prepare:js']);

gulp.task('prepare:main', function(cb){
	fs.exists(distFolder, function (exists) {
		if(exists){
			cb();
		}else{
			fs.mkdir(distFolder, cb);
		}
	});
});

gulp.task('prepare:js', ['prepare:main'], function(cb){
	fs.exists(distJsFolder, function (exists) {
		if(exists){
			cb();
		}else{
			fs.mkdir(distJsFolder, cb);
		}
	});
});

gulp.task('prepare:css', ['prepare:main'], function(cb){
	fs.exists(distCssFolder, function (exists) {
		if(exists){
			cb();
		}else{
			fs.mkdir(distCssFolder, cb);
		}
	});
});

gulp.task('test', function() {
	//TODO
});