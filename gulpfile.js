var gulp = require('gulp');
var sass = require('gulp-sass');
var replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');	

gulp.task('sass', function(){
  return gulp.src('./styles/style.scss')
          .pipe(sass({ outputStyle: 'extended'}).on('error', sass.logError))
          .pipe(autoprefixer())
          .pipe(concat('style-gulp.scss.liquid'))
                .pipe(replace('"{{', '{{'))
                .pipe(replace('}}"', '}}'))
          .pipe(gulp.dest('./assets/'));
});

gulp.task('default', function() {
  gulp.watch('./styles/**/*.scss', gulp.series('sass'));
})