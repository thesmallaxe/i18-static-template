/**
 * @file
 *
 * Gulp tasks.
 *
 * Table of contents:
 *   1. Styles
 *   2. Scripts
 *   3. Images
 *   4. SVG Icons
 *   5. Fonts
 *   6. Jekyll
 *   7. GatherContent
 *   8. Misc.
 */

'use strict';

import autoprefixer from 'autoprefixer';
import browserify from 'browserify';
import browserSync from 'browser-sync';
import buffer from 'vinyl-buffer';
import del from 'del';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import jpegRecompress from 'imagemin-jpeg-recompress';
import runSequence from 'run-sequence';
import sourcestream from 'vinyl-source-stream';
import through2 from 'through2';

// VARIABLES
// ----------
const $ = gulpLoadPlugins();
const fs = require('fs');
const paths = require('./_assets/gulp_config/paths');
const sync = browserSync.create();

// GATHERCONTENT VARIABLES
// ----------
const gcAuth = 'tpotocnik@bluestatedigital.com:434b27b8-6c78-44a6-a287-e787bbcc19d6';
const gcVersioning = 'Accept: application/vnd.gathercontent.v0.5+json';
const gcProjectID = '131540';

// -----------------------------------------------------------------------------
//   1: Styles
// -----------------------------------------------------------------------------

/**
 * Task: stylelint
 *
 * Lints Sass files.
 */
gulp.task('stylelint', () => {
  return gulp.src([
    `${paths.sassFiles}/**/*.s+(a|c)ss`,
    `${paths.sassFiles}/**/*.css`,
    `!${paths.sassFiles}/vendor/**/*`
  ])
  .pipe($.stylelint({
    reporters: [
      {formatter: 'string', console: true}
    ]
  }));
});

/**
 * Task: build:styles
 *
 * Uses Sass compiler to process styles, adds vendor prefixes, minifies, then
 * outputs file to the appropriate location.
 */
gulp.task('build:styles', ['stylelint'], () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    `${paths.sassFiles}/main.scss`
  ])
    .pipe($.sass({includePaths: ['node_modules']}))
    .on('error', $.notify.onError())
    .pipe($.postcss([ autoprefixer(AUTOPREFIXER_BROWSERS) ]))
    .pipe($.cleanCss())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(paths.jekyllCssFiles))
    .pipe(gulp.dest(paths.siteCssFiles))
    .pipe(sync.stream({match: '**/*.css'}));
});

/**
 * Task: clean:styles
 *
 * Deletes all processed site styles.
 */
gulp.task('clean:styles', (callback) => {
  del([paths.jekyllCssFiles, paths.siteCssFiles]);
  callback();
});

// -----------------------------------------------------------------------------
//   2: Scripts
// -----------------------------------------------------------------------------

/**
 * Task: jslint
 *
 */
gulp.task('jslint', () =>
  gulp.src([
    `${paths.jsFiles}/**/*.js`,
    'gulpfile.babel.js',
    '!node_modules/**',
    `!${paths.jsFiles}/vendor/**`,
  ]).pipe($.eslint())
  .pipe($.eslint.format())
);

/**
 * Task: browserify
 *
 * Concatenates and uglifies global JS files and outputs result to the
 * appropriate location.
 */
gulp.task('browserify', function() {
  return browserify({
    entries: `${paths.jsFiles}/main.js`,
    debug: true,
    paths: ['node_modules', paths.jsFiles],
  })
  .transform('babelify', {presets: ['es2015']})
  .bundle()
  .pipe(sourcestream('bundle.js'))

  // Only place in `assets` because Jekyll needs to process the file.
  .pipe(gulp.dest(paths.jekyllJsFiles));
});

/**
 * Task: build:scripts
 *
 * Concatenates and uglifies global JS files and outputs result to the
 * appropriate location.
 */
