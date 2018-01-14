var gulp = require('gulp');
var ts = require('gulp-typescript');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var tsProj = ts.createProject('tsconfig.json');

gulp.task('css', () => {
    return gulp.src(['components/**/*.scss'])
        .pipe(gulp.dest('es'));
})


gulp.task('libcss', () => {
    return gulp.src(['components/**/*.scss'])
        .pipe(gulp.dest('lib'));
})

//class模式
gulp.task('es',['css'], function () {
    tsProj.options.target=2;
    return gulp.src('components/**/*{ts,tsx}')
        .pipe(ts(tsProj))
        .pipe(gulp.dest('es'));
});

//var模式
gulp.task('lib',['libcss'], function () {
    tsProj.options.target=1;
    return gulp.src('components/**/*{ts,tsx}')
        .pipe(ts(tsProj))
        .pipe(gulp.dest('lib'));
});
 

