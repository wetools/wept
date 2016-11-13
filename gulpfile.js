var gulp = require('gulp')
var webpack = require('webpack-stream');
var babel = require('gulp-babel')
var sourcemaps = require('gulp-sourcemaps');
var config = require('./webpack.config')
var prodConfig = require('./webpack.prod')
var gutil = require('gulp-util')

// build server javascript
gulp.task('babel', function () {
  return gulp.src('lib/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('build'))
})

gulp.task('webpack:prod', function () {
  prodConfig.debug = false
  delete prodConfig.output.path

  return gulp.src('src/index.js')
    .pipe(webpack(prodConfig))
    .pipe(gulp.dest('public/script'))
})

// build client javascript
gulp.task('webpack', function () {
  config.debug = true
  config.cache = true
  delete config.output.path

  return gulp.src('src/index.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('public/script'))
})

gulp.task('watch', function () {
  gulp.watch('lib/*.js')
    .on('change', function (file) {
      gulp.src('lib/*.js')
        .pipe(babel())
        .pipe(gulp.dest('build'))
        .end(() => {
          gutil.log('Rebuild ' + file.path)
        })
    })
  //gulp.watch('src/*.js', ['webpack'])

  config.watch = true
  config.debug = true
  config.cache = true
  delete config.output.path

  return gulp.src('src/index.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('public/script'))
})

gulp.task('prepublish', ['babel', 'webpack:prod'])

gulp.task('build', ['babel', 'webpack'])

gulp.task('default', ['babel', 'watch'])
