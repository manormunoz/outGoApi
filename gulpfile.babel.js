// NPM Dependencies
import eslint from 'gulp-eslint';
import gulp from 'gulp';
//import livereload from 'gulp-livereload';
import nodemon from 'gulp-nodemon';
//import notify from 'gulp-notify';
import mocha from 'gulp-mocha';



// Mocha task
gulp.task('test', () => {

  process.env.MOCHAWESOME_REPORTPAGETITLE = 'EasytrackPartners - Testing Api';
  process.env.MOCHAWESOME_REPORTTITLE = 'EasytrackPartners - Testing Api';
  process.env.MOCHAWESOME_REPORTFILENAME = 'index';
  process.env.MOCHAWESOME_REPORTDIR = './src/public/tests/';
  //process.env.MOCHAWESOME_QUIET = true;

  return gulp.src([
    'test/**/*Test.js'
  ])
  .pipe(mocha({
    compilers: 'js:babel-core/register',
    timeout: 5000,
    reporter: 'mochawesome'
    // reporterOptions: {
    //   reportPageTitle: '',
    //   reportTitle: 'EasytrackPartners - Testing Api',
    //   reportFilename: 'EasytrackPartners'
    // }
  }));
});


// Linter task
gulp.task('analyze', () => {
  return gulp
  .src([
    'src/**/*.js',
    'test/**/*Test.js'
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});


// Start dev task
gulp.task('start-dev', () => {
  //livereload.listen();

  nodemon({
    script: 'src/server.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  }).on('restart', () => {
    // gulp.src('src/server.js')
    //   .pipe(livereload())
    //   .pipe(notify('Reloading page, please wait...'));
  });
});

// Start production
gulp.task('start', () => {
  nodemon({
    script: 'src/server.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'production'
    }
  });
});

// Default task
//gulp.task('default', ['livereload', 'start-dev']);
gulp.task('default', ['start-dev']);
