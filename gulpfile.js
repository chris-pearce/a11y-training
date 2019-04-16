const browserSync = require('browser-sync').create();
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const { parallel, series } = require('gulp');
const postcss = require('gulp-postcss');
const data = require('gulp-data');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');

const { NODE_ENV } = process.env;

const config = {
  src: './src',
  dest: './dist',
};

const clean = () => del(config.dest);

const cleanProd = () =>
  del([
    `${config.dest}/assets/css/*.css`,
    `!${config.dest}/assets/css/index.css`,
  ]);

const compileCSS = () =>
  gulp
    .src(`${config.src}/assets/css/*.css`)
    .pipe(postcss())
    .pipe(gulp.dest(`${config.dest}/assets/css`));

const compileHTML = () =>
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
    .pipe(gulp.dest(config.dest));

const serve = () =>
  browserSync.init({
    open: true,
    notify: true,
    files: [`${config.dest}/**/*`],
    server: config.dest,
  });

const watchers = [
  {
    match: [`${config.src}/**/*.hbs`, `${config.src}/**/*.json`],
    tasks: series(compileHTML),
  },
  {
    match: [
      `${config.src}/assets/css/*.css`,
      `${config.src}/assets/css/config/*.js`,
    ],
    tasks: series(compileCSS),
  },
];
const watch = () =>
  watchers.forEach(item => {
    gulp.watch(item.match, item.tasks);
  });

const defaultTasks =
  NODE_ENV === 'production'
    ? series(parallel([compileHTML, compileCSS]), cleanProd)
    : series(
        clean,
        parallel([compileHTML, compileCSS]),
        parallel(serve, watch)
      );

exports.default = defaultTasks;
