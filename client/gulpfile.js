const cssimport = require('gulp-cssimport');
const del = require('del');
const gulp = require('gulp');
const include = require('gulp-include');
const minifier = require('gulp-minifier');
const path = require('path');
const rollup = require('rollup');
const rollupConfig = require('./rollup.config');

/**
 * Clean dist directory.
 */
async function clean() {
	const dist = path.resolve('./dist');
  await del(dist);
}

/**
 * Pack the CSS files.
 */
function css() {
  return gulp.src(path.resolve('./src/css/index.css'))
  	.pipe(cssimport())
    .pipe(gulp.dest(path.resolve('./dist/css')));
}

/**
 *Bundle the javascript files
 */
async function javascript() {
	const bundle = await rollup.rollup(rollupConfig);

	await bundle.write(rollupConfig.output);
}

/**
 * Copy static image files.
 */
function copyImages() {
  const files = [];
  files.push(
    gulp.src(path.resolve('./src/images/*'))
      .pipe(gulp.dest(path.resolve('./dist/images')))
  );

  files.push(
    gulp.src(path.resolve('./src/favicon.png'))
      .pipe(gulp.dest(path.resolve('./dist')))
  );

  return Promise.all(files);
}

function includes() {
	return gulp.src('./src/index.html')
	.pipe(include({
    hardFail: true
  }))
	.on('error', console.log)
	.pipe(gulp.dest('./dist'))
}

function minifyHTML() {
  return gulp.src('./dist/index.html').pipe(minifier({
    minify: true,
    minifyHTML: {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    }
  })).pipe(gulp.dest('./dist'));
}

async function watch() {
  return gulp.watch(['./src'],
    {
      ignoreInitial: false
    },
    build
  );
}

const build = gulp.series(clean, gulp.parallel(css, javascript, copyImages), includes, minifyHTML);

exports.build = build;
exports.watch = watch;