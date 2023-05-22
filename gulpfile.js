const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
// const imagemin = require('gulp-imagemin');

// function comprimeImagens() {
//     gulp.src('./source/icons/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('./build/icons'));
// }

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'))
}

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}


exports.default = function() {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false }, gulp.series(compilaSass))
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false }, gulp.series(comprimeJavaScript))
    // gulp.watch('./source/icons/*', {ignoreInitial: false }, gulp.series(comprimeImagens))
}