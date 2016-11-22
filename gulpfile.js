var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var browserSync = require('browser-sync').create();
//Settings for autoprefixer
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('pack-js', function () {  
  return gulp.src(['src/js/jquery.js', 'src/js/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(minify({
      ext: {
        min:'.js'
      },
      noSource: true
    }))
    .pipe(gulp.dest('public/js'));
});


gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('public/css/'))
    .pipe(browserSync.stream());
});
gulp.task('serve', function() {
    browserSync.init({
        server: "./"
    });
});

gulp.task('watch', function () {
  gulp.watch('src/js/*.js', ['pack-js']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['pack-js', 'sass', 'watch', 'serve']);
