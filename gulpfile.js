const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const ts = require('gulp-typescript');

gulp.task('es6', function(){
   return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/js"));
});
gulp.task('scss', function(){
    return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest("dist/css"));
});
gulp.task('ts', function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            target: 'ES5'
            // outFile: 'output.js'
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('js:watch', function(){
    gulp.watch('src/**/*.js', gulp.task('es6'));
});
gulp.task('ts:watch', function(){
    gulp.watch('src/**/*.ts', gulp.task('ts'));
});
gulp.task('scss:watch', function(){
    gulp.watch('src/**/*.scss', gulp.task('scss'));
});

gulp.task('default', gulp.parallel('js:watch', 'ts:watch', 'scss:watch'));