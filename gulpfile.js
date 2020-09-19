const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const ts = require('gulp-typescript');
const tsConfig = ts.createProject("tsconfig.json");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const tsify = require("tsify");
const rename = require('gulp-rename');
const mergeStream = require('merge-stream');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');


gulp.task('es6', function(){
   return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
});
gulp.task('scss', function(){
    return gulp.src('src/**/*.scss')
    .pipe(autoprefixer())
    .pipe(sass())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest("dist"));
});
gulp.task('ts', function() {
    // define input files, which we want to have
    // bundled:
    const files = [
        './src/ts/config.ts',
        './src/ts/test.ts',
    ];
    // map them to our stream function
    const tasks = files.map(function(entry) {
        const sourceString = entry.split('/')[entry.split('/').length-1]; // filename
        return browserify({entries: [entry]})
            .plugin(tsify, { noImplicitAny: true })
            .bundle().on('error', (e) => console.log(e))
            .pipe(source(sourceString))
            // rename them to have "bundle as postfix"
            .pipe(rename({
                extname: '.bundle.js'
            }))
            .pipe(gulp.dest('./dist/bundle'));
        });
    // create a merged stream
    return mergeStream(tasks);
});
// gulp.task('ts', function() {
//     return browserify({
//         basedir: '.',
//         debug: true,
//         entries: ['src/ts/config.ts'],
//         cache: {},
//         packageCache: {}
//     })
//     .plugin(tsify, { noImplicitAny: true })
//     .bundle().on('error', (e) => console.log(e))
//     .pipe(source('bundle/config.js'))
//     .pipe(gulp.dest('dist'));
// });

// gulp.task('ts', function () {
//     return gulp.src('src/**/*.ts')
//         .pipe(ts({
//             noImplicitAny: true,
//             target: 'ES5'
//             // outFile: 'output.js'
//         }))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist'));
// });
gulp.task('image', function(){
    return gulp.src('src/**/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist'))
});

gulp.task('es6:watch', function(){
    gulp.watch('src/**/*.js', gulp.task('es6'));
});
gulp.task('ts:watch', function(){
    gulp.watch('src/**/*.ts', gulp.task('ts'));
});
gulp.task('scss:watch', function(){
    gulp.watch('src/**/*.scss', gulp.task('scss'));
});
gulp.task('image:watch', function(){
    gulp.watch('src/**/images/*', gulp.task('image'));
});

gulp.task('default', gulp.parallel('es6:watch', 'ts:watch', 'scss:watch'));
gulp.task('all', gulp.parallel('es6', 'ts', 'scss', 'image'));