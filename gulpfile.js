const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch('dist/*.html').on('change', browserSync.reload);
});


gulp.task('sass', function() {
  return gulp
    .src('src/styles/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({}))
    .pipe(
      autoprefixer({
        browsers: ['last 5 versions'],
        cascade: false
      })
    )
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css/'))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task('watch', function() {
  gulp.watch('src/styles/scss/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series(gulp.parallel('watch', 'serve')));
