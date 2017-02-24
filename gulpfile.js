var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    csscomb = require('gulp-csscomb'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    changed = require('gulp-changed'),
    debug = require('gulp-debug'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    webpack = require('gulp-webpack'),
    cache = require('gulp-cache'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync').create();

var reload = browserSync.reload;
var isDeploy = false;

// 静态服务器
gulp.task('browser-sync', ['sass', 'scripts', 'images'], function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 3030
    });

    watch();
});

// 监听文件变化
function watch() {
    gulp.watch('src/styles/**/*.scss', ['sass']);
    gulp.watch('src/javascripts/**/*.js', ['scripts']);
    gulp.watch(['src/images/**/*.png', 'src/images/**/*.jpg', 'src/images/**/*.jpeg'], ['images']);
    gulp.watch(['index.html', 'views/*.html']).on('change', reload);
    gulp.watch('dist/javascripts/**/*.js').on('change', reload);
    gulp.watch('dist/stylesheets/**/*.css').on('change', reload);
}
// 样式处理
gulp.task('sass', function() {
    return gulp.src('src/styles/**/*.scss')
        .pipe(plumber({
            errorHandler: function(error) {
                this.emit('end');
                console.log(
`-------------------- 错误信息 --------------------
错误行数： 第 ${error.line} 行
错误文件： ${error.file}
错误类型： ${error.messageOriginal}

错误信息： ${error.messageFormatted}
--------------------------------------------------`
                );
            }
        }))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'SASS编译失败！',
                message: `<%= error.messageOriginal %>（<%= error.line %>行）`
            })
        }))
        .pipe(gulpif(!isDeploy, sourcemaps.init()))
        .pipe(sass())
        .pipe(autoprefixer(['>0%']))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCSS())
        .pipe(gulpif(!isDeploy, sourcemaps.write()))
        .pipe(gulp.dest('dist/stylesheets'))
        .pipe(gulpif(!isDeploy, reload({
            stream: true
        })))
});

// Scripts任务
gulp.task('scripts', function() {
    return gulp.src('src/javascripts/**/*.js')
        .pipe(plumber({
            errorHandler: function(error) {
                this.emit('end');
                console.log(
`-------------------- 错误信息 --------------------
错误行数： 第 ${error.loc.line} 行
错误文件： ${error.fileName}
错误类型： ${error.name}

错误信息： ${error.message}
--------------------------------------------------`
                );
            }
        }))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'Javascript编译失败！',
                message: `<%= error.message %>`
            })
        }))
        .pipe(gulpif(!isDeploy, sourcemaps.init()))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulpif(!isDeploy, sourcemaps.write()))
        .pipe(gulp.dest('dist/javascripts'))
});

// 图片压缩
gulp.task('images', function() {
    return gulp.src('src/images/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({
            message: '图片压缩完成！'
        }));
});

// 清空dist
gulp.task('clean', function(cb) {
    gulp.src(['./dist/stylesheets', './dist/javascripts'], {
            read: false
        })
        .pipe(clean())

    cb()
})

// 设置生产环境变量
gulp.task('isDeploy', function(cb) {
    isDeploy = true
    cb()
})

// 开发环境
gulp.task('default', ['browser-sync']);

// 生产环境
gulp.task('deploy', ['isDeploy', 'sass', 'scripts', 'images']);