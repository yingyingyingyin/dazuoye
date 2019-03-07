var gulp = require('gulp'),
    rename = require('gulp-rename'),         //重命名文件
    htmlmin = require('gulp-htmlmin'),           //html压缩插件
    minifycss = require('gulp-minify-css'),      //css压缩插件
    uglify = require('gulp-uglify'),             //js压缩插件
    imagemin = require('gulp-imagemin'),        //图片压缩插件
    watch = require('gulp-watch');           //监听插件
//     sass = require('gulp-sass');               //ps：目前使用不成功

    
// gulp.task('sass', function () {
//     gulp.src('./scss/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('./public/css'));
// });

// //监听sass文件
// gulp.task('watch', function () {
//     gulp.watch('./public/sass/*.scss', ['sass']);  //当监听路径下的scss文件发生变化时调用sass任务
// });

// //监听并且自动生成css文件
// gulp.task('default', ['sass', 'watch']);

//压缩css文件
gulp.task('minifycss', function () {
    return gulp.src('./public/**/*.css')    //压缩的文件的路径
        .pipe(minifycss())                  //执行css压缩函数
        .pipe(rename({
            suffix: '.min'
          }))
        .pipe(gulp.dest('./build'));       //输出文件夹的位置
});

//压缩html文件
gulp.task('htmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src('./public/**/*.html')    //压缩的文件
        .pipe(htmlmin(options))              //执行压缩
        .pipe(rename({
            suffix: '.min'
          }))
        .pipe(gulp.dest('./build'));        //输出文件夹
});

//压缩js文件
gulp.task('uglify', function () {
    return gulp.src('./public/**/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
          }))
        .pipe(gulp.dest('./build'));
});

//压缩图片
gulp.task('imagemin', function () {
    return gulp.src('./public/**/*.{png,jpg,gif}')      //压缩的文件
        .pipe(imagemin({
            optimizationLevel: 5,                       //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true,                          //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true,                           //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true                             //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('./build'));                   //输出文件夹
});
