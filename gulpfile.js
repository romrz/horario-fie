
/*
    Plugins required
*/
var gulp = require('gulp'); 
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

/*
    Paths to common resources
*/
var paths = {
    bootstrapCSS: './bower_components/bootstrap/dist/css/bootstrap.css',
    bootstrapJS: './bower_components/bootstrap/dist/js/bootstrap.js',
    jquery: './bower_components/jquery/dist/jquery.js'
}


/*
    Default task.
    Runs all other tasks.
*/
gulp.task('default', ['images', 'scripts', 'styles']);


/*
    Watch task.
    Watches the changes of every source file.
*/
gulp.task('watch', function() {

    gulp.watch('./src/img/*', ['images']);
    gulp.watch('./src/js/*', ['scripts']);
    gulp.watch('./src/css/*', ['styles']);

});

/*
    Images task.
    Just moves the images to assets.
*/
gulp.task('images', function() {
    gulp.src('./src/img/*')
    .pipe(gulp.dest('./assets/img/'));
});

/*
    Scripts task.
    Concatenates and minifies all the javascript files.
*/
gulp.task('scripts', function() {
    gulp.src([paths.jquery, './src/js/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/'));
});

/*
    Styles task.
    Concatenates and minifies all css files.
*/
gulp.task('styles', function() {
    gulp.src([paths.bootstrapCSS, './src/css/*.css'])
    .pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./assets/css/'));
});
