/**
 * @description 引入gulp对生成后的图文进行压缩混淆处理
 */
const gulp = require('gulp');
const minifyCss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const htmlclean = require('gulp-htmlclean');

const rootPath = './public/';
const distPath = './public';

// 压缩 public 目录 css
gulp.task('minify-css', () => {
    return gulp.src(`${rootPath}**/*.css`)
        .pipe(minifyCss())
        .pipe(gulp.dest(distPath));
});
// 压缩 public 目录 html
gulp.task('minify-html', () => {
    return gulp.src(`${rootPath}**/*.html`)
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }))
        .pipe(gulp.dest(distPath))
});
// 压缩 public/js 目录 js
gulp.task('minify-js', () => {
    return gulp.src(`${rootPath}**/*.js`)
        .pipe(uglify())
        .pipe(gulp.dest(distPath));
});
// 执行 gulp 命令时执行的任务
// gulp.task('default', [
//     'minify-html', 'minify-css', 'minify-js'
// ]);

gulp.task('default', gulp.series('minify-html', 'minify-css', 'minify-js'));