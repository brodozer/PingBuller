var gulp = require('gulp');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var reload = browserSync.reload;
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');

var configServer = {
	server: {
        baseDir: "build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "FrontEnd"
};

var path = {
	
	build: {
		html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
	},

	src: {
		html: 'src/*.html',
		js: 'src/js/main.js',
		style: 'src/style/main.less',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},

	watch: {
		html: 'src/**/*.html',
        js: 'src/js/*.js',
        style: 'src/style/*.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
	}
};

// html

gulp.task('html', function() {
	gulp.src(path.src.html)
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({
			stream: true
		}))
});

// css

gulp.task('css', function() {
	gulp.src(path.src.style)
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(cleanCss())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({
			stream: true
		}))
})

// fonts

gulp.task('fonts', function() {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
		.pipe(reload({
			stream: true
		}))
});

// js

gulp.task('js', function() {
	gulp.src(path.src.js)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({
			stream: true
		}))
});

// image

gulp.task('image', function() {
	gulp.src(path.src.img)
		.pipe(imagemin({
			interlaced: true,
		    progressive: true,
		    svgoPlugins: [{removeViewBox: true}]
		}))
		.pipe(gulp.dest(path.build.img))
		.pipe(reload({
			stream: true
		}))
});

// server

gulp.task('webserver', function() {
    browserSync(configServer);
});

// watch

gulp.task('watch', function() {
	gulp.watch([path.watch.html], ['html']);
	gulp.watch([path.watch.style], ['css']);
	gulp.watch([path.watch.js], ['js']);
	gulp.watch([path.watch.fonts], ['fonts']);
	gulp.watch([path.watch.img], ['image']);
});

// build

gulp.task('build', [
	'html',
	'css',
	'js',
	'fonts',
	'image'
]);

// default

gulp.task('default', [
	'build',
	'webserver',
	'watch'
])