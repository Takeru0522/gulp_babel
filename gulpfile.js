const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');


gulp.task('message', (cb) => {
    console.log('Gulp is running...');
    cb();
});

gulp.task('copyHtml', (cb) => {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
    cb();
});

gulp.task('sass', (cb) => {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
    cb();
});

// gulp.task('scripts', (cb) => {
//     gulp.src('src/js/*.js')
//         .pipe(concat('main.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
//     cb();
// });

gulp.task('babel', (cb) => {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    cb();
});

// gulp.task('default', gulp.parallel('message', 'copyHtml', 'sass', 'scripts'));
gulp.task('default', gulp.parallel('message', 'copyHtml', 'sass', 'babel'));

gulp.task('watch', (cb) => {
    gulp.watch('src/*.html', gulp.series('copyHtml'));
    gulp.watch('src/sass/*.scss', gulp.series('sass'));
    gulp.watch('src/js/*.js', gulp.series('babel'));
    cb();
})