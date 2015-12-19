'use strict';

import gulp from 'gulp';
import del from 'del';
import { exec } from 'child_process';

const $ = require('gulp-load-plugins')();
const DEST = './build';

const manifest = {
  css: [
    './node_modules/normalize.css/normalize.css',
    './src/app.scss',
  ],
  assets: [
    './src/*.html',
    './src/assets/**/*',
  ],
};

gulp.task('build', ['css', 'assets']);

// TODO: Force rm not working
gulp.task('clean', del.bind(null, [DEST], { force: true }));

gulp.task('assets', function() {
  return gulp.src(manifest.assets)
    .pipe(gulp.dest(DEST));
});

gulp.task('css', function() {
  return gulp.src(manifest.css)
    .pipe($.if(/\.scss$/, $.sass()))
    .pipe($.autoprefixer())
    .pipe($.concat('app.css'))
    .pipe($.minifyCss())
    .pipe(gulp.dest(DEST));
});

gulp.task('serve', ['build'], () => {
  gulp.watch(manifest.css, ['css']);
  gulp.watch(manifest.assets, ['assets']);
  exec('./node_modules/.bin/http-server ./build');
});

gulp.task('default', ['serve']);
