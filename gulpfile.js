const browserSync = require('browser-sync').create();
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const data = require('gulp-data');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');

const { NODE_ENV } = process.env;

const config = {
  src: './src',
  dest: './dist',
  watchers: [
    {
      match: ['./src/**/*.hbs', './src/**/*.json'],
      tasks: ['html'],
    },
    {
      match: ['./src/assets/css/*.css'],
      tasks: ['css'],
    },
  ],
};

gulp.task('clean', () => del(config.dest));

gulp.task('cleanCSS', () =>
  del([
    `${config.dest}/assets/css/*.css`,
    `!${config.dest}/assets/css/index.css`,
  ])
);

gulp.task('css', () =>
  gulp
    .src(`${config.src}/assets/css/*.css`)
    .pipe(postcss())
    .pipe(gulp.dest(`${config.dest}/assets/css`))
);

gulp.task('html', () =>
  gulp
    .src(`${config.src}/pages/**/*.hbs`)
    .pipe(
      data(file =>
        JSON.parse(fs.readFileSync(file.path.replace('.hbs', '.json')))
      )
    )
    .pipe(data(() => JSON.parse(fs.readFileSync(`${config.src}/config.json`))))
    .pipe(
      handlebars(
        {},
        {
          ignorePartials: true,
          batch: [`${config.src}/partials`],
        }
      )
    )
    .pipe(
      rename({
        extname: '.html',
      })
    )
    .pipe(gulp.dest(config.dest))
);

gulp.task('serve', () => {
  browserSync.init({
    open: true,
    notify: true,
    files: [`${config.dest}/**/*`],
    server: config.dest,
  });
});

gulp.task('watch', () => {
  config.watchers.forEach(item => {
    gulp.watch(item.match, item.tasks);
  });
});

gulp.task('default', ['html', 'css'], done => {
  if (NODE_ENV === 'development') {
    gulp.start('serve');
    gulp.start('watch');
  }
  if (NODE_ENV === 'production') {
    gulp.start('cleanCSS');
  }
  done();
});
