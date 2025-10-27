const gulp     = require('gulp');
const concat   = require('gulp-concat');
const del      = require('del');
const gulpSass = require('gulp-sass')(require('sass'));
// ================================================================== //
// ================================================================== //
function compileSass(inputPath, outputPath, taskName = 'sass') {
    del.sync([`${outputPath}/v*.min.css`, `${outputPath}/*.css.map`]);
    const timestamp = Date.now();
    return gulp.src(inputPath)
        .pipe(gulpSass({ outputStyle: 'compressed' }).on('error', gulpSass.logError))
        .pipe(concat(`v${timestamp}.min.css`))
        .pipe(gulp.dest(outputPath));
}
// ================================================================== //
// ? ==== lead ==================================================== ? //
gulp.task('sass:app', function () {
    return compileSass('resources/sass/app.sass', 'public/css/app/');
});
// Watch para SASS do app
gulp.task('sass:app:wt', function () {
    gulp.watch(
        [
            'resources/sass/_main.sass',
            'resources/sass/_preload.sass',
            'resources/sass/_tabela.sass',
            'resources/sass/_toast.sass',
            'resources/sass/_dialog.sass',
            'resources/sass/app.sass',
        ], gulp.series('sass:app'));
});
// ? ==== login ==================================================== ? //
gulp.task('sass:login', function () {
    return compileSass('resources/sass/login.sass', 'public/css/login/');
});
// Watch para SASS do login
gulp.task('sass:login:wt', function () {
    gulp.watch(
        [
            'resources/sass/login.sass',
        ], gulp.series('sass:login'));
});
// ? =================================================== ? //
// ? ==== build ======================================== ? //
// ? =================================================== ? //
gulp.task('sass:all', gulp.parallel('sass:app:wt', 'sass:login:wt'));