gulp.task('build:scripts', ['jslint', 'browserify'], () => {
  gulp.src(`${paths.jsFiles}/vendor/jquery.js`)
    .pipe(gulp.dest(`${paths.jekyllJsFiles}/vendor`));

  return gulp.src([
    `${paths.jsFiles}/vendor/_*.js`,
    `${paths.jekyllJsFiles}/bundle.js`,
  ])
  .pipe($.babel({
    presets: ['es2015'],
    compact: true,
  }))
  .pipe($.concat('source.dev.js'))
  .pipe(gulp.dest(paths.jekyllJsFiles))
  .pipe($.rename('source.js'))
  .pipe($.uglify())

  // We need to add front matter so Jekyll will process variables.
  .pipe($.appendPrepend.prependFile('./_assets/gulp_config/front-matter.txt'))

  // Only place in `assets` because Jekyll needs to process the file.
  .pipe(gulp.dest(paths.jekyllJsFiles))
  .pipe(sync.stream({match: '**/*.js'}));
});

/**
 * Task: clean:scripts
 *
 * Deletes all processed scripts.
 */
gulp.task('clean:scripts', (callback) => {
  del([paths.jekyllJsFiles, paths.siteJsFiles]);
  callback();
});

// -----------------------------------------------------------------------------
//   3: Images
// -----------------------------------------------------------------------------

/**
 * Task: imgcompress
 *
 * Optimizes and copies image files.
 *
 * We're including imagemin options because we're overriding the default JPEG
 * optimization plugin.
 */
gulp.task('imgcompress', () => {
  return gulp.src(`${paths.imageFiles}/compress/**/*.+(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF|webp|WEBP|tif|TIF)`)
    .pipe($.cache($.imagemin([
      $.imagemin.gifsicle(),
      jpegRecompress(),
      $.imagemin.optipng(),
      $.imagemin.svgo()
    ])))
    .pipe(gulp.dest(paths.jekyllImageFiles))
    .pipe(gulp.dest(paths.siteImageFiles));
});

/**
 * Task: imgresize
 *
 * Resizes uploaded images to decrease browser load time.
 */
gulp.task('imgresize', () => {
  gulp.src(`${paths.imageFiles}/uploads/*.+(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF|webp|WEBP|tif|TIF)`)
    .pipe($.imageResize({
      width : 50,
      height : 50,
      upscale : false
    }))
    .pipe(gulp.dest(`${paths.imageFiles}/uploads/thumbnail`));

  return gulp.src(`${paths.imageFiles}/uploads/*.+(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF|webp|WEBP|tif|TIF)`)
    .pipe($.imageResize({
      width : 150,
      height : 80,
      upscale : false
    }))
    .pipe(gulp.dest(`${paths.imageFiles}/uploads/medium`));
});

/**
 * Task: build:images
 *
 * Copies all image files
 */
gulp.task('build:images', ['imgcompress'], () => {
  return gulp.src([
      `${paths.imageFiles}/**/*`,
      `!${paths.imageFiles}/compress/**/*`
    ])
    .pipe(gulp.dest(paths.jekyllImageFiles))
    .pipe(gulp.dest(paths.siteImageFiles))
    .pipe(sync.stream());
});

/**
 * Task: clean:images
 *
 * Deletes all processed images.
 */
gulp.task('clean:images', (callback) => {
  del([paths.jekyllImageFiles, paths.siteImageFiles]);
  callback();
});

// -----------------------------------------------------------------------------
//   4: SVG Icons
// -----------------------------------------------------------------------------

/**
 * Task: build:icons
 *
 * Creates svg sprite.
 */
gulp.task('build:icons', () => {
  return gulp.src(`${paths.iconFiles}/*.svg`)
    .pipe($.svgSprite({
      mode: {
        symbol: {
          dest: '.',
          sprite: 'icon-sprite.svg',
          bust: false,
          inline: false,
          dimensionAttributes: false
        }
      }
    }))
    .pipe(gulp.dest(paths.jekyllImageFiles))
    .pipe(gulp.dest(paths.siteImageFiles))
    .pipe(sync.stream());
});

// -----------------------------------------------------------------------------
//   5: Fonts
// -----------------------------------------------------------------------------

