/**
 * Created by tello on 10.08.15.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var fs = require('fs');

var Server = require('karma').Server;

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
		.pipe(gulp.dest(distCssFolder))
		.pipe(sourcemaps.init())
		.pipe(minifyCss({
			compatibility: 'ie8'
		}))
		.pipe(rename(outputName + '.min.css'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(distCssFolder));
		;
});

gulp.task('build:js', ['prepare:js'], function(){
	return gulp
		.src(srcJsFolder + '*.js')
		.pipe(concat(outputName + '.js'))
		.pipe(gulp.dest(distJsFolder))
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(rename(outputName + '.min.js'))		.pipe(sourcemaps.write('./'))
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

gulp.task('test', ['build:js'], function(done) {
	try{
		new Server({
			configFile: __dirname + '/karma.conf.js',
			singleRun: true
		}, done).start();
	}catch(error){
		done(error);
	};
});

gulp.task('test:ci', ['build:js'], function(done) {
	try{
		new Server({
			configFile: __dirname + '/karma.ci.conf.js',
			singleRun: true
		}, done).start();
	}catch(error){
		done(error);
	};
});

gulp.task('tdd', ['build:js'], function(done) {
	try{
		new Server({
			configFile: __dirname + '/karma.tdd.conf.js',
			singleRun: false
		}, done).start();
	}catch(error){
		done(error);
	};
});