var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
//Settings for autoprefixer
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};


gulp.task('sass', function () {
  return gulp.src('assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('assets/css/'))
    .pipe(browserSync.stream());
});
gulp.task('serve', function() {
    browserSync.init({
        server: "./"
    });
});

gulp.task('watch', function () {
  gulp.watch('assets/scss/**/*.scss', ['sass']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'watch', 'serve']);
