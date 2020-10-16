var gulp           = require('gulp'),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync').create(),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify-es').default,
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify"),
		rsync          = require('gulp-rsync');

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// online: false, // Work offline without internet connection
		// tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
	})
});
function bsReload(done) { browserSync.reload(); done() };

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expanded'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({
		overrideBrowserslist: ['last 15 versions']
	}))
	//.pipe(cleanCSS())  // комментируем строчку, чтобы отменить компиляцию в min.css
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

// Пользовательские скрипты проекта

gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js', // всегда в начале
		//'app/libs/Magnific-Popup-master/jquery.magnific-popup.min.js',
		//'app/libs/jQuery.mmenu/jquery.mmenu.all.js',
		//'app/libs/equalheights/equalHeights.js',
		//'app/libs/fotorama/fotorama.js',
		//'app/libs/slick/slick.min.js',
		//'app/libs/microplugin/microplugin.js', // опция для selectize
		//'app/libs/sifter/sifter.js', // опция для selectize
		//'app/libs/selectize/selectize.min.js', // выбор опций в форме
		'app/js/common.js'
		// Всегда в конце
		]) 
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // закомментировать, если необходимо отменить компиляцию 
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }));
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin())) // Cache Images
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('removedist', function() { return del(['dist'], { force: true }) });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('buildFiles', function() { return gulp.src(['app/*.html', 'app/.htaccess']).pipe(gulp.dest('dist')) });
gulp.task('buildCss', function() { return gulp.src(['app/css/main.min.css']).pipe(gulp.dest('dist/css')) });
gulp.task('buildJs', function() { return gulp.src(['app/js/scripts.min.js']).pipe(gulp.dest('dist/js')) });
gulp.task('buildFonts', function() { return gulp.src(['app/fonts/**/*']).pipe(gulp.dest('dist/fonts')) });

gulp.task('build', gulp.series('removedist', 'imagemin', 'sass', 'js', 'buildFiles', 'buildCss', 'buildJs', 'buildFonts'));

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'zabalueva-el.ru',
		user:      'lenoc132',
		password:  'hTuV30nJlW',
		parallel:  10
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/www/zabalueva-el.ru'));

});

gulp.task('rsync', function() {
	return gulp.src('app/')
	.pipe(rsync({
		root: 'dist/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Included files
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excluded files
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

gulp.task('code', function() {
	return gulp.src('app/**/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('js'));
	gulp.watch('app/*.html', gulp.parallel('code'));
});

gulp.task('default', gulp.parallel('sass', 'js', 'browser-sync', 'watch'));
	