/**
 * Task: build:fonts
 *
 * Copies font files.
 */
gulp.task('build:fonts', () => {
  return gulp.src(`${paths.fontFiles}/**/*`)
    .pipe(gulp.dest(paths.jekyllFontFiles))
    .pipe(gulp.dest(paths.siteFontFiles))
    .pipe(browserSync.stream());
});

/**
 * Task: clean:fonts
 *
 * Deletes all copied fonts.
 */
gulp.task('clean:fonts', (callback) => {
  del([paths.jekyllFontFiles, paths.siteFontFiles]);
  callback();
});

// -----------------------------------------------------------------------------
//   6: Jekyll
// -----------------------------------------------------------------------------

/**
 * Task: build:jekyll
 *
 * Runs the jekyll build command.
 */
gulp.task('build:jekyll', () => {
  const shellCommand = 'bundle exec jekyll build --config _config.yml';

  return gulp.src('')
    .pipe($.run(shellCommand))
    .on('error', $.notify.onError());
});

/**
 * Task: clean:jekyll
 *
 * Deletes the entire _site directory.
 */
gulp.task('clean:jekyll', (callback) => {
  del(['_site']);
  callback();
});

// -----------------------------------------------------------------------------
//   7: GatherContent
// -----------------------------------------------------------------------------

// Simple callback stream used to synchronize stuff
// Source: http://unobfuscated.blogspot.co.at/2014/01/executing-asynchronous-gulp-tasks-in.html
function synchro(done) {
  return through2.obj(function (data, enc, cb) {
    cb();
  },
  function (cb) {
    cb();
    done();
  });
}

/**
 * Task: clean
 *
 * Runs all the clean commands.
 */
gulp.task('clean', ['clean:jekyll',
  'clean:gathercontent',
  'clean:images',
  'clean:scripts',
  'clean:styles',
  'clean:fonts']);

/**
 * Task: build
 *
 * Build the site anew.
 */
gulp.task('build', (callback) => {
  runSequence('clean',
    'build:fonts',
    'imgresize',
    ['build:scripts', 'build:icons', 'build:images', 'build:styles'],
    'build:gathercontent',
    'build:jekyll',
    callback);
});

/**
* Task: build:nodata
*
* Build the site anew without generating new GatherContent data.
*/
gulp.task('build:nodata', (callback) => {
runSequence(['clean:jekyll',
  'clean:images',
  'clean:scripts',
  'clean:styles',
  'clean:fonts'],
  'build:fonts',
  'imgresize',
  ['build:scripts', 'build:icons', 'build:images', 'build:styles'],
  'build:jekyll',
  callback);
});

/**
 * Task: serve
 *
 * Static Server + watching files.
 *
 * Note: passing anything besides hard-coded literal paths with globs doesn't
 * seem to work with gulp.watch().
 */
gulp.task('serve', () => {

  sync.init({
    server: paths.siteDir,
    ghostMode: false, // Toggle to mirror clicks, reloads etc. (performance)
    open: true, // Toggle to automatically open page when starting.
    port: 4001,
    online: true
  });

  // Watch site settings.
  gulp.watch(['_config*.yml'], {cwd:'./'}, ['build:jekyll', sync.reload]);

  // Watch .scss files; changes are piped to browserSync.
  gulp.watch(
    ['_assets/styles/**/*.scss'], {cwd:'./'},
    ['build:styles', sync.reload]
  );

  // Watch .js files.
  gulp.watch(`${paths.jsFiles}/**/*.js`, {cwd:'./'}, ['build:scripts', 'build:jekyll', sync.reload]);

  // Watch image files; changes are piped to browserSync.
  gulp.watch(`${paths.imageFiles}/**/*`, {cwd:'./'}, ['build:images', sync.reload]);

  // Watch image files; changes are piped to browserSync.
  gulp.watch(`${paths.iconFiles}/**/*`, {cwd:'./'}, ['build:icons', sync.reload]);

  // Watch font files; changes are piped to browserSync.
  gulp.watch(`${paths.fontFiles}/**/*`, {cwd:'./'}, ['build:fonts', sync.reload]);

  // Watch Posts and Netlify CMS directories
  gulp.watch(
    [`${paths.postsFolderName}/**/*.+(md|markdown|MD)`,
     `${paths.adminDir}/**/*`], {cwd:'./'}, ['build:jekyll', sync.reload]);

  // Watch commitments.
  gulp.watch(`${paths.commitmentsFolderName}/**/*.+(md|markdown|MD)`, {cwd:'./'}, ['build:jekyll', sync.reload]);

  // Watch HTML and markdown files.
  gulp.watch(
    ['**/*.+(html|md|markdown|MD|liquid)', `!${paths.siteDir}**/*.*`, `!{${paths.sassFiles}/*.md`], {cwd:'./'},
    ['build:jekyll', sync.reload]);

  // Watch RSS feed XML files.
  gulp.watch('**.xml', {cwd:'./'}, ['build:jekyll', sync.reload]);

  // Watch data files.
  gulp.watch('_data/**.*+(yml|yaml|csv|json)', {cwd:'./'}, ['build:jekyll', sync.reload]);

  // Watch favicon.png.
  gulp.watch('favicon.png', {cwd:'./'}, ['build:jekyll', sync.reload]);
});

