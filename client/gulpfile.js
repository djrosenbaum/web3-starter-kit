const cssimport = require('gulp-cssimport');
const del = require('del');
const { exec } = require('child_process');
const gulp = require('gulp');
const include = require('gulp-include');
const minifier = require('gulp-minifier');
const path = require('path');
const rollup = require('rollup');
const rollupConfig = require('./rollup.config');

// The client directory
const base = path.join('projects', process.env.CLIENT);

// Server
let shouldStartServer = false;

/**
 * Clean dist directory.
 */
async function clean() {
	const dist = path.resolve(base, 'dist');
  await del(dist);
}

/**
 * Pack the CSS files.
 */
function css() {
  return gulp.src(path.resolve(base, 'src', 'css', 'index.css'))
  	.pipe(cssimport())
    .pipe(gulp.dest(path.resolve(base, 'dist', 'css')));
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
    gulp.src(path.resolve(base, 'src', 'images', '**', '*'))
      .pipe(gulp.dest(path.resolve(base, 'dist', 'images')))
  );

  return Promise.all(files);
}

function includes() {
	return gulp.src(path.resolve(base, 'src', 'index.html'))
	.pipe(include({
    hardFail: true
  }))
	.on('error', console.log)
	.pipe(gulp.dest(path.resolve(base, 'dist')))
}

function minifyHTML() {
  return gulp.src(path.resolve(base, 'dist', 'index.html')).pipe(minifier({
    minify: true,
    minifyHTML: {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    }
  })).pipe(gulp.dest(path.resolve(base, 'dist')));
}

async function watch() {
  shouldStartServer = true;
  return gulp.watch([path.resolve(base, 'src')],
    {
      ignoreInitial: false,
    },
    build
  );
}

function startServer(cb) {
  if (!shouldStartServer) {
    return cb();
  }
  const port = '8081';
  console.log(`localhost:${port}`);
  shouldStartServer = false;

  let childProcess = exec(`http-server ${path.resolve(base, 'dist')} -o -p ${port}`, (err, stdout, stderr) => {
    // child process
  });

  childProcess.stdout.on('data', data => console.log(data.toString()));

  cb();
}

const build = gulp.series(clean, gulp.parallel(css, javascript, copyImages), includes, minifyHTML, startServer);

exports.build = build;
exports.watch = watch;