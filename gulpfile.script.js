const gulp     = require('gulp');
const uglify   = require('gulp-uglify');
const concat   = require('gulp-concat');
const del      = require('del');
const rename   = require('gulp-rename');
// * ==== application ====================================== * //
gulp.task('js:app', function(done) {
    del.sync(['public/js/app/v*.min.js']); // Remove arquivos antigos
    const timestamp = Date.now();
    return gulp.src([
        'resources/js/class/Request.js',
        'resources/js/class/Tabela.js',
        'resources/js/class/Preload.js',
        'resources/js/class/Dialog.js',
        'resources/js/class/Toast.js',
        'resources/js/app.js'
    ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(rename({ basename: `v${timestamp}.min` }))
    .pipe(gulp.dest('public/js/app'));
});
// Watch para JS do app
gulp.task('js:app:w', function() {
    gulp.watch([
        'resources/js/class/Request.js',
        'resources/js/class/Tabela.js',
        'resources/js/class/Preload.js',
        'resources/js/class/Dialog.js',
        'resources/js/class/Toast.js',
        'resources/js/app.js'
    ], gulp.series('js:app'));
});
// * ==== login ====================================== * //
gulp.task('js:login', function(done) {
    del.sync(['public/js/login/v*.min.js']); // Remove arquivos antigos
    const timestamp = Date.now();
    return gulp.src([
        'resources/js/Api/UsuarioApi.js',
        'resources/js/login.js'
    ])
    .pipe(concat('login.min.js'))
    .pipe(uglify())
    .pipe(rename({ basename: `v${timestamp}.min` }))
    .pipe(gulp.dest('public/js/login'));
});
// Watch para JS do login
gulp.task('js:login:w', function() {
    gulp.watch([
        'resources/js/Api/UsuarioApi.js',
        'resources/js/login.js'
    ], gulp.series('js:login'));
});
// ? =================================================== ? //
// ? ==== build ======================================== ? //
// ? =================================================== ? //
gulp.task('js:all', gulp.parallel(
    'js:app:w', 'js:login:w'
));
