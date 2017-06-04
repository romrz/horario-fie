
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
    bootstrapCSS: './node_modules/bootstrap/dist/css/bootstrap.css',
    bootstrapJS: './node_modules/bootstrap/dist/js/bootstrap.js',
    jquery: './node_modules/jquery/dist/jquery.js',
    vue: './node_modules/vue/dist/vue.js'
}


/*
    Default task.
    Runs all other tasks.
*/
gulp.task('default', ['images', 'scripts', 'styles', 'html']);


/*
    Watch task.
    Watches the changes of every source file.
*/
gulp.task('watch', function() {
    gulp.watch('./src/img/*', ['images']);
    gulp.watch('./src/js/*', ['scripts']);
    gulp.watch('./src/css/*', ['styles']);
    gulp.watch('./src/*.html', ['html']);
});

/*
    Images task.
    Just moves the images to the public folder.
*/
gulp.task('images', function() {
    gulp.src('./src/img/*')
    .pipe(gulp.dest('./public/img/'));
});

/*
    Scripts task.
    Concatenates and minifies all the javascript files.
*/
gulp.task('scripts', function() {
    gulp.src([paths.jquery, './src/js/*.js'])
    .pipe(concat('scripts.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./public/js/'));
});

/*
    Styles task.
    Concatenates and minifies all css files.
*/
gulp.task('styles', function() {
    gulp.src([paths.bootstrapCSS, './src/css/*.css'])
    .pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./public/css/'));
});

/*
    HTML task.
    Just moves the HTML files to the public folder.
*/
gulp.task('html', function() {
    gulp.src('./src/html/*')
    .pipe(gulp.dest('./public/'));
});

