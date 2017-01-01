const gulp = require('gulp');
const gutil = require('gulp-util');
const deploy = require('gulp-gh-pages');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');

const PHASER = './node_modules/phaser/build/phaser.min.js';

gulp.task('phaser', () => {
  return gulp.src(PHASER)
    .pipe(gulp.dest('build/vendor'));
});

gulp.task('static', ['phaser'], () => {
  return gulp.src('static/**/*')
    .pipe(gulp.dest('build'));
});

gulp.task('deploy', ['build'], () => {
  return gulp.src('build/**/*')
    .pipe(deploy());
});

gulp.task('babel', () => {
  const bundler = browserify('src/main.js');

  return bundler
    .transform(babel, { presets: ['es2015'] })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest('build'));
});

gulp.task('dev', () => {
  const options = {
    server: {
      baseDir: 'build',
    },
    open: true,
  };

  browserSync(options);

  gulp.watch('src/**/*.js', ['babel', browserSync.reload]);
  gulp.watch('static/**/*', ['static', browserSync.reload]);
});

gulp.task('build', ['static', 'babel']);
gulp.task('default', ['build']);
