var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

const config = {
    styles: {
      src: ['./src/styles/main.less'],
      dest: './public/styles',
      autoprefix: ['last 2 versions'],
      srcDirectory: ['./src/styles/**/*.{less,css}']
    },

    scripts: {
      src: ['./src/scripts/**/*.js'],
      dest: './public/scripts'
    }
};

gulp.task('dev:styles', devStyles);
gulp.task('dev:scripts', devScripts);

gulp.task('dev', gulp.parallel('dev:styles', 'dev:scripts'));
gulp.task('dev:watch', gulp.series('dev', devWatch));

gulp.task('prod:styles', prodStyles);
gulp.task('prod:scripts', prodScripts);

gulp.task('prod', gulp.parallel('prod:scripts', 'prod:styles'));

gulp.task('default', gulp.series('dev'));

function devWatch() {
  $.livereload.listen();

  gulp.watch(config.styles.srcDirectory, gulp.series('dev:styles'));
  gulp.watch(config.scripts.src, gulp.series('dev:scripts'));
}

function devScripts() {
  return gulp
        .src(config.scripts.src)
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(config.scripts.dest))
        .pipe($.livereload());
}

function prodScripts() {
  return gulp
        .src(config.scripts.src)
        .pipe($.babel())
        .pipe($.concat('app.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(config.scripts.dest));
}

function prodStyles() {
  return gulp
      .src(config.styles.src)
      .pipe($.less())
      .pipe($.autoprefixer({
          browsers: config.styles.autoprefix
      }))
      .pipe($.minifyCss())
      .pipe(gulp.dest(config.styles.dest));
}

function devStyles() {
  return gulp
      .src(config.styles.src)
      .pipe($.sourcemaps.init())
      .pipe($.less())
      .pipe($.autoprefixer({
          browsers: config.styles.autoprefix
      }))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(config.styles.dest))
      .pipe($.livereload());
}