// Copy _site folder files into docs folder
gulp.task('copySiteFolder', function() {
  gulp.src('_site/**')
  .pipe(gulp.dest('docs/'));
});

/**
 * Task: default
 *
 * Builds the site anew.
 */
gulp.task('watch', (callback) => {
  runSequence('build:nodata', 'serve', 'copySiteFolder', callback);
});

/**
 * Task: default
 *
 * Builds the site anew.
 */
gulp.task('default', (callback) => {
  runSequence('build', 'serve', 'copySiteFolder', callback);
});

// -----------------------------------------------------------------------------
//   8: Misc.
// -----------------------------------------------------------------------------

/**
 * Task: accessibility-test
 *
 * Runs the accessibility test against WCAG standards.
 *
 * Tests we're ignoring and why:
 *   1. WCAG2A.Principle1.Guideline1_3.1_3_1.H49.I: it's common practice (and,
 *   arguably, more semantic) to use <i> for icons.
 *   2. WCAG2A.Principle1.Guideline1_3.1_3_1.H48: This is throwing a false
 *   positive. We have marked up our menus as unordered lists.
 *   3. WCAG2A.Principle1.Guideline1_3.1_3_1.H49.AlignAttr: Sadly, we must
 *   ignore this test if we are to use our emoji plugin.
 *   4. WCAG2A.Principle1.Guideline1_3.1_3_1.H73.3.NoSummary: We can't use
 *   table summaries in kramdown in our blog posts.
 *   5. WCAG2A.Principle1.Guideline1_3.1_3_1.H39.3.NoCaption: We can't use
 *   table captions in kramdown in our blog posts.
 *   6. WCAG2A.Principle1.Guideline1_3.1_3_1.H42: This throws a lot of false
 *   positives for text that should not be headings.
 *
 */
gulp.task('accessibility-test', function() {
  console.log('Auditing for accessibility...');
  return gulp.src(`${paths.siteDir}/**/*.html`)
  .pipe($.accessibility({
    force: false,
    accessibilityLevel: 'WCAG2A',
    reportLevels: { notice: false, warning: true, error: true },
    ignore: [
    'WCAG2A.Principle1.Guideline1_3.1_3_1.H49.I',
    'WCAG2A.Principle1.Guideline1_3.1_3_1.H48',
    'WCAG2A.Principle1.Guideline1_3.1_3_1.H49.AlignAttr',
    'WCAG2A.Principle1.Guideline1_3.1_3_1.H73.3.NoSummary',
    'WCAG2A.Principle1.Guideline1_3.1_3_1.H39.3.NoCaption',
    'WCAG2A.Principle1.Guideline1_3.1_3_1.H42'
    ]
  }))
  .on('error', $.notify.onError())
  .on('end', function(){ console.log('Accessibility audit complete'); });
});
