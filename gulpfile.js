const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const ts = require('gulp-typescript');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const ejs = require('gulp-ejs');
const imagemin = require('gulp-imagemin');

gulp.task('ejs', function(){
    return gulp.src("src/**/*.ejs")
    .pipe(gulp.dest("dist"));
});
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
gulp.task('ts', function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            target: 'ES5'
            // outFile: 'output.js'
        })).pipe(uglify())
        .pipe(gulp.dest('dist'));
});
gulp.task('image', function(){
    return gulp.src('src/**/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist'))
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
gulp.task('ejs:watch', function(){
    gulp.watch('src/**/*.ejs', gulp.task('ejs'));
});
gulp.task('image:watch', function(){
    gulp.watch('src/**/images/*', gulp.task('image'));
});

gulp.task('default', gulp.parallel('js:watch', 'ts:watch', 'scss:watch', 'ejs:watch'));