var gulp = require('gulp'),
	sass = require('gulp-sass'),
	stylus = require('gulp-stylus'),
	pug = require('gulp-pug'),
	svgSprite = require('gulp-svg-sprite'),
	spritesmith = require('gulp.spritesmith'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	htmlmin = require('gulp-htmlmin'),
	uncss = require('gulp-uncss');

gulp.task('pug', function() {
	return gulp.src('app/index.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('app/'))
});

gulp.task('stylus', function() {
	return gulp.src('app/styles.styl')
		.pipe(stylus())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
			cascade: true
		}))
		.pipe(gulp.dest('app/'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('svg-sprite', function(cb) {
	return gulp.src('app/b-advantages/b-advantages/sprites/*.svg')
		.pipe(svgSprite({
			mode: {
				css: {
					sprite: 'b-advantages/b-advantages/sprites/svg-sprite.svg',
					dest: './',
					bust: false,
					render: {
						styl: {
							dest: 'b-advantages/svg-sprite.styl'
						}
					}
				}
			}
		}))
		.pipe(gulp.dest('app/'));
});

gulp.task('sprite', function() {
	var spriteData = gulp.src('app/footer/footer/sprites/*.png').pipe(spritesmith({
		imgName: 'icon-sprite.png',
		cssName: 'icon-sprite.styl'
	}));
	spriteData.img.pipe(gulp.dest('app/footer/footer/sprites/')); // путь, куда сохраняем картинку
	spriteData.css.pipe(gulp.dest('app/footer/')); // путь, куда сохраняем стили
});

gulp.task('css-libs', ['stylus'], function() {
	return gulp.src('app/styles.css')
		.pipe(cssnano())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('app/'));
});

gulp.task('htmlmin', function() {
	return gulp.src('app/index.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('dist'))
});

gulp.task('scripts', function() {
	return gulp.src([
			'app/js/common.js'
		])
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('app/js/'));
});

gulp.task('concat', function() {
	return gulp.src('app/libs/**/*.js')
		.pipe(concat('lib.js'))
		.pipe(gulp.dest('app/js/'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('clear', function() {
	return cache.clearAll();
});

gulp.task('img', function() {
	return gulp.src('app/**/*.png')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}],
			une: [pngquant()]
		})))
		.pipe(gulp.dest('app/'));
});

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('app/**/*.pug', ['pug']).on('change', browserSync.reload);
	gulp.watch('app/**/*.styl', ['stylus']).on('change', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'pug', 'stylus', 'css-libs', 'scripts', 'img', 'concat'], function() {

});