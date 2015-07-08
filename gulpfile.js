
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),
    del = require('del');

gulp.task('clean', function(cb) {
    del(['build'], cb);
});

gulp.task('scripts', ['clean'], function() {
    return gulp.src('src/*.js')
        .pipe(eslint({
            'rules' : {
                'quotes': [1, 'single'],
                'no-unused-expressions': 0
            },
            envs: [
                'browser'
            ]
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build'))
});

gulp.task('watch', function() {
    gulp.watch('src/*.js', ['scripts']);
});

gulp.task('default', ['watch', 'scripts']);
